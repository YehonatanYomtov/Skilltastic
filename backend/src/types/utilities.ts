import db from "../config/db";

type TransactionFunction<T = any, A = any[]> = Parameters<
  (typeof db)["transaction"]
>[0];

export type Transaction<T = any, A = any[]> = Parameters<
  TransactionFunction<T, A>
>[0];
