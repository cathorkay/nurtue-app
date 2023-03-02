import dayjs from "dayjs";

import { Parent } from "../types/state";

export const getAgeFromBirthday = (birthday: Date | string) => {
  const months = dayjs().diff(birthday, "month");
  if (months === 0) {
    return `newborn`;
  } else if (months <= 11) {
    return `${months} mo old`;
  } else {
    return `${dayjs().diff(birthday, "year")} y/o old`;
  }
};

export const getChildrenDescription = (parent: Parent) => {
  let children = '';
  if(parent.children){
    var date = new Date(parent.children[0].birthday.seconds * 1000);
    children = `${getAgeFromBirthday(date)} ${parent.children[0].gender}`;
  }

  return `${parent.gender === "Male" ? "Dad" : "Mom"} of ${children}`;
};
