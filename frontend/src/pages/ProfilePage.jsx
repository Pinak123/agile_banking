import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getAccount } from "../services/api.js";

// Sprint 2: Profile page with user info and logout
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const data = await getAccount();
        setAccount(data);
      } catch (err) {
        console.error("Failed to load account:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAccount();
  }, []);

  return (
    <PageLayout>
      <div className="card">
        <h2>My Profile</h2>
        <p className="muted">Your account information.</p>
      </div>

      <div className="card">
        <h3>👤 Personal Information</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
      </div>

      <div className="card">
        <h3>🏦 Banking Information</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p><strong>Account Number:</strong> {account?.accountNumber || "N/A"}</p>
            <p><strong>Current Balance:</strong> ${account?.balance?.toFixed(2) || "0.00"}</p>
          </>
        )}
      </div>

      <div className="card">
        <h3>⚙️ Actions</h3>
        <button className="secondary" onClick={logout}>
          Logout
        </button>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
