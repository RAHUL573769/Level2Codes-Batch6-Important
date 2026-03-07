{
    // promise
    const createPromise = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            const data = "something";

            if (data) {
                resolve(data);
            } else {
                reject("Failed to resolve data");
            }
        });
    };

    const showData = async (): Promise<string> => {
        const data = await createPromise();
        console.log(data); // this will run
        return data;
    };

    showData();
    type Todo = {
        id: number
        userId: number
        title: string
        completed: boolean
    }

    const getTodo = async (): Promise<Todo> => {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos/1")
        const result: Todo = await data.json()
        return result
    }

    getTodo().then(todo => console.log(todo))
}