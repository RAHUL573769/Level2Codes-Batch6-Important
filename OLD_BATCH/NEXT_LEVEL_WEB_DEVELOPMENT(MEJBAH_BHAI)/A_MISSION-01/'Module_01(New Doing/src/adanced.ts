{
    let string1: string = "Hello"
    console.log(string1)

    const kgToGram = (value: string | number) => {
        const numValue = typeof value === 'string' ? parseInt(value) : value;
        return numValue * 1000;
    }

    const result1 = kgToGram(100) as number
    console.log(result1)

    interface User2 {
        name: string
        age: number
    }

    type User1 = {
        name: string
        age: number
    }
    type UserWithRole = User1 & { role: string }

    const roleUser: UserWithRole = {
        name: "",
        role: "",
        age: 35
    }
    interface interfaceArray {
        [index: number]: number
    }

    const arrayWithInterface: interfaceArray = [1, 2, 3, 45, 6]
    console.log(arrayWithInterface)
    const stringArray: Array<string> = ["35", "eded"]
}


type Generic<T> = Array<T>


const arrayWithGeneric: Generic<string> = ["fgesg"]
console.log(arrayWithGeneric)

// const userWithGenericObject: Generic<object> = [{

// }]

const userWithGenericObject: Generic<{ name: string, age: number }> = [{
    name: "",
    age: 23
}]
console.log(userWithGenericObject)


//geeric tuple
type GenericTuple<A, B> = [A, B]

const manushTuple: GenericTuple<string, string> = ["A", "b"]
console.log(manushTuple)
//generic with interface

interface User {
    name: string
    age: number
}

const developer1: User = {
    name: "",
    age: 2
}
console.log(developer1)

interface Developer2<T, Y> {
    name: string
    computer: {
        name: string
    }
    smartWatch: T
    ipad?: Y
}
// const poorDeveloper: Developer2 = {

// }

interface SmartWatch {
    brand: string
    model: string
}

interface Ipad {
    brand: string
    model: string
}

const poorDeveloper: Developer2<SmartWatch, Ipad> = {
    name: "John",
    computer: {
        name: "Dell"
    },
    smartWatch: {
        brand: "Apple",
        model: "Series 8"
    },
    ipad: {
        brand: "Apple",
        model: "iPad Air"
    }
}
//generic + interface

//generic + function
// 1️⃣ Basic Generic Function
function identity(value: any): any {
    return value
}
function identity1<T>(value: T): T {
    return value
}
identity1<string>("Hello")
identity1<number>(100)

// 2️⃣ Multiple Generic Parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second]
}
pair<string, number>("Age", 25)
pair("Name", true) // inferred automatically

// 3️⃣ Generic Function with Constraints

function getLength<T extends { length: number }>(item: T): number {
    return item.length
}
getLength("Hello")
getLength([1, 2, 3])
// 4️⃣ Generic Function with Interfaces
interface Developer<T> {
    name: string
    device: T
}

function getDevice<T>(developer: Developer<T>): T {
    return developer.device
}
// 5️⃣ Arrow Function with Generics

const identity4 = <T>(value: T): T => {
    return value
}

// 6️⃣ Generic Function with Default Type
function createArray<T = string>(value: T): T[] {
    return [value]
}
createArray("hello")   // string[]
createArray<number>(5) // number[]
createArray("hello")   // string[]
createArray<number>(5) // number[]

// 7️⃣ Real - World Example(Reusable API Response)
interface ApiResponse<T> {
    success: boolean
    data: T
}

function handleResponse<T>(response: ApiResponse<T>): T {
    return response.data
}
//generic + function
