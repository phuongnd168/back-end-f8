import _ from "lodash";
const users = [
  { id: "name1", age: 40, height: 1 },
  { id: "name2", age: 39, height: 2 },
  { id: "name3", age: 38, height: 2 },
  { id: "name4", age: 40, height: 2 },
];

const result = _.groupBy(users, "age");
console.log(result);
