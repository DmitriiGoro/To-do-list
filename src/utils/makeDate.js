const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const makeDate = (date) => {
  const newDate = new Date(date);

  const obj = {
    day: newDate.getDate(),
    month: newDate.getMonth(),
    year: newDate.getFullYear(),
    hours: newDate.getHours(),
    minutes: newDate.getMinutes(),
  };

  return `${obj.hours}:${obj.minutes} ${obj.day}-${months[obj.month]}-${
    obj.year
  }`;
};
