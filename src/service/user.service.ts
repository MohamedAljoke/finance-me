import prisma from '@/connections/database/prisma.datasource';
import { ApiDefaultError, DataConflictError } from '@/errors/apiDefaultError';
import { hashElement } from '@/utils/hash-element';
import { RegisterUserBody } from '@/validation/users.validator';

export async function createUser(
  user: Omit<RegisterUserBody['body'], 'comparePassword'>
) {
  const hashedPassword = await hashElement(user.password);
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      throw new DataConflictError('User already exists');
    }
    throw new ApiDefaultError();
  }
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
