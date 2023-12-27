export const makeImageUrl = (publicID: string, height: number) => {
  const urlBase = 'https://res.cloudinary.com/dbhsorjvc/image/upload';
  const url = `${urlBase}/h_${height}/${publicID}`;
  return url;
};
