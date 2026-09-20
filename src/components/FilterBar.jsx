import { BudgetContext } from "../contexts/BudgetContext";
import { useContext } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar() {
  const { filter, setFilter } = useContext(BudgetContext);

  return (
    <div className={styles.bar}>
      <button
        className={`${styles.button} ${filter === "all" ? styles.active : ""}`}
        aria-pressed={filter === "all"}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`${styles.button} ${filter === "income" ? styles.active : ""}`}
        aria-pressed={filter === "income"}
        onClick={() => setFilter("income")}
      >
        Income
      </button>
      <button
        className={`${styles.button} ${filter === "expense" ? styles.active : ""}`}
        aria-pressed={filter === "expense"}
        onClick={() => setFilter("expense")}
      >
        Expense
      </button>
    </div>
  );
}
