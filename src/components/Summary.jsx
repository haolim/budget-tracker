import styles from "./Summary.module.css";
import { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";
import { formatSGD } from "../utils/format";

export default function Summary() {
  const { transactions } = useContext(BudgetContext);

  const sumByType = (type) =>
    transactions
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = sumByType("income");
  const totalExpense = sumByType("expense");
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className={styles.panel}>
      <div className={styles.balance}>
        <div className={styles.balanceLabel}>Balance</div>
        <div
          className={`${styles.balanceValue} ${totalBalance < 0 ? styles.negative : ""}`}
        >
          {formatSGD(totalBalance)}
        </div>
      </div>
      <div className={styles.split}>
        <div className={styles.cell}>
          <div className={styles.cellLabel}>Income</div>
          <div className={`${styles.cellValue} ${styles.income}`}>
            {formatSGD(totalIncome)}
          </div>
        </div>
        <div className={styles.cell}>
          <div className={styles.cellLabel}>Expense</div>
          <div className={`${styles.cellValue} ${styles.expense}`}>
            {formatSGD(totalExpense)}
          </div>
        </div>
      </div>
    </div>
  );
}
