import React from 'react';
import './Card.css';

interface CardProps {
  card: {
    id: string;
    content: string;
    order: number;
    // add other card properties if needed
  };
  boardId: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, type: string, cardId: string, boardId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, type: string, cardId: string, boardId: string, order: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  draggedItem: { id: string; type: string } | null;
  dropTarget: { id: string; type: string; targetBoardId: string } | null;
}

function Card({ card, boardId, onDragStart, onDragOver, onDrop, onDragLeave, draggedItem, dropTarget }: CardProps) {
  const isCurrentlyDragged = draggedItem && draggedItem.id === card.id && draggedItem.type === 'card';
  const isDropTarget = dropTarget && dropTarget.type === 'card' && dropTarget.id === card.id && dropTarget.targetBoardId === boardId;


  return (
    <div
      className={`card ${isCurrentlyDragged ? 'dragging-card' : ''} ${isDropTarget ? 'drop-over-card' : ''}`}
      draggable // Make the card draggable
      onDragStart={(e) => onDragStart(e, 'card', card.id, boardId)}
      onDragOver={(e) => onDragOver(e, 'card', card.id, boardId, card.order)} // Pass card's current order as potential index
      onDrop={onDrop}
      onDragEnd={onDrop} // Use onDrop for simplicity after drag ends
      onDragLeave={onDragLeave}
    >
      <p>{card.content}</p>
    </div>
  );
}

export default Card;