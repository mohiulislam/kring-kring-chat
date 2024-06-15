import { differenceInDays, format, isToday, isYesterday } from "date-fns";

export function getDeliveryTime(isoDate: Date) {
  if (isToday(isoDate)) {
    return format(isoDate, "'Today' HH:mm ");
  } else if (isYesterday(isoDate)) {
    return format(isoDate, "'Yesterday' HH:mm ");
  } else {
    const daysDiff = differenceInDays(new Date(), isoDate);
    if (daysDiff <= 7) {
      return format(isoDate, "EEE 'at' HH:mm");
    } else {
      return format(isoDate, "HH:mm:ss 'at' yy-MM-dd");
    }
  }
}
