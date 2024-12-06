import { useEffect, useState } from "react";
import type { CardProps, DefaultDragEvent } from "../types";
import { FireIcon, WasteIcon } from "@houstonicons/react";
import Column from "./column";

import api from "../services/api";

export default function Board({
  selectedProject: project_id,
}: {
  selectedProject: string;
}) {
  const [cards, setCards] = useState<CardProps[]>([] as CardProps[]);

  useEffect(() => {
    api.get(`/tasks/${project_id}`).then((response) => {
      setCards(response.data);
    });
  }, [project_id]);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12 hidden-scrollbar">
      <Column
        title="Backlog"
        headingColor="text-neutral-500"
        column="backlog"
        cards={cards}
        setCards={setCards}
        project_id={project_id}
      />
      <Column
        title="Aberto"
        headingColor="text-amber-500"
        column="todo"
        cards={cards}
        project_id={project_id}
        setCards={setCards}
      />
      <Column
        title="Em progresso"
        headingColor="text-violet-500"
        column="doing"
        cards={cards}
        project_id={project_id}
        setCards={setCards}
      />
      <Column
        title="Completo"
        headingColor="text-green-500"
        column="done"
        cards={cards}
        project_id={project_id}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} project_id={project_id} />
    </div>
  );
}

const BurnBarrel = ({
  setCards,
  project_id,
}: {
  setCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  project_id: string;
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
      await api.get(`/tasks/${project_id}`).then((response) => {
        setCards(response.data);
      });
    } catch (error) {
      console.error(error);
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
