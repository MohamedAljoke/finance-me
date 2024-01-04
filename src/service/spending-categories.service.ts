import prisma from '@/connections/database/prisma';
import { RegisterSpendingCategoryBody } from '@/validation/spending-category.validator';

export async function fetchUserSpendingCategoriesService({
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
export async function getSpendingCategoryByIdAndUserIdService(
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
export async function createSpendingCategoryService({
  userId,
  category,
}: {
  userId: string;
  category: RegisterSpendingCategoryBody['body'];
}) {
  const createdCategory = await prisma.spendingCategory.create({
    data: {
      name: category.name,
      userId,
    },
  });
  return createdCategory;
}
