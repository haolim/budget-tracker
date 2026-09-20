import styles from "./TransactionList.module.css";
import { BudgetContext } from "../contexts/BudgetContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { formatSGD } from "../utils/format";

const typeStyles = {
  income: {
    stripe: styles.stripeIncome,
    badge: styles.typeIncome,
    amount: styles.amountIncome,
  },
  expense: {
    stripe: styles.stripeExpense,
    badge: styles.typeExpense,
    amount: styles.amountExpense,
  },
};
export default function TransactionList() {
  const { filter, filteredTransactions, deleteTransaction } =
    useContext(BudgetContext);
  const { hasRole } = useContext(AuthContext);
  if (filteredTransactions.length === 0) {
    return (
      <div className={styles.empty}>
        {filter === "all"
          ? "No transactions yet!"
          : `No ${filter} transactions!`}
      </div>
    );
  }
  return (
    <ul className={styles.list}>
      {filteredTransactions.map((t) => {
        const c = typeStyles[t.type];
        return (
          <li key={t.id} className={styles.row}>
            <div className={`${styles.stripe} ${c.stripe}`}></div>
            <div className={styles.body}>
              <div className={styles.description}>{t.description}</div>
              <div className={`${styles.type} ${c.badge}`}>{t.type}</div>
            </div>
            <div className={`${styles.amount} ${c.amount}`}>
              {formatSGD(t.amount)}
            </div>
            {hasRole("admin") && (
              <button
                className={styles.delete}
                onClick={() => deleteTransaction(t.id)}
              >
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
