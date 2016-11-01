var cluster = require('cluster');
// Use this if you want to use all the threads (this is recommended if you want to test the 'score' of a computer)
var numWorkers = require('os').cpus().length;
// Use this if you want to use a fixed amount of threads
// var numWorkers = 8;
var app = require('express')();

if (cluster.isMaster) {
  console.log('Master cluster setting up ' + numWorkers + ' worker(s)...');
  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  app.all('/*', function (req, res) { res.send('process ' + process.pid + ' says ' + calculatePrimes(50, 1000000000)).end(); });

  app.listen(8000, function () {
    console.log('Process ' + process.pid + ' is listening to all incoming requests');
  });
}

function calculatePrimes (iterations, multiplier) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
         // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}
