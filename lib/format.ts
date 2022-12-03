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
  const children = parent.children.map(
    (c) => {
      var date = new Date(c.birthday.seconds * 1000);
      return (`${getAgeFromBirthday(date)} ${c.gender}`)
    }
  );
  return `${parent.gender === "Male" ? "Dad" : "Mom"} of ${children.join(
    ", "
  )}`;
};
