import { useState } from "react";
import { registerUser } from "../../api/AuthService";
import SignupForm from "../../pages/AuthPages/SignupForm";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  // Handle input changes
  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submit
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log(response);

      alert("User registered successfully!");

      // Clear form
      setFormData({
        username: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration failed!");
    }
  };

  return (
    <SignupForm
      formData={formData}
      changeHandler={changeHandler}
      submitHandler={submitHandler}
    />
  );
};

export default Signup;