import { ArrowRight01Icon, PlusSignCircleIcon } from "@houstonicons/react";
import { useEffect, useState } from "react";
import api from "../services/api";
import type { ProjectProps } from "../types";

export default function Header({
  setSelectedProject,
}: {
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
}) {
  const user_id = localStorage.getItem("user_id");

  const [projects, setProjects] = useState<ProjectProps[]>([]);

  useEffect(() => {
    api
      .get("/projects", {
        headers: {
          Authorization: user_id,
        },
      })
      .then((response) => {
        setProjects(response.data);
        setSelectedProject(response.data[0].id);
      });
  }, [user_id, setSelectedProject]);

  const handleNewProject = async () => {
    const project = prompt("Nome do projeto", "Teste");

    if (project) {
      await api.post(
        "/projects",
        {
          name: project,
        },
        {
          headers: {
            Authorization: user_id,
          },
        }
      );

      await api
        .get("/projects", {
          headers: {
            Authorization: user_id,
          },
        })
        .then((response) => {
          setProjects(response.data);
        });
    }
  };

  return (
    <div className="flex items-center gap-2 px-12 py-2 bg-neutral-950">
      <div className="flex items-center justify-center gap-1">
        <p className="text-sm font-semibold">Projetos</p>
        <ArrowRight01Icon size={16} variant="bulk" color="white" />
      </div>
      <select
        onChange={(e) => {
          setSelectedProject(e.target.value);
        }}
        defaultValue={projects[0]?.id}
        className="w-40 p-2 bg-neutral-950 border border-zinc-900 rounded-lg placeholder-zinc-400 outline-none text-sm hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10"
      >
        {projects.map((p) => (
          <option className="text-sm" key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <button
        className="flex p-2 items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500"
        type="button"
        onClick={handleNewProject}
      >
        <PlusSignCircleIcon size={16} variant="bulk" color="white" />
        Novo projeto
      </button>
    </div>
  );
}
