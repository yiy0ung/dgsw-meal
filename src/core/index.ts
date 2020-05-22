import * as request from './request';
import { arrangeMeal, checkNum } from './utils';
import { Options, MealResult } from '../types';

export async function getMeal(
  year: number, 
  month: number, 
  options?: Options<{}>,
) {
  if (!(checkNum(year) && checkNum(month))) {
    throw Error('TypeError: parameter is only allowed number(integer) type');
  } else if (!year || year <= 0) {
    throw Error('TypeError: year is required and cannot define less then 0');
  } else if (!month || (month < 1 || month > 12)) {
    throw Error('TypeError: month is required and cannot define that is not between 1 and 12');
  }

  const numYear = Math.floor(year);
  const numMonth = Math.floor(month);

  const axios = request.generateEndpoint(options?.cors);
  const { status, data: sid } = await request.getSessionId(axios);

  if (status === 'error' || !sid) {
    return null;
  }

  const mealRow = await request.getMealRow(axios, {
    jsessionId: sid,
    year: numYear, 
    month: numMonth,
  });
  
  if (!(mealRow || Array.isArray(mealRow.mthDietList))) {
    return null;
  }

  const meal = arrangeMeal(mealRow.mthDietList);
  const todayDate = new Date().getDate();

  return {
    year: numYear,
    month: numMonth,
    currentDay: todayDate,
    meal,
    today: meal['' + todayDate],
  } as MealResult;
}
