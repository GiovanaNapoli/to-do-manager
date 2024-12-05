import { motion } from "framer-motion";
import type { CardProps, HandleDrag } from "../types";
import DropIndicator from "./dropIndicator";

type CardComponent = CardProps & {
  handleDragStart({ event, card }: HandleDrag): void;
};

export default function Card({
  column,
  handleDragStart,
  id,
  title,
}: CardComponent) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable
        onDragStart={(event) =>
          handleDragStart({ event, card: { title, id, column } })
        }
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
}
