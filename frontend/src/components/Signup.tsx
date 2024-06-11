import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Input } from "./ui/Input";
import axios from "axios";
import { toast } from "sonner";
const BASE_URL = import.meta.env.VITE_BASE_URL; //url of the 

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

const Signup = () => {

  //state for storing the formData
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //state for storing the errors
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const showError=useRef(false) // ref for checking when to start cheking validation 

  //Username Validation
  const validateUsername = (username: string): string => {
    if (username.length < 5) {
      return "Username must be at least 5 characters long";
    }
    return "";
  };

  // Email Validation
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  // Password Validation
  const validatePassword = (password: string): string => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@$!%*?&)[A-Za-z\d@$!%*?&]{8,}$/; //regex for Password validation
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number";
    }
    return "";
  };

  // validation for confirmPassword
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  // Adding data to the state
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  // Form validation check
  const validateForm = (): boolean => {
    const newErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === ""); //return true if there no validation errors
  };

  // form handler
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    showError.current=true
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/register`,
          formData
        );
        console.log("Registration successful", response.data);
        toast.success("Registration successful");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        showError.current=false
      } catch (error:any) {
        console.error("Registration failed", error.response?.data);
        toast.error(error.response?.data.message)
      }
    }else{
      
    }
  };

    useEffect(() => {
      if(showError.current){
        validateForm()

      }
    }, [formData]);

  return (
    <section className="md:pt-10 justify-center overflow-y-auto  text-white sm:fixed  bg-indigo-900 h-screen items-center w-full">
      <div className=" text-center items-center w-full">
        <h2 className="md:text-5xl mb-5 text-3xl font-bold ">TechDock-Registration</h2>
        <div className="md:flex  ">
          <div className="w-full relative md:items-end flex justify-center flex-col items-center">
            <div className="flex justify-center">
              {Object.values(errors).every(error => error == "") ? (
                <img
                  src="/checklist-clipboard-pencil-icon-sign-symbol-reminder-checkbox-document-report-concept-pink-background-3d-rendering.png"
                  alt="With Error"
                  width={500}
                />
              ) : (
                <img
                  src="denied-checklist-3d-clipboard-with-cross-marks.png"
                  alt="With error"
                  width={300}
                />
              )}
            </div>
            {Object.values(errors).map(ele => (
              <>
                <div className="w-80">{ele}</div>
              </>
            ))}
          </div>
          <div className="p-14 flex flex-col  lg:items-start items-center justify-center w-full ">
            <form
              onSubmit={onSubmit}
              className="space-y-3 flex flex-col justify-center "
            >
              <div className="text-left">
                <label htmlFor="username">Username</label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter Your Username"
                  className={
                    errors.username
                      ? `focus-visible:ring-red-500 outline outline-red-500`
                      : ""
                  }
                  type="text"
                />
              </div>

              <div className="text-left">
                <label htmlFor="email">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter Your Email"
                  className={
                    errors.email
                      ? `focus-visible:ring-red-500 outline outline-red-500`
                      : ""
                  }
                />
              </div>

              <div className="text-left">
                <label htmlFor="password">Password</label>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                  className={
                    errors.password
                      ? `focus-visible:ring-red-500 outline outline-red-500`
                      : ""
                  }
                />
              </div>

              <div className="text-left">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Confirm Password"
                  className={
                    errors.confirmPassword
                      ? `focus-visible:ring-red-500 outline outline-red-500`
                      : ""
                  }
                />
              </div>

              <button
                type="submit"
                className="w-96 h-14 bg-indigo-500 backdrop-blur-sm text-white hover:bg-indigo-300 rounded-xl"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
