import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("projects").del();

  // Inserts seed entries
  await knex("projects").insert([{ id: "1", name: "root", user_id: "1" }]);
}
