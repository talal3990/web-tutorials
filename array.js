// function addNumberToArray(arr, num) {
//     arr.push(num);
//     console.log(arr);
//     return arr;
// }

// // Example usage:
// let array = [1, 2, 3];
// let number = 4;

// addNumberToArray(array, number);


// function removeLast(arr) {
//   arr.pop();
//   return arr;
// }

// let nums = [1, 2, 3, 4];
// console.log(removeLast(nums));

// function getFirst(arr) {
//   return arr[0];
// }

// console.log(getFirst([1, 2, 3])); // Output: 1

// function findIndex(arr, value) {
//   return arr.indexOf(value);
// }

// // Example usage:
// let numbers = [10, 20, 30, 40];
// console.log(findIndex(numbers, 30)); // Output: 2
// console.log(findIndex(numbers, 50)); // Output: -1

function getArrayLength(arr) {
  let count = 0;
  for (let i in arr) {
    count++;
  }
  return count;
}

console.log(getArrayLength([1, 2, 3, 4])); // Output: 4

