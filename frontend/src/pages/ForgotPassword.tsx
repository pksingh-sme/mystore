import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import MotionWrapper from '../components/ui/motion-wrapper';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send a password reset email
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  return (
    <MotionWrapper className="container mx-auto px-4 py-8 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
        <p className="text-gray-600">
          {isSubmitted 
            ? 'Check your email for a reset link' 
            : 'Enter your email to reset your password'}
        </p>
      </div>
      
      <div className="border rounded-lg p-6">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mb-6">
              We've sent a password reset link to <span className="font-medium">{email}</span>. 
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <Button variant="default" asChild>
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <Button type="submit" variant="default" className="w-full">
              Send Reset Link
            </Button>
            
            <div className="text-center mt-4">
              <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </MotionWrapper>
  );
};

export default ForgotPassword;