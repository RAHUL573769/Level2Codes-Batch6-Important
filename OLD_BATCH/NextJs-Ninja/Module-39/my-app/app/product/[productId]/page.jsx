

const DynamicRouteId = ({ params }) => {

    console.log(params.productId)
    return (
        <div>
            <h2>This is Dynamic{ params.productId}</h2>
        </div>
    );
};

export default DynamicRouteId;