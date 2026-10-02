import { TransactionManager } from "@/domain/TransactionManager";

import { database } from "./database";

export class SQLiteTransactionManager implements TransactionManager {
  run(operation: () => void): void {
    database.withTransactionSync(operation);
  }
}
