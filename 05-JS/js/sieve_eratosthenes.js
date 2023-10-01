/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function (n) {
  "use strict";

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.

  n = $("#num").val();
  const limit = Math.ceil(Math.sqrt(n));
  var criba = [], i;

  for(i = 0; i <= n; i++){
    criba.push(true);
  }
  criba[0] = false;
  criba[1] = false;

  for (let p = 2; p <= limit; p++) {
    if (criba[p]) {
      for (let i = p + p; i <= n; i += p) {
        criba[i] = false;
      }
    }
  }

  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (criba[i]) {
      primes.push(i);
    }
  }
  $("#primes").text(primes.join(", "));
  return primes;
};

$("#btn").on("click", sieve);

//console.log(sieve(1000000));
