{

    type Person = {
        name: string
        age: number
        email?: string
        contactNumber: string
    }

    type NameAge = Pick<Person, "name">
    type NameAge1 = Omit<Person, "name">
}