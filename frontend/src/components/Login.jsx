// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { fetchUserDetails, loginUser } from '../authSlice';

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      
      toast.success("Login successful!");
      navigate('/')
    } catch (error) {
      toast.error('Login failed: ' + (error?.message || 'Please check your credentials'));
    } finally {
      setLoading(false);
    }
  };

  

  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await dispatch(loginWithGoogle(idToken)).unwrap();
      navigate('/')
      toast.success("Google login successful!");
    } catch (error) {
      toast.error('Google login failed: ' + (error?.message || 'An error occurred'));
    } finally {
      setLoadingGoogle(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center py-5 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
      </div>
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-lg w-full md:w-3/4 lg:w-2/4 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              
              <input
                type="text"
                className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              
              <input
                type="password"
                className="form-input p-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-6">
              {!loading ? (
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Login
                </button>
              ) : (
                <button
                    type="button"
                    className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md opacity-50 cursor-not-allowed"
                    disabled
                >
                    <div className="flex items-center justify-center">
                        <div className="spinner-border animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white" role="status"></div>
                        
                    </div>
                </button>
              )}
            </div>
            {/* Google login button can be added here */}
            <div className="text-center mt-4">
              <p>
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 font-medium"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;
