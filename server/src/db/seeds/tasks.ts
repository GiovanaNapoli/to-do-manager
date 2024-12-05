import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("tasks").del();

  // Inserts seed entries
  await knex("tasks").insert([
    // BACKLOG
    {
      title: "Investigar bug de renderização no painel",
      id: "1",
      column: "backlog",
    },
    { title: "Checklist de conformidade SOX", id: "2", column: "backlog" },
    { title: "[SPIKE] Migrar para Azure", id: "3", column: "backlog" },
    {
      title: "Documentar o serviço de notificações",
      id: "4",
      column: "backlog",
    },
    // TODO
    {
      title: "Pesquisar opções de banco de dados para novo microserviço",
      id: "5",
      column: "todo",
    },
    { title: "Postmortem da falha no sistema", id: "6", column: "todo" },
    {
      title: "Alinhar com o produto sobre o roadmap do Q3",
      id: "7",
      column: "todo",
    },
    // DOING
    {
      title: "Refatorar context providers para usar Zustand",
      id: "8",
      column: "doing",
    },
    { title: "Adicionar logs ao CRON diário", id: "9", column: "doing" },
    // DONE
    {
      title: "Configurar dashboards DD para o listener Lambda",
      id: "10",
      column: "done",
    },
  ]);
}
