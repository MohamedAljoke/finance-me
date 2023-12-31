import bcrypt from 'bcrypt';

export const hashElement = async (
  element: string,
  saltWorkFactor: number = 10
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltWorkFactor);
  return bcrypt.hash(element, salt);
};
