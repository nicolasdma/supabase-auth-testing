import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/ContextAuth";
import { Mail, Lock } from "lucide-react"; // Or use any other icon library

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { recoveryPassword } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await recoveryPassword({ email });
      if (result.success) {
        setSuccess("Recovery email sent successfully.");
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
          <h2 className="text-2xl font-semibold">Recover your password</h2>
          <p className="text-sm text-gray-400">
            You'll receive an email to reset your password.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute top-3 left-3 text-gray-400 mt-1"
              size={18}
            />
            <input
              type="email"
              placeholder="youremail@example.com"
              className="w-full pl-10 pr-3 py-3 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending ..." : "Send"}
          </button>
          <div className="flex flex-row justify-center gap-4">
            <p className="text-sm text-gray-400">
              <Link to="/signin" className="text-yellow-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center pt-2">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-400 text-center pt-2">{success}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signin;
