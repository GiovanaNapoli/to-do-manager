import { ArrowRight01Icon, PlusSignCircleIcon } from "@houstonicons/react";

export default function Header() {
  return (
    <div className="flex items-center gap-2 px-12 py-8">
      <div className="flex items-center justify-center gap-1">
        <p className="text-sm font-semibold">Projetos</p>
        <ArrowRight01Icon size={16} variant="bulk" color="white" />
      </div>
      <select className="border-zinc-800 border rounded-sm w-40 p-2 text-sm bg-transparent">
        <option className="text-sm">Todos</option>
        <option className="text-sm">Todos</option>
        <option className="text-sm">Todos</option>
      </select>
      <button
        className="bg-green-600 p-2 text-sm font-semibold text-white rounded flex items-center gap-1"
        type="button"
      >
        <PlusSignCircleIcon size={16} variant="bulk" color="white" />
        Novo projeto
      </button>
    </div>
  );
}
