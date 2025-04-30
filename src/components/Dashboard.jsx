import React from "react";
import { UserAuth } from "../context/ContextAuth";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // Optional icon

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md bg-black/70 text-white p-8 rounded-2xl shadow-md backdrop-blur-md text-center">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <h2 className="text-lg text-gray-300 mb-6">
          Welcome, <span className="text-white font-medium">{session?.user.email}</span>
        </h2>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
