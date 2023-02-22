const dateString = (dateObj: Date) => {
  const parts = dateObj.toDateString().split(' ');
  const month = parts[1];
  const date = parts[2];
  return `${month} ${date}`;
};

export default dateString;
