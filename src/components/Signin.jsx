import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/ContextAuth";
import { Mail, Lock } from "lucide-react"; // Or use any other icon library

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signInUser({ email, password });
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      setError("An unexpected error occurred.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/60 px-4">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-black/80 text-white p-8 rounded-2xl shadow-md backdrop-blur-md"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="/supabase.png"
            alt="Logo"
            className="w-12 h-12 object-contain mb-2"
          />
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              Sign up!
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400 mt-1" size={18} />
            <input
              type="email"
              placeholder="youremail@example.com"
              className="w-full pl-10 pr-3 py-3 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400 mt-1" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {error && (
            <p className="text-sm text-red-500 text-center pt-2">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signin;
