import * as repository from '../repository';
import { arrangeMeal } from '../../libs/meal';

type Params = {
  year: number;
  month: number;
};

export async function findMealData({ year, month }: Params) {
  const [sessionError, sid] = await repository.getSessionId();
  if (sessionError || !sid) {
    throw new Error(sessionError?.message || 'Not found session Id');
  }

  const { error, mealRow } = await repository.getMealRow(sid, year, month);
  if (error || !mealRow) {
    throw new Error();
  }

  const meal = arrangeMeal(mealRow.mthDietList);

  return meal;
}
