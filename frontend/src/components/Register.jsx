import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; 
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function Register() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm(); // Destructure getValues
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        setLoading(true);
        try {
            const response = await api.post('/api/register/', data);
            toast.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'An error occurred during registration.';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">User Registration</h1>
                </div>
                <div className="flex justify-center">
                    <div className="bg-white shadow-md rounded-lg w-full md:w-3/4 lg:w-2/4 p-8">
                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    id="username"
                                    placeholder="Username"
                                    {...register("username", { required: "Username is required", minLength: { value: 3, message: "Minimum length is 3" } })}
                                    onBlur={() => trigger('username')}
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <input
                                    type="email"
                                    className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    id="email"
                                    placeholder="Email"
                                    {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Invalid email format" } })}
                                    onBlur={() => trigger('email')}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <input
                                    type="password"
                                    className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    id="password"
                                    placeholder="Password"
                                    {...register("password", { required: "Password is required", minLength: { value: 4, message: "Minimum length is 4" } })}
                                    onBlur={() => trigger('password')}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <input
                                    type="password"
                                    className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    id="password2"
                                    placeholder="Confirm Password"
                                    {...register("password2", {
                                        required: "Confirmation password is required",
                                        validate: value => value === getValues("password") || "Passwords do not match", // Use getValues
                                    })}
                                    onBlur={() => trigger('password2')}
                                />
                                {errors.password2 && <p className="text-red-500 text-xs mt-1">{errors.password2.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <input
                                    type="tel"
                                    className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    id="phone_number"
                                    placeholder="Phone Number"
                                    {...register("phone_number", {
                                        required: "Phone number is required",
                                        pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits long" },
                                    })}
                                    onBlur={() => trigger('phone_number')}
                                />
                                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
                            </div>

                            <div className="text-center mt-6">
                                {!loading ? (
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                                    >
                                        Register
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="spinner-border animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white" role="status"></div>
                                            Loading...
                                        </div>
                                    </button>
                                )}
                            </div>

                            <div className="text-center mt-4">
                                <p>
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-blue-500 font-medium">Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
