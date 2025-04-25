import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const forgotPassNew = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/forgot-password`,
        { email }
      );
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default forgotPassNew;