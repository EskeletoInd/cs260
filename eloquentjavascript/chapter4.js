function range(start, stop, step = 1) {
 to_return = [];
 if (step > 0) {
   for (i = start; i <= stop; i += step) {
    to_return.push(i);
   }
 }
 else {
  for (i = start; i >= stop; i += step) {
    to_return.push(i);
   }
 }
 return to_return;
}

function sum(arr) {
 to_return = 0;
 for (i = 0; i < arr.length; i++) {
   to_return += arr[i];
 }
  return to_return;
}

function arrayToList(arr) {
 if (arr.length == 0) {
  return null;
 }
 else {
   first_val = arr[0]
   arr.shift();
  return {value: first_val, rest: arrayToList(arr)};
 }
}

function listToArray(lst) {
 if (lst == null) {
  return [];
 }
 else {
   var something = lst.value;
   arr = listToArray(lst.rest)
   arr.unshift(something)
   return arr
 }
}

function prepend(value, lst) {
  return {value: value, rest: lst}
}

function nth(lst, element) {
  if (element == 0) {
    return lst.value;
  }
  else if (element > 0) {
    return nth(lst.rest, element-1);
  }
}
