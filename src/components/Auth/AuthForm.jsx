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
        ? await signUpUser(email, password, username)
        : await signInUser(email, password);

      setSuccessMessage(isSignUp ? "Account created!" : "Signed in!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      {isSignUp && (
        <>
          <label htmlFor="username" className="">
            Username:
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="w-full border px-4 py-2 my-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </>
      )}
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 my-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        className="w-full border px-4 py-2 my-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full my-4 bg-red-500 text-white py-2 rounded hover:bg-red-700"
      >
        {isSignUp ? "Create Account" : "Login"}
      </button>

      {/* Make sure that the error / success message is centerd and crearly visible (check accesibiliy for color contrast) */}
      {successMessage && <p className="text-yellow-700">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <p className="text-sm text-center">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-red-500 cursor-pointer"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </form>
  );
}
