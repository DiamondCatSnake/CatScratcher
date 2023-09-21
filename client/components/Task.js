import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Category from './Category';
import '../stylesheets/app.css';


export default function Task({ task, index, onTaskClick, onTaskRemove }) {
  console.log("TASK", task);
  return (
    <Draggable draggableId={String(task._id)} index={index}>
      {(provided, snapshot) => (
        <box className='taskDisplay'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
            ...provided.draggableProps.style,
          }}
        >
          <div className='taskContent' onClick={() => onTaskClick(task)}>
            {task.Task_Name}
          </div>
          <button
            className={`taskButton ${snapshot.isDragging ? 'dragged' : ''}`}
            onClick={() => onTaskRemove(task._id)}
          >Delete
          </button>

        </box>
      )}
    </Draggable>
  );
}
