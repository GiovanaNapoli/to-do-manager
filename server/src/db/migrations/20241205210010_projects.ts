import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("projects", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {}
