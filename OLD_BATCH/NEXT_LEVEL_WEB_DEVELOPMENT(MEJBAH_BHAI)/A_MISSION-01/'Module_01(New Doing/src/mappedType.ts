{
    // mapped type
    const arrayOfNumbers = [1, 23, 45]
    const arrayOfStrings: string[] = ["A", "B"]

    const arrayOfStrings1 = arrayOfNumbers.map((number) => number.toString())
    console.log(arrayOfStrings1)

    type ArrayNumber = {
        height: number
        length: number
    }

    // mapped type
    type AreaString = {
        [key in keyof ArrayNumber]: string
    }

    type AreaString1<T> = {
        [key in keyof T]: string
    }

    const area12: AreaString1<{ height: string; length: string }> = {
        height: "100",
        length: "200"
    }

    console.log(area12)
    type AreaString2<T> = {
        [key in keyof T]: T[key] //lookup type
    }
    const area13: AreaString1<{ height: string; length: string }> = {
        height: "100",
        length: "200"
    }

    console.log(area13)
}