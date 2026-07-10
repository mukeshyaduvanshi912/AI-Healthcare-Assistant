import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';


const Login = ({ setUser, setToken }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || '/api'}/auth/login`,
        formData
      );

      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setToken(response.data.token);
      navigate('/patient/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-blue-600 to-blue-900">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="overflow-hidden bg-white shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-8 text-center bg-gradient-to-r from-blue-600 to-blue-800">
            <h1 className="mb-2 text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100">Sign in to HealthAI</p>
          </div>

          {/* Form Container */}
          <div className="px-6 py-8">
            {/* Error Alert */}
            {error && (
              <div className="flex gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Login Error</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition ${
                      errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs font-medium text-red-600">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center justify-center w-full py-3 font-semibold text-white transition rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="mr-2 animate-spin">⏳</span> Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">or</span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                Create one now
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 text-xs text-center text-gray-500 border-t border-gray-200 bg-gray-50">
            <p>Healthcare Diagnosis Assistant • Professional Edition</p>
          </div>
        </div>

        {/* Security Info */}
        <p className="mt-6 text-xs text-center text-blue-100">
          🔒 Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default Login;
