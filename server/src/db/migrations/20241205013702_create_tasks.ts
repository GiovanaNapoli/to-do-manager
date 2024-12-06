import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tasks", (table) => {
    table.string("id").primary();
    table.string("project_id").notNullable();
    table.foreign("project_id").references("id").inTable("projects");
    table.string("title").notNullable();
    table.string("column").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tasks");
}
