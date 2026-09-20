const initialTransactions = [
  { id: 1, description: "Salary", amount: 3500, type: "income" },
  { id: 2, description: "Rent", amount: 1200, type: "expense" },
  { id: 3, description: "Freelance work", amount: 800, type: "income" },
  { id: 4, description: "Groceries", amount: 250, type: "expense" },
  { id: 5, description: "Electricity bill", amount: 90, type: "expense" },
  { id: 6, description: "Bonus", amount: 500, type: "income" },
];

export const initialState = {
  transactions: initialTransactions,
  filter: "all",
};

export function budgetReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const newTransaction = {
        ...action.payload,
        id: crypto.randomUUID(),
        amount: Number(action.payload.amount),
      };
      return {
        ...state,
        transactions: [...state.transactions, newTransaction],
      };
    }

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}
