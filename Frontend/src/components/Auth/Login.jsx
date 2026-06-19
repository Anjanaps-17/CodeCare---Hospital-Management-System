import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/AuthService";
import LoginForm from "../../pages/AuthPages/LoginForm";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(formData);

      console.log(response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("username", response.username);

      alert("Login successful!");

      // ✅ FIXED NAVIGATION
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  };

  return (
    <LoginForm
      formData={formData}
      changeHandler={changeHandler}
      submitHandler={submitHandler}
    />
  );
};

export default Login;