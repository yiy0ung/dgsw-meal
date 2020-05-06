import * as request from './request';
import { arrangeMeal, checkNum } from '../utils';

export async function getMeal(year: number, month: number) {
  if (!(checkNum(year) && checkNum(month))) {
    throw Error('TypeError: parameter is only allowed number type');
  } else if (!year || year <= 0) {
    throw Error('TypeError: year is required and cannot define less then 0');
  } else if (!month || (month < 1 || month > 12)) {
    throw Error('TypeError: month is required and cannot define that is not between 1 and 12');
  }

  const numYear = Math.floor(year);
  const numMonth = Math.floor(month);
  const { status, data: sid } = await request.getSessionId();

  if (status === 'error' || !sid) {
    return null;
  }

  const mealRow = await request.getMealRow(sid, numYear, numMonth);
  
  if (!(mealRow || Array.isArray(mealRow.mthDietList))) {
    return null;
  }

  const meal = arrangeMeal(mealRow.mthDietList);
  const todayDate = new Date().getDate();

  return {
    year: numYear,
    month: numMonth,
    day: todayDate,
    meal,
    today: meal['' + todayDate],
  };
}
