{
    class Animal {
        name: string
        species: string
        sound: string

        constructor(name1: string, species1: string, sound1: string) {
            this.name = name1
            this.species = species1
            this.sound = sound1
        }

        makeSound() {
            console.log(`Name: ${this.name}`)
        }
    }

    const dog = new Animal("rahul", "german shepherd", "booo");

    console.log(dog.species)
    console.log(dog.makeSound())

    //inheritence
    class Student {
        name: string;
        age: number;
        address: string
        constructor(name1: string, age1: number, address1: string) {
            this.name = name1;
            this.address = address1;
            this.age = age1;
        }
        getSleep(numberOfHours: number) {
            console.log(`${this.name} sleeeps for ${numberOfHours}`)
        }

    }
}