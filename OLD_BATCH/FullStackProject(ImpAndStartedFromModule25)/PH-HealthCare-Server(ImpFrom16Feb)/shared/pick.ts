const pickFunction = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
    const finalObj: Partial<T> = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]
        }
    }

    console.log(finalObj)
    return finalObj;
}

export default pickFunction;
// -------------------------------------------------

//     const query = {
//         name: "John",
//         email: "john@gmail.com",
//         age: 30,
//         role: "admin"
//     }
// And you call:

// pickFunction(query, ["name", "email"])
// Result:
// {
//     name: "John",
//         email: "john@gmail.com"
// }
// 🚫 age and role are removed.

// 🔎 Now Let’s Understand the Code Line by Line
// The Function
// const pickFunction = (object: any, keys: string[]) => {
//     const finalObject: any = {}

//     for (const key of keys) {
//         if (object && Object.prototype.hasOwnProperty.call(object, key)) {
//             finalObject[key] = object[key]
//         }
//     }

//     return finalObject
// }
// 🧠 Step - by - Step Explanation
// 1️⃣ Create Empty Object
// const finalObject: any = {}
// We create a new empty object.

// This is where we’ll store only the allowed properties.

// 2️⃣ Loop Through Allowed Keys
// for (const key of keys)
//     If:

//     keys = ["name", "email"]
// The loop runs twice:

// key = "name"

// key = "email"

// 3️⃣ Check If Key Exists in Original Object
// Object.prototype.hasOwnProperty.call(object, key)
// This checks:

// Does this key exist directly inside the object ?

//     Example :

//     object = { name: "John" }

// hasOwnProperty("name") → true
// hasOwnProperty("age") → false
// ❓ Why Not Just Do:
// if (object[key])
// Because that fails when value is falsy:

// { age: 0 }
// 0 is falsy → but the key EXISTS.

// So we must check key existence, not value truthiness.

// 4️⃣ If Key Exists → Copy It
// finalObject[key] = object[key]
// We copy that property into the new object.

// 5️⃣ Return New Filtered Object
// return finalObject
// Now we get only selected fields.

// 🎯 Why This Is Important in Express
// When using:

// req.query
// Users can send anything:

// /admin?name=John&isAdmin=true&deleteAll=true
// You don’t want unexpected fields going to your database.

// So you filter:

// pickFunction(req.query, ["name", "email", "searchTerm"])
// Now only safe keys are passed to the DB.

// 🧩 Simple Real - World Analogy
// Imagine:

// The client sends you a big bag of items.

// You only allow apples and oranges.

// You remove everything else.

// That’s exactly what pickFunction does.



//     ------------------------- --------------







// Your function is basically a TypeScript version of pick(like Lodash’s pick) — it returns a new object containing only the specified keys.

//     However, there are a couple of TypeScript issues + improvements you can make.

// 🔴 Problems in Your Code
// 1) ❌ Record < string > is invalid

// Record requires two type arguments:

// Record<KeyType, ValueType>


// So Record < string > will cause an error.

// 2) ❌ Return type is any

// You lose type safety.TypeScript can infer the exact shape.

// 3) ⚠️ object && check is unnecessary

// object is already guaranteed to exist.

// ✅ Correct & Type - Safe Version
// const pickFunction = <
//     T extends Record<string, any>,
//     K extends keyof T
// >(
//     object: T,
//     keys: K[]
// ): Pick<T, K> => {
//     const finalObject = {} as Pick<T, K>;

//     for (const key of keys) {
//         if (Object.prototype.hasOwnProperty.call(object, key)) {
//             finalObject[key] = object[key];
//         }
//     }

//     return finalObject;
// };

// 🧠 What This Version Does
// 🔹 T extends Record<string, any>

// Ensures input is an object with string keys.

// 🔹 K extends keyof T

// Keys must exist on the object.

// 🔹 Return type → Pick<T, K>

// TypeScript knows exactly which fields are returned.

// 📌 Example Usage
// const user = {
//     id: 1,
//     name: "Rahul",
//     email: "rahul@test.com",
//     role: "admin",
// };

// const result = pickFunction(user, ["name", "email"]);

// ✅ Result(fully typed)
// {
//     name: string;
//     email: string;
// }

