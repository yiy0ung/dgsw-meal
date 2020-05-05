import dgswMeal from '../dist';

async function example() {
  console.log("example");
  const result = await dgswMeal.getMeal(2020, 5);
  console.log(result);
}

example();