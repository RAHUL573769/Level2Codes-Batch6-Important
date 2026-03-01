import React from 'react';

const Page = async ( props ) => {
    console.log(props);

    const result = await props.params;
    console.log(result);

    return (
        <div>
            <h1>This is Dynamic Page</h1>
            <p>User: {result.username}</p>
        </div>
    );
};

export default Page;