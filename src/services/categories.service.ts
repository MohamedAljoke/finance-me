import prisma from '@/libs/prisma';
import { RegisterIncomeCategoryBody } from '@/validation/income-category.validator';

export async function fetchUserIncomeCategoriesService({
  userId,
}: {
  userId: string;
}) {
  const categories = await prisma.incomeAndSpendingCategories.findMany({
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
  const account = await prisma.incomeAndSpendingCategories.findFirst({
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
  const createdCategory = await prisma.incomeAndSpendingCategories.create({
    data: {
      name: category.name,
      userId,
    },
  });
  return createdCategory;
}
