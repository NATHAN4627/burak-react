export {};

// Z Task

function sumEvens(arr: number[]): number {
  return arr.reduce((sum: number, num: number): number => {
    return num % 2 === 0 ? sum + num : sum;
  }, 0);
}

console.log(sumEvens([1, 2, 3])); 
console.log(sumEvens([1, 2, 3, 4, 5, 6]));

// Y Task

// function findIntersection(arr1: any[], arr2: any[]): any[] {
//   const result = arr1.filter((arr) => arr2.includes(arr));

//   return Array.from(new Set(result));
// }

// console.log(findIntersection([1, 2, 3], [2, 3, 4]));

// X Task

// function countOccurrences(obj: Record<string, any>, str: string): number {
//   let count = 0;

//   for (let key in obj) {
//     if (key === str) {
//       count++;
//     }

//     if (obj[key] && typeof obj[key] === "object") {
//       count += countOccurrences(obj[key], str);
//     }
//   }
//   return count;
// }

// console.log(
//   countOccurrences(
//     { model: "Ferrari", steer: { model: "SSM780", price: 250000 } },
//     "model"
//   )
// );
