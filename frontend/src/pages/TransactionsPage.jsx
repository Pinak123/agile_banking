import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import { getTransactions } from "../services/api.js";

// Sprint 3: Transaction history page
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  if (loading) {
    return <PageLayout><div className="card">Loading...</div></PageLayout>;
  }

  if (error) {
    return <PageLayout><div className="card"><div className="alert">{error}</div></div></PageLayout>;
  }

  return (
    <PageLayout>
      <div className="card">
        <h2>Transaction History</h2>
        <p className="muted">View all your past transactions.</p>
      </div>

      <div className="card">
        {transactions.length === 0 ? (
          <p className="muted">No transactions yet. Go to Account page to make your first deposit!</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>#{tx.id}</td>
                  <td>
                    <span className={tx.type === "deposit" ? "success" : ""}>
                      {tx.type === "deposit" ? "↑ Deposit" : "↓ Withdraw"}
                    </span>
                  </td>
                  <td>${tx.amount.toFixed(2)}</td>
                  <td>${tx.balanceAfter.toFixed(2)}</td>
                  <td>{tx.description || "-"}</td>
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h3>Summary</h3>
        <p>
          <strong>Total Transactions:</strong> {transactions.length}
        </p>
        <p>
          <strong>Total Deposits:</strong> $
          {transactions
            .filter((tx) => tx.type === "deposit")
            .reduce((sum, tx) => sum + tx.amount, 0)
            .toFixed(2)}
        </p>
        <p>
          <strong>Total Withdrawals:</strong> $
          {transactions
            .filter((tx) => tx.type === "withdraw")
            .reduce((sum, tx) => sum + tx.amount, 0)
            .toFixed(2)}
        </p>
      </div>
    </PageLayout>
  );
};

export default TransactionsPage;
