

const friendsStringArray: string[] = ["A"]
console.log(friendsStringArray)
const coOrdinatesTuple: (string | number)[] = [1, "sdgs", 8]
console.log(coOrdinatesTuple)

// const newArray: Array<string>
const number = (num1: number, num2: number): number => {

    return num1 + num2
}


const user = {
    name: "Rahul",
    addBalance(balance: number): number {
        return balance
    }
}


// const numberDouble: Array<number> = [1, 2, 3]

// const newArray2 = numberDouble.map((numberSingle: number => {

// }))

// In TypeScript, when typing a parameter in an arrow function, you must wrap it in parentheses.


const numberDouble: Array<number> = [1, 2, 3]

const newArray2 = numberDouble.map(
    (numberSingle: number) => {
        return numberSingle * 2
    }
)

const newArray3 = numberDouble.map(
    () => { }
)