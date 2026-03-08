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


}

