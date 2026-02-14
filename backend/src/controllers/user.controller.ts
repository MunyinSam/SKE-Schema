import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
	createUser,
	updateUser,
	deleteUser,
	getUserById,
	getUserByEmail,
	getAllUsers,
} from '../models/user.model';

const userIdSchema = z.object({ id: z.string() });
const userCreateSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string().nullable().optional(),
});
const userUpdateSchema = z.object({
	email: z.string().email().optional(),
	name: z.string().nullable().optional(),
});

export const createUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id, email, name } = userCreateSchema.parse(req.body);
		const created = await createUser(id, email, name ?? null);
		return res.status(201).json(created);
	} catch (err) {
		if (err instanceof z.ZodError) {
			return res.status(400).json({ message: 'Invalid user data' });
		}
		next(err);
	}
};

export const updateUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = userIdSchema.parse(req.params);
		const parsed = userUpdateSchema.parse(req.body);

		// Get existing user to merge with updates
		const existing = await getUserById(id);
		if (!existing) {
			return res.status(404).json({ message: 'User not found' });
		}

		const email = parsed.email ?? existing.email;
		const name = parsed.name !== undefined ? parsed.name : existing.name;

		const updated = await updateUser(id, email, name);
		if (!updated) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json(updated);
	} catch (err) {
		if (err instanceof z.ZodError) {
			return res.status(400).json({ message: 'Invalid user data' });
		}
		next(err);
	}
};

export const deleteUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = userIdSchema.parse(req.params);
		const deleted = await deleteUser(id);
		if (!deleted) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json(deleted);
	} catch (err) {
		if (err instanceof z.ZodError) {
			return res.status(400).json({ message: 'Invalid user id' });
		}
		next(err);
	}
};

export const getUserByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = userIdSchema.parse(req.params);
		const user = await getUserById(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (err) {
		if (err instanceof z.ZodError) {
			return res.status(400).json({ message: 'Invalid user id' });
		}
		next(err);
	}
};

export const getUserByEmailController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const email = req.query.email as string;
		if (!email) {
			return res.status(400).json({ message: 'email is required' });
		}
		const user = await getUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

export const getAllUsersController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await getAllUsers();
		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
