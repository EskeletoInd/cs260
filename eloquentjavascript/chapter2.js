function fizzbuzz() {
  for (i = 0; i <= 100; i++) {
    if (!(i % 5) && !(i % 3)) {
      console.log("FizzBuzz")
    }
    else if (!(i % 5)) {
      console.log("Buzz")
    }
    else if (!(i % 3)) {
      console.log("Fizz")
    }
    else {
      console.log(i);
    }
  }
}
