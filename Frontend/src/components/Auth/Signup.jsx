import { useEffect, useState } from "react";
import { getRoles, registerUser } from "../../api/AuthService";
import SignupForm from "../../pages/AuthPages/SignupForm";

const Signup = () => {
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        RoleId:""
    });

    const [roles, setRoles] = useState([]);
    useEffect(()=>{
        fetchRoles()
    },[]);

    const fetchRoles = async() => {
        try{
            const response = await getRoles();
            setRoles(response.data)
        } catch(error) {
            console.log(error)
        };
    };

    //handle input changes
    const changeHandler = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value,
        });
    }

    //handle form submit

    const submitHandler = async(event)=>{
        event.preventDefault();
if (!formData.RoleId) {
        alert("Please select a role");
        return;
    }

        try{
            const response = await registerUser(formData);
            console.log(response);
            alert("User registered successfully!!");

            //clear form
            setFormData({
                username:"",
                password:"",
                RoleId:""
            })
        } catch(error) {
            console.log(error);
            alert("Registration failed!")
        }
    }

    return (
        <SignupForm formData={formData} 
                    roles={roles}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}/>
    )
};

export default Signup;