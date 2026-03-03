{
    let string1: string = "Hello"
console.log(string1)

const kgToGram=(value:string|number)=>{
  const numValue = typeof value === 'string' ? parseInt(value) : value;
  return numValue * 1000;
}

const result1=kgToGram(100) as number
console.log(result1)

interface User2{
    name:string
    age:number
}

type User1={
    name:string
    age:number
}
type UserWithRole=User1&{role:string}

const roleUser:UserWithRole={
    name:"",
    role:"",
    age:35
}
interface interfaceArray{
    [index:number]:number
}

const arrayWithInterface:interfaceArray=[1,2,3,45,6]
console.log(arrayWithInterface)
const stringArray:Array<string>=["35","eded"]
}


type GenericArray<T>=Array<T>


const arrayWithGeneric:GenericArray<string>=["fgesg"]
console.log(arrayWithGeneric)