import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getAccount, getTransactions } from "../services/api.js";

// Sprint 2: Dashboard page with account summary
const DashboardPage = () => {
  const { user } = useAuth();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [accountData, txData] = await Promise.all([
          getAccount(),
          getTransactions(),
        ]);
        setAccount(accountData);
        setTransactions(txData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <PageLayout><div className="card">Loading...</div></PageLayout>;
  }

  if (error) {
    return <PageLayout><div className="card"><div className="alert">{error}</div></div></PageLayout>;
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <PageLayout>
      <div className="card">
        <h2>Welcome, {user?.name || "User"}!</h2>
        <p className="muted">Here's your account overview.</p>
      </div>

      <div className="card grid two">
        <div>
          <h3>💰 Current Balance</h3>
          <p className="balance">${account?.balance?.toFixed(2) || "0.00"}</p>
        </div>
        <div>
          <h3>🔢 Account Number</h3>
          <p className="pill">{account?.accountNumber || "N/A"}</p>
        </div>
      </div>

      <div className="card">
        <h3>📜 Recent Transactions</h3>
        {recentTransactions.length === 0 ? (
          <p className="muted">No transactions yet. Make a deposit to get started!</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <span className={tx.type === "deposit" ? "success" : ""}>
                      {tx.type === "deposit" ? "↑ Deposit" : "↓ Withdraw"}
                    </span>
                  </td>
                  <td>${tx.amount.toFixed(2)}</td>
                  <td>${tx.balanceAfter.toFixed(2)}</td>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
