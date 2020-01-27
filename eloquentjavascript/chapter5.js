let arrays = [[1, 2, 3], [4, 5], [6]]
console.log(arrays.reduce((start, element) => start.concat(element), []))

function every(array, test) {
  for (i = 0; i < array.length; i++) {
    if (!(test(array[i]))) {
      return false;
    }
  }
  return true;
}

function helper_gen(test) {
  return n => (!(test(n)))
}

function every(array, test) {
  helper = helper_gen(test)
  if (!(array.some(helper))) {
    return false;
  }
  return true;
}
