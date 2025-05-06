import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs"
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserByID,
  getUsers,
  updateUser,
} from './user.services';

export async function listUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getUsers();
    
      // console.log(`Current Users: ${users}`)
      console.log("Current Users:", JSON.stringify(users, null));

    return res.status(200).json({users});
  } catch (error) {
    return next(error);
  }
}

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function getUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserByID(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function deleteUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function authenticateUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password); // if using middleware or bcrypt compare manually
    return res.status(200).json({ user, validPassword: isValid });
  } catch (error) {
    return next(error);
  }
}
