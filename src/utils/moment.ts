import moment from "moment";

export const timeAgo = (date?: string) => {
  if (!date) return "";
  const ago = moment(date, "DD MMM YYYY").fromNow();
  return `(${ago})`;
};
