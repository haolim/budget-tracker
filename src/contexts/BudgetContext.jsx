import { useReducer, createContext } from "react";
import { budgetReducer, initialState } from "../reducers/budgetReducer";

export const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const { transactions, filter } = state;

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const setFilter = (newFilter) => {
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        filteredTransactions,
        filter,
        addTransaction,
        deleteTransaction,
        setFilter,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
