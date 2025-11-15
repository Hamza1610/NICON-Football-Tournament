// src/api/userApi.ts
import axiosInstance from './axiosInstance';
import { User, UserRole } from '../types'; // Assuming you have these types defined

// --- Authentication ---
export const registerUser = async (userData: { full_name: string; email: string; password: string; role?: UserRole }): Promise<User> => {
  // Note: The backend example didn't show password in the user creation model.
  // You might need a separate /auth/register endpoint or adjust the model.
  // For now, assuming password is handled separately or not stored directly in the user table during initial creation.
  // Adjust the backend endpoint and payload as needed.
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // Note: The backend example didn't show a dedicated login endpoint.
  // You'll need to implement this on the backend (e.g., /auth/login)
  // which validates credentials and returns a JWT.
  // This is a placeholder for the actual login endpoint.
  // const response = await axiosInstance.post('/auth/login', { email, password });
  // return response.data;

  // For now, let's assume you manually handle login and store the token
  // This function would typically call your backend login API
  throw new Error("Login endpoint not implemented yet in backend example");
};

// --- User Data ---
export const fetchCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

// Add other user-specific API calls if needed (e.g., update profile)