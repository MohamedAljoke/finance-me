import prisma from '@/connections/database/prisma.datasource';
import { ApiDefaultError } from '@/errors/apiDefaultError';
import { UserExistsError } from '@/errors/users.error';
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
      throw new UserExistsError();
    }
    throw new ApiDefaultError();
  }
}
