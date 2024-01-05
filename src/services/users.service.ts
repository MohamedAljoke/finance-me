import { RegisterUserBody } from '@/validation/users.validator';
import { ApiDefaultError, DataConflictError } from '../errors/apiDefaultError';
import prisma from '../libs/prisma';
import { Prisma } from '@prisma/client';
import { hashElement } from '@/utils/hash-element';

export async function createUser(
  user: Omit<RegisterUserBody['body'], 'confirmPassword'>
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

export async function findUserByEmail({
  email,
  include,
}: {
  email: string;
  include?: Prisma.UserInclude;
}) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include,
  });
  return user;
}
