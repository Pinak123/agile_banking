import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import { getAccount, deposit, withdraw } from "../services/api.js";

// Sprint 2: Account page - view balance, deposit, withdraw
const AccountPage = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ amount: "", description: "" });
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      const data = await getAccount();
      setAccount(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleDeposit = async (event) => {
    event.preventDefault();
    setMessage("");
    setActionError("");
    
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) {
      setActionError("Please enter a positive amount.");
      return;
    }

    try {
      const result = await deposit(amount, form.description || "Deposit");
      setAccount((prev) => ({ ...prev, balance: result.newBalance }));
      setMessage(`Successfully deposited $${amount.toFixed(2)}`);
      setForm({ amount: "", description: "" });
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();
    setMessage("");
    setActionError("");

    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) {
      setActionError("Please enter a positive amount.");
      return;
    }

    try {
      const result = await withdraw(amount, form.description || "Withdrawal");
      setAccount((prev) => ({ ...prev, balance: result.newBalance }));
      setMessage(`Successfully withdrew $${amount.toFixed(2)}`);
      setForm({ amount: "", description: "" });
    } catch (err) {
      setActionError(err.message);
    }
  };

  if (loading) {
    return <PageLayout><div className="card">Loading...</div></PageLayout>;
  }

  if (error) {
    return <PageLayout><div className="card"><div className="alert">{error}</div></div></PageLayout>;
  }

  return (
    <PageLayout>
      <div className="card">
        <h2>My Account</h2>
        <p className="muted">Manage your account balance.</p>
      </div>

      <div className="card">
        <h3>Account Details</h3>
        <p><strong>Account Number:</strong> {account?.accountNumber}</p>
        <p><strong>Owner:</strong> {account?.owner?.name}</p>
        <p><strong>Email:</strong> {account?.owner?.email}</p>
        <p><strong>Current Balance:</strong> <span className="balance">${account?.balance?.toFixed(2)}</span></p>
      </div>

      <div className="card grid two">
        <div>
          <h3>💵 Deposit Money</h3>
          <form className="grid" onSubmit={handleDeposit}>
            <label>
              Amount ($)
              <input
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </label>
            <label>
              Description (optional)
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g., Salary"
              />
            </label>
            <button type="submit">Deposit</button>
          </form>
        </div>

        <div>
          <h3>💸 Withdraw Money</h3>
          <form className="grid" onSubmit={handleWithdraw}>
            <label>
              Amount ($)
              <input
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </label>
            <label>
              Description (optional)
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g., Bills"
              />
            </label>
            <button type="submit">Withdraw</button>
          </form>
        </div>
      </div>

      {message && <div className="card"><div className="alert success">{message}</div></div>}
      {actionError && <div className="card"><div className="alert">{actionError}</div></div>}
    </PageLayout>
  );
};

export default AccountPage;
