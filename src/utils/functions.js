import moment from "moment/moment";

export const formatDateWithMoment = (inputDate) => {
  const formattedDay = moment(inputDate).format("dddd");
  const formattedDate = moment(inputDate).format("MMMM DD");
  // return formattedDate;
  return { formattedDay, formattedDate };
};
