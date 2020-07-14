
import * as mealService from './modules/service/meal';
import * as Validate from './libs/validate';
import { MealResult, MealOptions } from '../types';

export async function getMeal(options: MealOptions) {
  const [validationError, value] = Validate.checkOptions(options);
  if (validationError) {
    throw new Error(validationError.message);
  }

  const { year, month } = value;
  const meal = await mealService.findMealData({
    year, 
    month
  });
  
  const todayDate = new Date().getDate();

  return {
    year,
    month,
    currentDay: todayDate,
    meal,
    today: meal[String(todayDate)],
  } as MealResult;
}
