import styles from "./AddTransactionForm.module.css";
import { BudgetContext } from "../contexts/BudgetContext";
import { useContext, useState } from "react";

const emptyForm = { description: "", amount: "", type: "expense" };

export default function AddTransactionForm() {
  const { addTransaction } = useContext(BudgetContext);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);

    if (form.description === "" || Number.isNaN(amount) || amount <= 0) {
      setError("Description and a valid amount are required.");
      return;
    }
    setError("");
    addTransaction(form);
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.heading}>Add Transaction</h3>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <input
            className={styles.input}
            id="description"
            name="description"
            type="text"
            placeholder="Maintenance expenses"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="amount">
            Amount
          </label>
          <input
            className={styles.input}
            id="amount"
            name="amount"
            type="number"
            placeholder="10.50"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">
            Type
          </label>
          <select
            className={styles.select}
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Add
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
