// npsb

//n=number ,p=primitives ,s=strings,b=booleans

{
    let number1: number = 63
    console.log(number1)
    const name1: string = "Rahul Rudra"
    console.log(name1)
    const userName: { name: string, age: number }
        = { name: "Rahul", age: 2233 }
    console.log(userName)

    // function add2(num1: number, num2: number): number {
    //     const sum: number = num1 + name1

    //     return sum

    // }
    // const red: number = add2(23, 32)

    function add2(num1: number, num2: number): number {
        const sum: number = num1 + num2
        return sum
    }

    const red: number = add2(23, 32)
    console.log(red)

    function friends(...friends1: string[]) {
        console.log(friends1)

    }
    friends("Abul", "kabul")

    //destructuring
    //union and destructuring  types ad itersection types
    //nullish coalesing operator,optional channing and ternary operator

}