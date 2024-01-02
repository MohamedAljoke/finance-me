import prismaInstance from '@/connections/database/prisma.datasource';
import { ApiDefaultError, DataConflictError } from '@/errors/apiDefaultError';
import { hashElement } from '@/utils/hash-element';
import { RegisterUserBody } from '@/validation/users.validator';
import { Prisma } from '@prisma/client';

export async function createUser(
  user: Omit<RegisterUserBody['body'], 'comparePassword'>
) {
  const hashedPassword = await hashElement(user.password);
  try {
    const newUser = await prismaInstance.user.create({
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
  const user = await prismaInstance.user.findUnique({
    where: {
      email,
    },
    include,
  });
  return user;
}
