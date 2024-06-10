import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "./ui/Input";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateUsername = (username: string): string => {
    if (username.length < 5) {
      return "Username must be at least 5 characters long";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return "";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/register`,
          formData
        );
        console.log("Registration successful", response.data);
      } catch (error:any) {
        console.error("Registration failed", error.response?.data);
      }
    }
  };

  return (
    <section className="sm:flex justify-center text-white sm:fixed h-screen bg-indigo-900 sm:overflow-hidden w-full">
      <div className="sm:w-1/2 text-center flex flex-col justify-center items-center">
        <h2 className="md:text-5xl mb-5 text-3xl font-light">Register</h2>
        <div className="p-10 flex justify-center">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="text-left">
              <label htmlFor="username">Username</label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter Your Username"
                type="text"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="text-left">
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Your Email"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="password">Password</label>
              <Input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="text-left">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:h-14 bg-indigo-500 backdrop-blur-sm text-white hover:bg-indigo-300 rounded-xl"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
