{
    //key of type of
    type Vehicle = {
        bike: string
        car: string
        ship: string
    }
    type Owner = "bike" | "car" | "ship"
    type Owner2 = keyof Vehicle

    // function getPropertiesValue(obj: object, key: string) {
    //     return obj[key]
    // }

    // const getPropertiesValue = obj: object, key: string)= {
    //     return obj[key]
    // }

    const getPropertiesValue = <X, Y extends keyof X>(obj: X, key: Y) => {
        return obj[key]
    }
    const user = {
        name: "Rahim",
        age: 25,
        city: "Chattogram"
    };

    const name = getPropertiesValue(user, "name"); // "Rahim"
    const age = getPropertiesValue(user, "age");   // 25
    const user10 = {

    }

}