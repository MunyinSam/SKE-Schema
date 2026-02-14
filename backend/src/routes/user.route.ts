import { Router } from 'express';
import {
	createUserController,
	updateUserController,
	deleteUserController,
	getUserByIdController,
	getUserByEmailController,
	getAllUsersController,
} from '../controllers/user.controller';

const router = Router();

// POST /api/v1/users - Create a new user
router.post('/', createUserController);

// GET /api/v1/users - Get all users
router.get('/', getAllUsersController);

// GET /api/v1/users/email?email=xxx - Get user by email
router.get('/email', getUserByEmailController);

// GET /api/v1/users/:id - Get user by ID
router.get('/:id', getUserByIdController);

// PATCH /api/v1/users/:id - Update user
router.patch('/:id', updateUserController);

// DELETE /api/v1/users/:id - Delete user
router.delete('/:id', deleteUserController);

export default router;
