import { PrismaClient, User } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function createUser(data: Omit<User, 'id'>) {
  return prisma.user.create({ data });
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
