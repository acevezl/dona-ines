export interface TransactionManager {
  run(operation: () => void): void;
}