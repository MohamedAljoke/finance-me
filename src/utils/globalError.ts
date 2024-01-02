export const treatGlobalError = (req, res) => {
  console.error(`${filename} > registerUser > error:`, error);
  if (
    error.statusCode &&
    error.statusCode !== StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    return res
      .status(error.statusCode)
      .json({ error: true, message: error.message });
  }
  throw new ApiDefaultError();
};
