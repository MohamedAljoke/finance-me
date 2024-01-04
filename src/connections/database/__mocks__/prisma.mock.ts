import { PrismaClient } from '@prisma/client';
import { beforeEach, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset(prismaMock);
});
const prismaMock = mockDeep<PrismaClient>();
export default prismaMock;
