import { DndContext } from '@dnd-kit/core';
import React from 'react'

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'column',
      width: 'calc(100% + 64px)',
      height: 'calc(100vh - 64px)',
      margin: '-32px' ,
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        height: '95%',
        padding: '32px',
        overflow: 'scroll',
      }}>
        {children}
      </div>
    </div>
  )
}

export const KanbanBoard = ({ children }: React.PropsWithChildren) => {
  return (
    <DndContext>
      {children}
    </DndContext>
  )
};