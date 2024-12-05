export type ColumnTypes = "backlog" | "todo" | "doing" | "done";
export type DefaultDragEvent = React.DragEvent<HTMLDivElement>;
export type HandleDrag = {
  event: DefaultDragEvent;
  card: CardProps;
};

export interface CardProps {
  title: string; // The title of the card, describing the task or item
  id: string; // A unique identifier for the card
  column: ColumnTypes; // The column the card belongs to, with specific allowed values
}
