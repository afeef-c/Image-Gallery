import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm();
  const navigate = useNavigate();

  const handlePasswordReset = async (data) => {
    setLoading(true);
    try {
      await api.post('/api/reset-password/', data);
      toast.success('Password reset successful!');
      navigate('/login'); // Redirect to login page after success
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'An error occurred during password reset.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
        </div>
        <div className="flex justify-center">
          <div className="bg-white shadow-md rounded-lg w-full md:w-3/4 lg:w-2/4 p-8">
            <form onSubmit={handleSubmit(handlePasswordReset)} className="space-y-6">
              {/* Current Password */}
              <div className="space-y-1">
                <input
                  type="password"
                  className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  id="current_password"
                  placeholder="Current Password"
                  {...register("current_password", { required: "Current password is required" })}
                  onBlur={() => trigger('current_password')}
                />
                {errors.current_password && (
                  <p className="text-red-500 text-xs mt-1">{errors.current_password.message}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-1">
                <input
                  type="password"
                  className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  id="new_password"
                  placeholder="New Password"
                  {...register("new_password", { 
                    required: "New password is required", 
                    minLength: { value: 8, message: "Minimum length is 8" },
                    validate: value => value !== getValues("current_password") || "New Passwords must be diffrent" 

                  })}


                  onBlur={() => trigger('new_password')}
                />
                {errors.new_password && (
                  <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1">
                <input
                  type="password"
                  className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  id="confirm_password"
                  placeholder="Confirm New Password"
                  {...register("confirm_password", { 
                    required: "Confirmation password is required", 
                    validate: value => value === getValues("new_password") || "Passwords do not match" 
                  })}
                  onBlur={() => trigger('confirm_password')}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>
                )}
              </div>

              <div className="text-center mt-6">
                {!loading ? (
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Reset Password
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
