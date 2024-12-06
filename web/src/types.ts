export type ColumnTypes = "backlog" | "todo" | "doing" | "done";
export type DefaultDragEvent = React.DragEvent<HTMLDivElement>;
export type HandleDrag = {
  event: DefaultDragEvent;
  card: CardProps;
};

export interface CardProps {
  title: string;
  id: string;
  column: ColumnTypes;
}

export interface ProjectProps {
  id: string;
  name: string;
}
