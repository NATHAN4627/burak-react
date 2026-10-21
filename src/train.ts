export {};

// X Task

function countOccurrences(obj: Record<string, any>, str: string): number {
  let count = 0;

  for (let key in obj) {
    if (key === str) {
      count++;
    }

    if (obj[key] && typeof obj[key] === "object") {
      count += countOccurrences(obj[key], str);
    }
  }
  return count;
}

console.log(
  countOccurrences(
    { model: "Ferrari", steer: { model: "SSM780", price: 250000 } },
    "model"
  )
);
