/* eslint-disable @typescript-eslint/no-explicit-any */
const calculator = (calc: any) => {
  const dynamicCalulcator = (a: number, b: number) => {
    const value = calc(a, b);
    console.log(value);
  };
  return dynamicCalulcator;
};

const myCalculator = calculator((a: number, b: number) => a % b); // dynamicCalulcator

console.log(myCalculator(1, 2));



// const calculatorHof = (a: number, b: number) => {
//   return a + b
// }



const calculator1 = (calFunction: any) => {

  const dynamicCalcFunction = (a: number, b: number) => {
    const value = calFunction(a, b)
  }

  return dynamicCalcFunction
}

const output1 = calculator1((a: number, b: number) => { a + b })