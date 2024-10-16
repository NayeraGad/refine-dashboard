import React from "react";
import {
  DragOverlay,
  useDraggable,
  UseDraggableArguments,
} from "@dnd-kit/core";

interface Props {
  id: string;
  data: UseDraggableArguments["data"];
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
  const { setNodeRef, attributes, listeners, active } = useDraggable({
    id,
    data,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          position: "relative",
          borderRadius: "8px",
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
        }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div
              style={{
                cursor: "grabbing",
                borderRadius: "8px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  );
};

export default KanbanItem;
