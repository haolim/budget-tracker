import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./components/Login";
import Header from "./components/Header";
import Summary from "./components/Summary";
import FilterBar from "./components/FilterBar";
import TransactionList from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";

function App() {
  const { user, hasRole } = useContext(AuthContext);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="page">
      <Header />
      <div className="main">
        <Summary />
        <FilterBar />
        <TransactionList />
        {hasRole("admin") && <AddTransactionForm />}
      </div>
    </div>
  );
}

export default App;