// 🚀 Bonus: Cleaner Modern Version(Using reduce)
// const pickFunction = <
//     T extends Record<string, any>,
//     K extends keyof T
// >(
//     object: T,
//     keys: K[]
// ): Pick<T, K> =>
//     keys.reduce((acc, key) => {
//         if (key in object) {
//             acc[key] = object[key];
//         }
//         return acc;
//     }, {} as Pick<T, K>);


// If you want, I can also show:

// ✅ How Lodash implements pick
// ✅ Deep pick(nested keys like "user.name")
// ✅ Use in Prisma filters(very useful for backend)
// ✅ Utility type version only (no function)

// Just say 👍

// const pickFunction = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
//     const finalObj: Partial<T> = {};

//     for (const key of keys) {
//         if (obj && Object.hasOwnProperty.call(obj, key)) {
//             finalObj[key] = obj[key]
//         }
//     }

//     console.log(finalObj)
//     return finalObj;
// }

// export default pickFunction;....................Please explain this code as a beginner

// Great 👍 let’s explain this in a very beginner - friendly way, step by step.

// 📌 What This Function Does(Simple Idea)

// This function takes:

//     An object

// A list of keys(property names)

// And it returns a new object that contains only those selected keys.

// It works like a filter for objects.

// 🧠 Example First(So You Understand the Goal)
// const user = {
//     name: "Rahul",
//     age: 25,
//     email: "rahul@gmail.com"
// };

// pickFunction(user, ["name", "email"]);


// 👉 Output:

// {
//     name: "Rahul",
//         email: "rahul@gmail.com"
// }


// It removed age because we didn’t ask for it.

// 🔎 Now Let’s Break Down The Code
// 1️⃣ The Function Declaration(Generics)
// const pickFunction =
//     <T extends Record<string, unknown>,
//     k extends keyof T>


//         This is TypeScript Generics.

//             Don’t panic 😄 let’s simplify it.

// 🔹 T extends Record<string, unknown>

// This means:

// "T must be an object with string keys"

// So the function only accepts objects like:

// { name: string }
// { id: number }

// 🔹 k extends keyof T

// This means:

// "k must be one of the keys of T"

// If the object has:

// { name, age, email }


// Then k can only be:

// "name" | "age" | "email"


// So TypeScript prevents mistakes like:

// pickFunction(user, ["password"]) ❌


// Because "password" does not exist in user.

//     That’s the power of TypeScript here.

// 2️⃣ Parameters
//     (obj: T, keys: k[])


// This means:

// obj → the original object

// keys → an array of keys from that object

// Example:

// obj = user
// keys = ["name", "email"]

// 3️⃣ Return Type
// : Partial<T>


// Partial < T > means:

// "An object that may contain some or all properties of T"

// Example:

// If T is:

// {
//     name: string;
//     age: number;
//     email: string;
// }


// Then Partial < T > means:

// {
//     name ?: string;
//     age ?: number;
//     email ?: string;
// }


// All properties become optional(?).

// Because we are not returning the full object — only some keys.

// 4️⃣ Creating the New Object
// const finalObj: Partial<T> = {};


// We create an empty object that will store selected properties.

// 5️⃣ Loop Through Keys
// for (const key of keys) {


// This loops over the keys array.

//         If:

//     keys = ["name", "email"]


// Then it runs twice:

//     First → key = "name"

//     Second → key = "email"

//     6️⃣ Check if Property Exists
//     if (obj && Object.hasOwnProperty.call(obj, key)) {


// This checks:

//         "Does the object really have this property?"

// It prevents errors if someone passes a wrong key.

// 7️⃣ Copy the Property
//         finalObj[key] = obj[key]


// This copies:

//         finalObj["name"] = obj["name"]


// So the selected property gets added to the new object.

// 8️⃣ Return the Result
//         return finalObj;


// Now we return the filtered object.

// 🧩 Full Flow in Simple English

// Take an object.

// Take a list of keys.

// Create an empty object.

// Loop through keys.

// If the object contains that key:

// Copy that property into the new object.

// Return the new object.

// 🔥 Why This Is Powerful

// This function:

// ✅ Prevents invalid keys

// ✅ Keeps type safety

// ✅ Returns correct TypeScript types

// ✅ Avoids runtime errors