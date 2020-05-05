import * as request from './request';
import { arrangeMeal } from '../utils';

export async function getMeal(year: number, month: number, day?: number) {
  if (!year || year <= 0) {
    throw Error('TypeError: year is required and cannot define less then 0');
  } else if (!month || (month < 1 || month > 12)) {
    throw Error('TypeError: month is required and cannot define that is not between 1 and 12');
  } else if (day && (day < 1 || day > 32)) {
    throw Error('TypeError: day cannot define that is not between 1 and 32');
  }

  const { status, message, data: sid } = await request.getSessionId();

  if (status === 'error' || !sid) {
    return null;
  }

  const mealRow = await request.getMealRow(sid, year, month);
  
  if (!(mealRow || Array.isArray(mealRow.mthDietList))) {
    return null;
  }

  const meal = arrangeMeal(mealRow.mthDietList);

  return {
    year,
    month,
    day,
    meal,
  };
}
