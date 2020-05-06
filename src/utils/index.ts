import { MthDiet, MealObj, ArrangeMeal } from "../types";

export function checkNum(val: any) {
  return (typeof val === 'number');
}

export function fullZero(num: number|string, zeroNum: number) {
  let numStr = '' + num;

  for (let i = numStr.length; i < zeroNum; i++) {
    numStr = '0' + numStr;
  }

  return numStr;
}

function parseMeal(mealRow: string|null): MealObj|null {
  if (!mealRow) {
    return null;
  }

  const match = mealRow.match(/\d{1,2}/g);

  if (!match) {
    return null;
  }

  const meal = {
    date: match[0],
    menu: mealRow.slice(2).replace(/<br \/>/gi, '\n').slice(1),
  };

  return meal;
}

export function arrangeMeal(weeklyMealList: MthDiet[]) {
  const mealList: (MealObj|null)[] = [];
  let result: ArrangeMeal = {};

  for (const mealData of weeklyMealList) {
    mealList.push(parseMeal(mealData.sun));
    mealList.push(parseMeal(mealData.mon));
    mealList.push(parseMeal(mealData.tue));
    mealList.push(parseMeal(mealData.wed));
    mealList.push(parseMeal(mealData.the));
    mealList.push(parseMeal(mealData.fri));
    mealList.push(parseMeal(mealData.sat));
  }

  for (const meal of mealList) {
    if (meal) {
      result[meal.date] = meal.menu;
    }
  }

  return result;
}
