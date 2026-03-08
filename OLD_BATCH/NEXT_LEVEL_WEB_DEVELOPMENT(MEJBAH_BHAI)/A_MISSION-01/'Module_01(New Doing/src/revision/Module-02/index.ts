{
    // type assertion
    const string1: string = "Hello Worlds"
    console.log(string1)
    function typeAssertion(value: string | number): string | number {
        if (typeof value === "string") {
            const convertedValue = parseFloat(value)
            return convertedValue
        } else {
            const value1 = value + value
            return value1
        }
    }

    const result = typeAssertion(34) as number
    console.log(result)

    // type assertion
    type User1 = {

    }
    interface user2 {

    }
    function getFirst<T>(arr: T[]): T | undefined {
        return arr[0];
    }
    getFirst<number>([1, 2, 3])
    getFirst<string>(["a", "b", "c"])

    // Generics With Arrays
    function getFirst1<T>(arr: T[]): T | undefined {
        return arr[0];
    }
    // Generics With Arrays
    // 5. Multiple Generic Types
    function pair<T, U>(first: T, second: U) {
        return { first, second }
    }
    // 5. Multiple Generic Types
    // 6. Generics With Interfaces
    interface ApiResponse<T> {
        data: T
        success: boolean
    }
    interface User {
        name: string
        age: number
    }

    const response: ApiResponse<User> = {
        data: { name: "John", age: 30 },
        success: true
    }

    // 6. Generics With Interfaces

    // 7. Generics With Classes

    class Box<T> {
        content: T

        constructor(value: T) {
            this.content = value
        }
    }
    const numberBox = new Box<number>(10)
    const stringBox = new Box<string>("hello")
    // 7. Generics With Classes

    // -------------------------------Exaplanation 09
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }



    const user = { name: "Ali", age: 25 }

    getProperty(user, "name") // valid
    getProperty(user, "age")  // valid
    // getProperty(user, "email") // error





    //     1. First Generic: T
    //         <T>

    // T represents the type of the object you pass.

    //         Example:

    //     const user = {
    //         name: "Ali",
    //         age: 25
    //     }

    //     Here:

    //     T = { name: string; age: number }
    //     2. keyof T

    // keyof is a TypeScript keyword.

    // It means:

    //     "Give me all the keys of this object type."

    //     Example:

    //     type User = {
    //         name: string
    //         age: number
    //     }
    // keyof User

    //     becomes

    //     "name" | "age"

    // So keyof T means:

    // all keys inside object T
    //     3. Second Generic: K extends keyof T
    // K extends keyof T

    // This means:

    // K must be one of the keys of T.

    // Example if:

    //         T = { name: string; age: number }

    //     Then:

    // K can only be:
    //     "name" OR "age"

    // NOT allowed:

    //     "email"
    //     "address"
    //     4. Full Function Meaning
    //     function getProperty<T, K extends keyof T>(obj: T, key: K)

    // This means:

    // • obj → any object
    // • key → must be a valid key of that object

    //     5. Example Usage
    //     const user = {
    //         name: "Ali",
    //         age: 25
    //     }

    //     getProperty(user, "name")

    // TypeScript understands:

    //     T = { name: string; age: number }
    //     K = "name"

    //     Result:

    //     "Ali"
    //     6. TypeScript Prevents Errors

    //     Valid:

    //     getProperty(user, "age")

    // ❌ Invalid:

    //     getProperty(user, "email")

    // Error because:

    //     "email" is not a key of user

    // This prevents runtime bugs.

    // 7. Why This Is Powerful

    // Without this check:

    //     function getProperty(obj: any, key: string) {
    //         return obj[key]
    //     }

    // You could do:

    //         getProperty(user, "email")

    // Which would return:

    //     undefined

    // But TypeScript won't warn you.

    // With generics + keyof, TypeScript stops mistakes early.

    // 8. Visual Summary

    //     Object:

    //     user = {
    //         name: "Ali",
    //         age: 25
    //     }

    //     Keys:

    // keyof user = "name" | "age"

    // So the function becomes:

    //         getProperty(user, "name") ✅
    //     getProperty(user, "age") ✅
    //     getProperty(user, "email") ❌

    // ✅ Simple one - line explanation

    // K extends keyof T

    //     means:

    // The key must be a valid property of the object.
}

