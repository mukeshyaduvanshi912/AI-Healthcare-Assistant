import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserCheck, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must contain uppercase letter';
    else if (!/[0-9]/.test(formData.password)) newErrors.password = 'Password must contain a number';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

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
      await axios.post(
        `${process.env.REACT_APP_API_URL || '/api'}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      );
      
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
            <p className="text-green-100">Create your HealthAI account</p>
          </div>

          {/* Form */}
          <div className="px-6 py-8">
            {error && (
              <div className="mb-6 flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-green-500 transition ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-green-500 transition ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">I am a...</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Healthcare Provider</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-green-500 transition ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                <p className="text-gray-500 text-xs mt-1">Min 8 chars, 1 uppercase, 1 number</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-green-500 transition ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition disabled:from-gray-400 disabled:to-gray-400 mt-6"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
                Sign in
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>By registering, you agree to our Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
