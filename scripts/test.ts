// import { range, shuffle } from 'radash';

// class Game {
//   #boxes;
//   #maxTry = 50;

//   constructor() {
//     this.#boxes = this.#createRoom();
//   }

//   #createRoom() {
//     const boxes = range(0, 99);
//     return shuffle(Array.from(boxes));
//   }

//   #choiceBox(choiceNumber) {
//     return this.#boxes[choiceNumber]
//   }

//   #joinRoom(myNumber, choiceNumberGenerator) {
//     let openNumber = null;

//     for (let i = 0; i < this.#maxTry; i++) {
//       const choiceNumber = choiceNumberGenerator.next(openNumber).value;
//       // console.log('choiceNumber:', choiceNumber);

//       openNumber = this.#choiceBox(choiceNumber);
//       // console.log('openNumber:', openNumber)

//       if (openNumber === myNumber) {
//         return true;
//       }
//     }

//     return false;
//   }

//   test(choiceNumberGenerator) {
//     const boxes = this.#boxes;
//     for (const myNumber of range(0, 99)) {
//       const isSuccess = this.#joinRoom(myNumber, choiceNumberGenerator(myNumber));
//       if (isSuccess === false) {
//         return false;
//       }
//     }
  
//     return true;
//   }
// }

// function* choiceNumberGenerator(myNumber) {
//   // console.log('MyNumber:', myNumber)
//   const randomIndexes = shuffle(Array.from(range(0, 99)));

//   for (const selectIndex of randomIndexes) {
//     yield selectIndex;
//   }
// }

// const tryCount = 100_000_000;
// let successCount = 0;
// let failedCount = 0;
// for (let i = 0; i < tryCount; i++) {
//   const game = new Game();
//   if (game.test(choiceNumberGenerator)) {
//     successCount++;
//   } else {
//     failedCount++;
//   }
//   process.stdout.clearLine();
//   process.stdout.cursorTo(0);
//   process.stdout.write(`Try: ${i+1}, Success: ${successCount}, Failed: ${failedCount}`);
// }

// console.log();