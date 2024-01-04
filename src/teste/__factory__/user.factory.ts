import { Prisma, User } from '@prisma/client';

export function userFactory(user: Partial<User>): User {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...user,
  };
}
