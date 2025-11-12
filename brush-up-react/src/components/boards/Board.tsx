import React, { useRef } from 'react';
import './Board.css';
import Card from '../cards/Card';

function Board({ board, onDragStart, onDragOver, onDrop, onDragLeave, draggedItem, dropTarget, boardIndex }) {
  const boardRef = useRef(null); // Ref for the board DOM element

  // Determine if this board is the current drop target for a *board* drag
  const isBoardDropTarget = dropTarget && dropTarget.type === 'board' && dropTarget.id === board.id;

  // Function to calculate the card index when dropping onto an empty board area
  const handleBoardAreaDragOver = (e) => {
    e.preventDefault(); // Essential
    // If a card is being dragged and this is an empty board
    if (draggedItem && draggedItem.type === 'card' && board.cards.length === 0) {
      onDragOver(e, 'board', board.id, board.id, 0); // Drop at index 0 of this board
    }
  };


  return (
    <div
      ref={boardRef}
      className={`board ${draggedItem && draggedItem.type === 'board' && draggedItem.id === board.id ? 'dragging-board' : ''}`}
      draggable // Make the board itself draggable
      onDragStart={(e) => onDragStart(e, 'board', board.id)}
      onDragOver={(e) => onDragOver(e, 'board', board.id, null, boardIndex)} // For reordering boards
      onDrop={onDrop}
      onDragEnd={onDrop} // Use onDrop for simplicity after drag ends
      onDragLeave={(e) => onDragLeave(e)}
    >
      <div className="board-header">
        <h3>{board.title}</h3>
      </div>
      <div
        className="card-list"
        onDragOver={handleBoardAreaDragOver} // Handle dragging over the list area (especially for empty lists)
        onDrop={onDrop}
      >
        {board.cards.map((card, cardIndex) => (
          <React.Fragment key={card.id}>
            <Card
              card={card}
              boardId={board.id}
              onDragStart={onDragStart}
              onDragOver={(e) => onDragOver(e, 'card', card.id, board.id, cardIndex)}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              draggedItem={draggedItem}
              dropTarget={dropTarget}
            />
            {/* Visual drop indicator for cards */}
            {dropTarget && dropTarget.type === 'card' && dropTarget.targetBoardId === board.id && dropTarget.index === cardIndex + 1 && (
              <div className="drop-indicator-line"></div>
            )}
          </React.Fragment>
        ))}
        {/* Drop indicator for empty list or at the very end */}
        {board.cards.length === 0 && dropTarget && dropTarget.type === 'board' && dropTarget.id === board.id && (
          <div className="drop-indicator-empty-list">Drop card here</div>
        )}
        {board.cards.length > 0 && dropTarget && dropTarget.type === 'card' && dropTarget.targetBoardId === board.id && dropTarget.index === board.cards.length && (
           <div className="drop-indicator-line"></div>
        )}
      </div>
    </div>
  );
}

export default Board;