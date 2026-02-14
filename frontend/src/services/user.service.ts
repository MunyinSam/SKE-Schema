import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import * as t from '@/types/index';

// Client-side instance (uses proxy middleware)
const instance = axios.create({
	baseURL: '/api/proxy/user',
});

// Server-side instance (uses direct backend URL)
const getServerInstance = () => {
	const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
	return axios.create({
		baseURL: `${backendUrl}/api/v1/user`,
	});
};

export interface CreateUserBody {
	id: string;
	email: string;
	name?: string | null;
}

export interface UpdateUserBody {
	email?: string;
	name?: string | null;
}

export const createUser = async (body: CreateUserBody): Promise<t.User> => {
	const serverInstance = getServerInstance();
	const { data } = await serverInstance.post('/', body);
	return data;
};