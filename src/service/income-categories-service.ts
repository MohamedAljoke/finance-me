import prisma from '@/connections/database/prisma';
import { RegisterIncomeCategoryBody } from '@/validation/income-category.validator';

export async function fetchUserIncomeCategoriesService({
  userId,
}: {
  userId: string;
}) {
  const categories = await prisma.spendingCategory.findMany({
    where: {
      userId: userId,
    },
  });
  return categories;
}
export async function getIncomeCategoryByIdAndUserIdService(
  accountId: string,
  userId: string
) {
  const account = await prisma.spendingCategory.findFirst({
    where: {
      id: accountId,
      userId: userId,
    },
    include: {
      user: true,
    },
  });
  return account;
}
export async function createIncomeCategoryService({
  userId,
  category,
}: {
  userId: string;
  category: RegisterIncomeCategoryBody['body'];
}) {
  const createdCategory = await prisma.spendingCategory.create({
    data: {
      name: category.name,
      userId,
    },
  });
  return createdCategory;
}
