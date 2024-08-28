import { Knex } from "knex";

export type CustomTransaction = Knex.Transaction & {
  <TRecord, TResult>(tableName: string): Knex.QueryBuilder<TRecord, TResult>;
  <TRecord>(tableName: string): Knex.QueryBuilder<TRecord, TRecord>;
};
