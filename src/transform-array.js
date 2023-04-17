const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  const control = ['--discard-next', '--discard-prev', '--double-prev', '--double-next'];
  if (!(Array.isArray(arr))) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  } else {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (control.indexOf(arr[i]) == -1) {
          newArr.push(arr[i]);
        }
        if (arr[i] === '--double-next') {
          if((control.indexOf(arr[i+1]) === -1) && ((i+1) <= arr.length-1)) {
            newArr.push(arr[i+1]);
          } else {continue}
        }
        if (arr[i] === '--discard-next') {
          if((control.indexOf(arr[i+1]) === -1) && ((i+1) <= arr.length-1)) {
            arr.splice(i+1, 1);
          } else {continue}
        }
        if (arr[i] === '--discard-prev') {
          if((control.indexOf(arr[i-1]) === -1) && ((i-1) >= 0)) {
            newArr.splice(i-1, i);
          } else {continue}
        }
        if (arr[i] === '--double-prev') {
          if((control.indexOf(arr[i-1]) === -1) && ((i-1) >= 0)) {
            newArr.push(arr[i-1]);
          } else {continue}
        }
      }
    return newArr;
    }
}

module.exports = {
  transform
};
