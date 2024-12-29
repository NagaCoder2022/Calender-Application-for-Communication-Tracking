import { addDays, isAfter, isBefore, isToday, parseISO } from 'date-fns';
import { Communication } from '../types';

export const getOverdueCommunications = (communications: Communication[]) => {
  const today = new Date();
  return communications.filter(
    (comm) => !comm.completed && isBefore(parseISO(comm.date), today) && !isToday(parseISO(comm.date))
  );
};

export const getTodayCommunications = (communications: Communication[]) => {
  return communications.filter(
    (comm) => !comm.completed && isToday(parseISO(comm.date))
  );
};

export const getUpcomingCommunications = (communications: Communication[]) => {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  return communications.filter(
    (comm) =>
      !comm.completed &&
      isAfter(parseISO(comm.date), today) &&
      isBefore(parseISO(comm.date), nextWeek)
  );
};