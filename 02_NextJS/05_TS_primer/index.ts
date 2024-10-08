import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/1";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios
  .get(url)
  .then((response) => {
    const todo = response.data as Todo;

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);
  })
  .catch((err: unknown) => console.log("err:", err));

const logTodo = (id: number, title: string, completed: boolean): void => {
  console.log(`
    The Todo with ID: ${id}
    Has a title of: ${title}
    Is it finished? ${completed}
  `);
};

//* -------
const logNumber: (i: number) => void = (i: number): void => {
  console.log(i);
};
logNumber(1);

//* -------
const json = '{"x":10, "y":20}';
const coords: { x: number; y: number } = JSON.parse(json);
console.log("coords:", coords);

//* -------
const words = ["red", "green", "blue"];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === "green") {
    foundWord = true;
    console.log({ foundWord });
  }
}

//* -------
const todaysWeather = {
  date: new Date(),
  weather: "sunny",
};

const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
  return undefined;
};
const logWeather2 = ({ date, weather }: { date: Date; weather: string }): void => {
  console.log(date);
  console.log(weather);
  return undefined;
};

logWeather(todaysWeather);
logWeather2(todaysWeather);

//* -------
// const throwError = (message: string): never => {
//   throw new Error(message);
// };

// throwError("testError");

//* -------
const profile = {
  name: "alex",
  age: 20,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

const { age, name }: { age: number; name: string } = profile;
console.log({ age, name });

const {
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;
console.log({ lat, lng });

//* Flexible types
const importantDates: (Date | string)[] = [];
importantDates.push("2030-10-10");
importantDates.push(new Date());
console.log("importantDates:", importantDates);

//* Tuples - fix order! (better objects)
// const drink = {
//   color: "brown",
//   carbonated: true,
//   sugar: 40,
// };

type Drink = [string, boolean, number];

const pepsi: Drink = ["brown", true, 40];
const sprite: Drink = ["clear", true, 40];
const tea: Drink = ["brown", false, 0];
console.log({ pepsi, sprite, tea });

// const carSpecs: [number, number] = [400, 3354];
// console.log({ carSpecs });

// const carStats = {
//   horsepower: 400,
//   weight: 3354,
// };
// console.log({ carStats });
