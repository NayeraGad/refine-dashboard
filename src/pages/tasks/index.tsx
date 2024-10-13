import {
  KanbanBoardContainer,
  KanbanBoard,
  KanbanColumn,
  KanbanItem,
} from "@/components";
import KanbanAddCard from "@/components/kanban/KanbanAddCard";
import { ProjectCardMemo } from "@/components/kanban/ProjectCard";
import { PageSkeleton } from "@/components/skeleton/KanbanPageSkeleton";
import { UPDATE_TASK_STAGE_MUTATION } from "@/graphql/mutations";
import { TASK_STAGES_QUERY, TASKS_QUERY } from "@/graphql/queries";
import { TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { DragEndEvent } from "@dnd-kit/core";
import { useList, useUpdate } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import React from "react";

export const Tasks = ({ children }: React.PropsWithChildren) => {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: "taskStages",
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
  });

  const { data: tasks, isLoading } = useList<GetFieldsFromList<TasksQuery>>({
    resource: "tasks",
    meta: {
      gqlQuery: TASKS_QUERY,
    },
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    pagination: {
      mode: "off",
    },
    queryOptions: {
      enabled: !!stages,
    },
  });

  const { mutate: updateTask } = useUpdate();

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: [],
      };
    }

    const unassignedStage = tasks?.data.filter((task) => task.stageId === null);

    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks?.data.filter(
        (task) => task.stageId?.toString() === stage.id
      ),
    }));

    return {
      unassignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {};

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) return;

    if (stageId === "unassigned") {
      stageId = null;
    }

    updateTask({
      resource: "tasks",
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION,
      },
      id: taskId,
      mutationMode: "optimistic",
      values: {
        stageId: stageId,
      },
    });
  };

  if (isLoading || isLoadingStages) {
    return <PageSkeleton />;
  }

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id="unassigned"
            title={"unassigned"}
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unassigned" })}
          >
            {taskStages.unassignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...tasks, stageId: "unassigned" }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}

            {!taskStages.unassignedStage.length && (
              <KanbanAddCard
                onClick={() => handleAddCard({ stageId: "unassigned" })}
              />
            )}
          </KanbanColumn>

          {taskStages.columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              {(!isLoading || !isLoadingStages) &&
                column.tasks.map((task) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <ProjectCardMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}

              {!column.tasks.length && (
                <KanbanAddCard
                  onClick={() => handleAddCard({ stageId: column.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>

      {children}
    </>
  );
};
