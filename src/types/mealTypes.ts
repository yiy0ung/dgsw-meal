
export type MthDiet = {
  weekGb: string|null;
  sun: string|null;
  mon: string|null;
  tue: string|null;
  wed: string|null;
  the: string|null;
  fri: string|null;
  sat: string|null;
};

export type MealObj = {
  date: string;
  menu: string;
};

export type MealResult = {
  year: number,
  month: number,
  currentDay: number,
  meal: ArrangeMeal,
  today: any,
}

export type ArrangeMeal = {
  [key: string]: any,
};

