export const generateRandomCode = () => {
  const codelength = 5;
  return (
    Math.floor(Math.random() * (Math.pow(10, codelength - 1) * 9)) +
    Math.pow(10, codelength - 1)
  );
};
