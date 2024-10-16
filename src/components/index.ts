// Home Components
import DealsChart from "./homeComponents/DealsChart";
import UpcomingEvents from "./homeComponents/UpcomingEvents";
import DashboardTotalCountCards from "./homeComponents/DashboardTotalCountCards";
import DashboardLatestActivities from "./homeComponents/DashboardLatestActivities";

// Kanban
import { KanbanBoardContainer } from "./Tasks/kanban/KanbanBoardContainer";
import { KanbanBoard } from "./Tasks/kanban/KanbanBoardContainer";
import KanbanColumn from "./Tasks/kanban/KanbanColumn";
import KanbanItem from "./Tasks/kanban/KanbanItem";
import ProjectCard from "./Tasks/kanban/ProjectCard";
import KanbanAddCard from "./Tasks/kanban/KanbanAddCard";

// Tasks Form Components
export * from "./Tasks/form/accordion";
export * from "./Tasks/form/description";
export * from "./Tasks/form/due-date";
export * from "./Tasks/form/header";
export * from "./Tasks/form/stage";
export * from "./Tasks/form/title";
export * from "./Tasks/form/user-tag";
export * from "./Tasks/form/users";

// Skeletons
import AccordionHeaderSkeleton from "./skeleton/accordion-header";
import KanbanColumnSkeleton from "./skeleton/kanban";
import LatestActivitiesSkeleton from "./skeleton/latest-activities";
import ProjectCardSkeleton from "./skeleton/project-card";
import UpcomingEventsSkeleton from "./skeleton/upcoming-events";

export {
  DealsChart,
  UpcomingEvents,
  DashboardTotalCountCards,
  DashboardLatestActivities,
  KanbanBoardContainer,
  KanbanBoard,
  KanbanColumn,
  KanbanItem,
  ProjectCard,
  KanbanAddCard,
  AccordionHeaderSkeleton,
  KanbanColumnSkeleton,
  LatestActivitiesSkeleton,
  ProjectCardSkeleton,
  UpcomingEventsSkeleton,
};
