export const errorNormilizer = (err) => {
  const error = new Error();
  console.log('errorNormilizer', err)

  return Object.assign(error, {message: err.message, name: err.name})
  // return { ...error, message: err.message, name: err.name };
};
