import { motion } from "framer-motion";
import type { CardProps, ColumnTypes } from "../types";
import { useState } from "react";
import { PlusSignIcon } from "@houstonicons/react";
import api from "../services/api";

export default function AddCard({
  column,
  setCards,
  project_id,
}: {
  setCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
  column: ColumnTypes;
  project_id: string;
}) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      project_id,
    };

    await api.post("/tasks", newCard);
    await api.get(`/tasks/${project_id}`).then((response) => {
      setCards(response.data);
    });

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Adicionar nova tarefa..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Fechar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Adicionar</span>
              <PlusSignIcon variant="solid" size={12} color="#0a0a0a" />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          onClick={() => setAdding(true)}
          type="button"
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Nova tarefa</span>
          <PlusSignIcon variant="solid" size={12} color="#a3a3a3" />
        </motion.button>
      )}
    </>
  );
}
