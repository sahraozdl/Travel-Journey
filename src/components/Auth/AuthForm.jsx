// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import { signInUser, signUpUser } from "../../config/auth";
import { useNavigate } from "react-router";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const user = isSignUp
        ? await signUpUser(email, password,username)
        : await signInUser(email, password);

      setSuccessMessage(isSignUp ? "Account created!" : "Signed in!");
      setTimeout(() => navigate("/"), 1000); // optional: redirect on success
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>
      {isSignUp && (
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-4 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border px-4 py-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isSignUp ? "Create Account" : "Login"}
      </button>

      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <p className="text-sm text-center">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 cursor-pointer"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </form>
  );
}
