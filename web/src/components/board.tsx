import { useEffect, useState } from "react";
import type { CardProps, DefaultDragEvent } from "../types";
import { FireIcon, WasteIcon } from "@houstonicons/react";
import Column from "./column";

import api from "../services/api";

export default function Board() {
  const [cards, setCards] = useState<CardProps[]>([] as CardProps[]);

  useEffect(() => {
    api.get("/tasks").then((response) => {
      setCards(response.data);
    });
  }, []);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12 hidden-scrollbar">
      <Column
        title="Backlog"
        headingColor="text-neutral-500"
        column="backlog"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Aberto"
        headingColor="text-yellow-200"
        column="todo"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Em progresso"
        headingColor="text-blue-200"
        column="doing"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Completo"
        headingColor="text-emerald-200"
        column="done"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
}

const BurnBarrel = ({
  setCards,
}: {
  setCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (event: DefaultDragEvent) => {
    event.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDelete = async (cardId: string) => {
    try {
      await api.delete(`/tasks/${cardId}`);
      await api.get("/tasks").then((response) => {
        setCards(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = async (event: DefaultDragEvent) => {
    const cardId = event.dataTransfer.getData("cardId");
    handleDelete(cardId);
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? (
        <FireIcon variant="bulk" color="#ef4444" />
      ) : (
        <WasteIcon variant="bulk" color="#737373" />
      )}
    </div>
  );
};
