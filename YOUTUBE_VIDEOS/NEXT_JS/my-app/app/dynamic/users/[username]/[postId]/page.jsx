;

const Page = async ( props ) => {
    console.log(props);

    const result = await props.params;
    console.log(result);

    return (
        <div>
            <h1>This is Dynamic Page</h1>
            <p>Posts</p>
        </div>
    );
};

export default Page;