import { PrismaClient, User } from "../../generated/prisma";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImageUrl: string;
}

export const createUser = async (userData: CreateUserInput) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword
        },
    });
    const { password, ...SafeUser } = user
    return SafeUser;
}
export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUserByID(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function updateUser(id: string, data: Partial<User>) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}
