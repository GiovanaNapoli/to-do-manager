import { useState } from "react";
import type {
  CardProps,
  ColumnTypes,
  DefaultDragEvent,
  HandleDrag,
} from "../types";
import Card from "./card";
import DropIndicator from "./dropIndicator";
import AddCard from "./addCard";

interface ColumnProps {
  title: string;
  headingColor: string;
  column: ColumnTypes;
  cards: CardProps[];
  setCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
}

export default function Column({
  cards,
  column,
  headingColor,
  setCards,
  title,
}: ColumnProps) {
  const [active, setActive] = useState(false);

  const handleDragStart = ({ event, card }: HandleDrag) => {
    event.dataTransfer.setData("cardId", card.id);
  };

  const clearHighlights = (els?: Element[]) => {
    const indicators = els || getIndicators();

    for (const i of indicators) {
      i.style.opacity = "0";
    }
  };

  const highlightIndicator = (event: DefaultDragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(event, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DefaultDragEvent, indicators: Element[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragOver = (event: DefaultDragEvent) => {
    event.preventDefault();
    highlightIndicator(event);
    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const handleDragDrop = (event: DefaultDragEvent) => {
    clearHighlights();
    setActive(false);

    const cardId = event.dataTransfer.getData("cardId");

    const indicators = getIndicators();
    const { element } = getNearestIndicator(event, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const filteredCards = cards.filter((card) => card.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}
