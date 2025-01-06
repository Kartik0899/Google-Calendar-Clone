import dayjs from "dayjs";

export const getMonth = (month = dayjs().month()) => {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day(); // 0-6
  let currentMonthCount = 0 - firstDayOfMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
};

export const getWeek = (date = dayjs()) => {
  const startOfWeek = date.startOf("week"); // Start from Sunday of the current week
  let weekDays = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(startOfWeek.add(i, "day"));
  }

  return weekDays;
};
