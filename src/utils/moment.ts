import moment from "moment";

export const timeAgo = (date?: string) => {
  if (!date || date === "N/A") return "";
  const ago = moment(date, "DD MMM YYYY").fromNow();
  return `(${ago})`;
};
