// src/components/Auth/Login/index.jsx
import { useNavigate } from "react-router";
import { AuthForm } from "../AuthForm";

export function Login() {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 relative w-full max-w-md mx-auto">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
        >
          &times;
        </button>
        <div className="inner-container">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
