export const numberWithSpaces = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}