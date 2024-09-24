const a = new Date("2024-05-15");
const b = new Date("2024-02-01");
const c = new Date("18 February 2024");
function compare() {
  if (a > b) return "a";
  else return "b";
}

console.log(compare());
console.log(c);
