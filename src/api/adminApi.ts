// src/api/adminApi.ts
import axiosInstance from './axiosInstance';
import { User, Team, Match, Payment, Post } from '../types'; // Assuming you have these types defined

// --- Users ---
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const fetchUsersByRole = async (role: string): Promise<User[]> => {
  const response = await axiosInstance.get(`/users?role=${role}`);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axiosInstance.delete(`/users/${userId}`);
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  const response = await axiosInstance.put(`/users/${userId}`, userData);
  return response.data;
};

// --- Teams ---
export const fetchTeams = async (): Promise<Team[]> => {
  const response = await axiosInstance.get('/teams');
  return response.data;
};

export const createTeam = async (teamData: Omit<Team, 'id' | 'created_at'>): Promise<Team> => {
  const response = await axiosInstance.post('/teams', teamData);
  return response.data;
};

export const updateTeam = async (teamId: string, teamData: Partial<Team>): Promise<Team> => {
  const response = await axiosInstance.put(`/teams/${teamId}`, teamData);
  return response.data;
};

export const deleteTeam = async (teamId: string): Promise<void> => {
  await axiosInstance.delete(`/teams/${teamId}`);
};

// --- Matches ---
export const fetchMatches = async (): Promise<Match[]> => {
  const response = await axiosInstance.get('/matches');
  return response.data;
};

export const createMatch = async (matchData: Omit<Match, 'id' | 'created_at' | 'score_a' | 'score_b'>): Promise<Match> => {
  const response = await axiosInstance.post('/matches', matchData);
  return response.data;
};

export const updateMatch = async (matchId: string, matchData: Partial<Match>): Promise<Match> => {
  const response = await axiosInstance.put(`/matches/${matchId}`, matchData);
  return response.data;
};

export const deleteMatch = async (matchId: string): Promise<void> => {
  await axiosInstance.delete(`/matches/${matchId}`);
};

// --- Payments ---
export const fetchPendingPayments = async (): Promise<Payment[]> => {
  const response = await axiosInstance.get('/payments/pending');
  return response.data;
};

export const verifyPayment = async (paymentId: string): Promise<Payment> => {
  const response = await axiosInstance.post(`/payments/${paymentId}/verify`);
  return response.data;
};

export const failPayment = async (paymentId: string): Promise<Payment> => {
  const response = await axiosInstance.post(`/payments/${paymentId}/fail`);
  return response.data;
};

// --- Posts ---
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get('/posts');
  return response.data;
};

export const createPost = async (postData: Omit<Post, 'id' | 'created_at'>): Promise<Post> => {
  const response = await axiosInstance.post('/posts', postData);
  return response.data;
};

export const updatePost = async (postId: string, postData: Partial<Post>): Promise<Post> => {
  const response = await axiosInstance.put(`/posts/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId: string): Promise<void> => {
  await axiosInstance.delete(`/posts/${postId}`);
};