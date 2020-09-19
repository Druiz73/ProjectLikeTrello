export const getIndex = (array = [], id) => {
  const index = array.findIndex(i => i._id === id);
  return index;
}