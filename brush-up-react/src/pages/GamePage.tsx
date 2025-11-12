import React, { useState ,useRef } from 'react'
import Board from '../components/boards/Board';

type Card = {
    id: string;
    content: string;
};

type Board = {
    id: string;
    title: string;
    cards: Card[];
};

function GamePage() {
    // App.js
    const [boards, setBoards] = useState([
    {
      id: 'board-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', content: 'Write code', order: 0 },
        { id: 'card-2', content: 'Plan feature', order: 1 },
      ],
    },
    {
      id: 'board-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', content: 'Debug', order: 0 },
      ],
    },
    {
      id: 'board-3',
      title: 'Done',
      cards: [
        { id: 'card-4', content: 'Deploy', order: 0 },
      ],
    },
  ]);

  // State to track what's currently being dragged
  const [draggedItem, setDraggedItem] = useState(null); // { type: 'card' | 'board', id: string, sourceBoardId?: string }
  const [dropTarget, setDropTarget] = useState(null); // { type: 'card' | 'board', id: string, index?: number, targetBoardId?: string }

  // Ref to hold the actual DOM element of the item being dragged for position calculations
  const draggedElementRef = useRef(null);
  // Ref to hold the original mouse position when drag started
  const dragStartCoords = useRef({ x: 0, y: 0 });
  // Ref to hold the offset of the mouse from the top-left of the dragged element
  const dragOffset = useRef({ x: 0, y: 0 });


  // --- Helper Functions for Board/Card Manipulation ---

  const findBoardById = (boardId) => boards.find(board => board.id === boardId);
  const findCardById = (boardId, cardId) => findBoardById(boardId)?.cards.find(card => card.id === cardId);

  // --- Drag & Drop Handlers ---

  const handleDragStart = (e, type, id, sourceBoardId = null) => {
    // e.dataTransfer.setData('text/plain', JSON.stringify({ type, id, sourceBoardId })); // For HTML5 DnD API if used
    setDraggedItem({ type, id, sourceBoardId });
    draggedElementRef.current = e.currentTarget; // The actual DOM element being dragged
    dragStartCoords.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = {
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    };
    e.currentTarget.style.opacity = '0.5'; // Visual feedback
    document.body.style.cursor = 'grabbing';
  };

  const handleDragOver = (e, type, targetId, targetBoardId = null, targetIndex = null) => {
    e.preventDefault(); // Essential to allow drop
    // e.dataTransfer.dropEffect = 'move'; // For HTML5 DnD API

    // Logic to determine the exact drop position/index
    if (draggedItem && draggedItem.id !== targetId) { // Avoid hovering over itself
      if (type === 'card' && targetBoardId) {
        // Calculate insert index based on mouse position relative to card
        const targetRect = e.currentTarget.getBoundingClientRect();
        const mouseY = e.clientY;
        const insertIndex = mouseY < (targetRect.top + targetRect.height / 2) ? targetIndex : targetIndex + 1;
        setDropTarget({ type, id: targetId, targetBoardId, index: insertIndex });
      } else if (type === 'board') {
        setDropTarget({ type, id: targetId, index: targetIndex });
      }
    } else if (type === 'board-area' && draggedItem.type === 'card') {
      // Handle dropping card into an empty board
      setDropTarget({ type: 'board', id: targetId, targetBoardId: targetId, index: 0 });
    }
  };

  const handleDragLeave = (e) => {
    // Clear drop target when leaving an area
    setDropTarget(null);
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Essential to handle drop
    draggedElementRef.current.style.opacity = '1'; // Reset opacity
    document.body.style.cursor = 'default';

    if (!draggedItem || !dropTarget) {
      setDraggedItem(null);
      setDropTarget(null);
      return;
    }

    const { type, id, sourceBoardId } = draggedItem;
    const { type: dropType, id: dropId, index: dropIndex, targetBoardId } = dropTarget;

    let newBoards = [...boards];

    if (type === 'card' && dropType === 'card') {
      // Dragging card to another card's position (within same board or different)
      const sourceBoardIndex = newBoards.findIndex(b => b.id === sourceBoardId);
      const targetBoardIndex = newBoards.findIndex(b => b.id === targetBoardId);

      if (sourceBoardIndex === -1 || targetBoardIndex === -1) return;

      const sourceBoard = { ...newBoards[sourceBoardIndex] };
      const targetBoard = sourceBoardId === targetBoardId ? sourceBoard : { ...newBoards[targetBoardIndex] };

      const draggedCardIndex = sourceBoard.cards.findIndex(card => card.id === id);
      const [draggedCard] = sourceBoard.cards.splice(draggedCardIndex, 1);

      // Adjust target index if dropping within the same board and after the dragged card's original position
      const actualDropIndex = (sourceBoardId === targetBoardId && dropIndex > draggedCardIndex) ? dropIndex - 1 : dropIndex;

      targetBoard.cards.splice(actualDropIndex, 0, draggedCard);

      // Update order property (important for consistent display and re-dragging)
      sourceBoard.cards.forEach((card, i) => card.order = i);
      targetBoard.cards.forEach((card, i) => card.order = i);

      newBoards[sourceBoardIndex] = sourceBoard;
      if (sourceBoardId !== targetBoardId) {
        newBoards[targetBoardIndex] = targetBoard;
      }
    } else if (type === 'card' && dropType === 'board') {
      // Dragging card to an empty board or at the end of a board
      const sourceBoardIndex = newBoards.findIndex(b => b.id === sourceBoardId);
      const targetBoardIndex = newBoards.findIndex(b => b.id === targetId); // dropId is the boardId here

      if (sourceBoardIndex === -1 || targetBoardIndex === -1) return;

      const sourceBoard = { ...newBoards[sourceBoardIndex] };
      const targetBoard = { ...newBoards[targetBoardIndex] };

      const draggedCardIndex = sourceBoard.cards.findIndex(card => card.id === id);
      const [draggedCard] = sourceBoard.cards.splice(draggedCardIndex, 1);

      targetBoard.cards.push(draggedCard); // Add to end

      // Update order properties
      sourceBoard.cards.forEach((card, i) => card.order = i);
      targetBoard.cards.forEach((card, i) => card.order = i);

      newBoards[sourceBoardIndex] = sourceBoard;
      newBoards[targetBoardIndex] = targetBoard;

    } else if (type === 'board' && dropType === 'board') {
      // Dragging board to reorder boards
      const draggedBoardIndex = newBoards.findIndex(b => b.id === id);
      const targetBoardIndex = newBoards.findIndex(b => b.id === dropId);

      if (draggedBoardIndex === -1 || targetBoardIndex === -1) return;

      const [draggedBoard] = newBoards.splice(draggedBoardIndex, 1);
      newBoards.splice(targetBoardIndex, 0, draggedBoard);
    }

    setBoards(newBoards);
    setDraggedItem(null);
    setDropTarget(null);
  };

  const handleDragEnd = () => {
    // This is useful for general cleanup if no drop occurred or if using HTML5 DnD API
    if (draggedElementRef.current) {
      draggedElementRef.current.style.opacity = '1';
    }
    document.body.style.cursor = 'default';
    setDraggedItem(null);
    setDropTarget(null);
  };
  return (
   <div className="board-container" onMouseUp={handleDragEnd} onMouseMove={(e) => { /* Optional: visual drag effect */ }}>
      {boards.map((board, boardIndex) => (
        <Board
          key={board.id}
          board={board}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          draggedItem={draggedItem}
          dropTarget={dropTarget}
          boardIndex={boardIndex} // Pass index for reordering logic
        />
      ))}
    </div>
  )
}

export default GamePage
