import React from 'react'
import Navbar from './Navbar'
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { Navigate } from "react-router-dom";

function Login() {

    const isLoggedIn = localStorage.getItem("@user");


    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: values.email,
                password: values.password
            });

            console.log(response.data)
    
            // Check if the response contains the expected message
            if (response.data && response.data.msg) {
                toast.info(response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });

                localStorage.setItem('@user', JSON.stringify(response.config.data))
                // You might want to handle navigation or state updates in a more React-friendly way
                window.location.reload();
                
            } else {
                // Handle unexpected response format
                console.error("Unexpected response format:", response);
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error("Error during login:", error);
            toast.error("Error during login", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    };

    const validationLogin = yup.object().shape({
        email: yup
            .string()
            .email("Email invalid")
            .required("Email is required"),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
    })

  return (
    <div>
    {isLoggedIn && (
        <Navigate to="/dashboard" replace={true} />
    )}
    <Navbar />
    <div className="max-w-screen-xl mx-auto">
        <h1 className="text-center text-2xl">Login Page</h1>
        <hr className="my-4" />

        <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationLogin}
        >
        <Form class="max-w-sm mx-auto">
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <Field
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            />

            <ErrorMessage 
                component="span"
                name="email"
                className="form-error"
            />
          </div>
          <div class="mb-5">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <ErrorMessage 
                component="span"
                name="password"
                className="form-error"
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </Form>
        </Formik>

        <ToastContainer position='top-right' />
      </div>
    </div>
  )
}

export default Login
