/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";
  n = $("#num").val()

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i, inserted, sequence = [];
  for (i = 2; n != 1;){
    inserted = false;
    if(isPrime(i)){
      if(n % i === 0){
        inserted = true;
        n /= i;
        console.log(i);
        sequence.push(i);
      }
    }
    if(!inserted){
      i++;
    }
  }
  $("#pf").text(sequence.join(", "));
  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime

  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
//console.log(getPrimeFactors(30030));