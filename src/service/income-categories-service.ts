import prismaInstance from '@/connections/database/prisma.datasource';
import { RegisterIncomeCategoryBody } from '@/validation/income-category.validator';
import { RegisterSpendingCategoryBody } from '@/validation/spending-category.validator';

export async function fetchUserIncomeCategoriesService({
  userId,
}: {
  userId: string;
}) {
  const categories = await prismaInstance.spendingCategory.findMany({
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
  const account = await prismaInstance.spendingCategory.findFirst({
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
  const createdCategory = await prismaInstance.spendingCategory.create({
    data: {
      name: category.name,
      userId,
    },
  });
  return createdCategory;
}
