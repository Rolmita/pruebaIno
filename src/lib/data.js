import { prisma } from '@/lib/prisma'

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  return user
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  return user
}