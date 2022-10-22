'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
// const account5 = {
//   owner: 'Codreanu Vasile',
//   movements: [1000, -500, -200, 600, -300],
//   interestRate: 1.2,
//   pin: 1967,
// };

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€ `;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(i => i[0])
      .join('');
  });
};
createUsernames(accounts);
const updateUI = function (acc) {
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};
// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin = document.querySelector('.login__input--pin');

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Display movements
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  )
    //Doing the transfer
    currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);
  updateUI(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //Delet account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
/////////////////////////////////////////////////
//SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//SPLICE

// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
const letter = arr.concat(arr2);
console.log(letter);
console.log([...arr, ...arr2]);

//JOIN

console.log(letter.join(' - '));


const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));
// getting last array elements
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(-1));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withrew ${Math.abs(movement)}`);
  }
}
console.log(' \n ----- FOREACH ------ \n ');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(-400)
//.....

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
  // console.log(map);
});
//SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value} : ${value}`);
});


//TEST DATA 1
// Julia's data [3,5,2,12,7]; Kate's data [4,1,15,8,3]
//TEST DATA 2
// Julia's data [9,16,6,8,3]; Kate's data [10,5,6,1,4]
let julia1 = [3, 5, 2, 12, 7];
let julia2 = [9, 16, 6, 8, 3];
let kate1 = [4, 1, 15, 8, 3];
let kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const juDogs = dogsJulia.slice();
  console.log(dogsJulia, juDogs);
  juDogs.splice(0, 1);
  juDogs.splice(-2);
  // console.log(juDogs);
  const allDogs = [...juDogs, ...dogsKate];
  console.log(allDogs);
  allDogs.forEach(function (d, i) {
    if (d >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${d} years old `);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checkDogs(julia1, kate1);
///////////////////////////////
//MAP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => (mov * eurToUsd).toFixed(0));
console.log(movements);
console.log(movementsUSD);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

///////////////////////////
// FILTER
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//////////////////////////
//REDUCE
//accumulator ->SNOWBALL
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration number ${i}: ${acc}`);
//   return acc + cur;
// }, 100);

console.log(movements);
const balance = movements.reduce((acc, cur) => acc + cur, 100);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//MAXIMUM VALUE OF MOVEMENTS ARRAY

const max = movements.reduce((acc, mov) => {
  console.log(acc, mov);
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

/////////////////////
//#Coding challenge #2

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(d => (d <= 2 ? 2 * d : 16 + d * 4));
  const dogsBig = humanAge.filter(d => d >= 18);
  console.log(humanAge);
  console.log(dogsBig);
  // const average =
  //   dogsBig.reduce(function (acc, a) {
  //     return acc + a;
  //   }, 0) / dogsBig.length;
  // return average;
  const average = dogsBig.reduce((acc, a, i, arr) => acc + a / arr.length, 0);
  return average;
};
//TEST DATA1 [5,2,4,1,15,8,3]
//TEST DATA2 [16,6,10,5,6,1,4]
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

const eurToUsd = 1.1;
console.log(movements);
//PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

/////////////////////
//Coding CHllenge #3
const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(d => (d <= 2 ? 2 * d : 16 + d * 4))
    .filter(d => d >= 18)
    .reduce((acc, a, i, arr) => acc + a / arr.length, 0);
  console.log(humanAge);
  return humanAge;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);


///////////////////
//FIND
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

for (const i of accounts) {
  if (i.owner === 'Jessica Davis') console.log(i);
}


console.log(movements);
//EQUALITY
console.log(movements.includes(-130));
//SOME : CONDITION
console.log(movements.some(mov => mov === -130));
const any = movements.some(mov => mov > 1500);
console.log(any);
//EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//SEPARATE cALLBACK

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrD = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrD.flat(2));

//flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

//flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);

// STRINGS
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);
//NUMBERS

console.log(movements);
//return <0 A<B
//return >0 B<A

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
//Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
//EMPTY ARRAYS + FILL
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1);
x.fill(1, 3, 4);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

//ARRAY>FROM
const ab = Array.from({ length: 7 }, () => 1);
console.log(ab);
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
{
  const ranom = Array.from({ length: 100 }, (_, i) =>
    (Math.random() * 5 + 1).toFixed(0)
  );
  console.log(ranom);
}

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});

//1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);
//2
// const atLeast = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(atLeast);
const atLeast = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(atLeast);
//3
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {}, { deposits: 0, withdrawals: 0 });
*/
//////////////////////////
//Challenge #4
const dogs = [
  {
    weight: 22,
    curFood: 250,
    owners: ['Alice', 'Bob'],
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matilda'],
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'John'],
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michael'],
  },
];
//1
dogs.forEach(i => (i.recomendedFood = Math.trunc(i.weight ** 0.75 * 28)));
console.log(dogs);
//2
const dogSarah = dogs.find(d => d.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.recomendedFood > dogSarah.curFood ? 'little' : 'much'
  }`
);
//3
const ownersEatTooMuch = dogs
  .filter(o => o.recomendedFood < o.curFood)
  .flatMap(o => o.owners);
const ownersEatTooLittle = dogs
  .filter(o => o.recomendedFood > o.curFood)
  .flatMap(o => o.owners);
console.log(ownersEatTooLittle);
//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);
//5
console.log(dogs.some(o => o.recomendedFood == o.curFood));
//6
console.log(
  dogs.some(
    o =>
      o.curFood > o.recomendedFood * 0.9 && o.curFood < o.recomendedFood * 1.1
  )
);
//7
const checkEating = o =>
  o.curFood > o.recomendedFood * 0.9 && o.curFood < o.recomendedFood * 1.1;
// console.log(dogs.some(checkEating));
console.log(dogs.filter(checkEating));
//8
const dogs1 = dogs.slice().sort((a, b) => a.recomendedFood - b.recomendedFood);
console.log(dogs1);
