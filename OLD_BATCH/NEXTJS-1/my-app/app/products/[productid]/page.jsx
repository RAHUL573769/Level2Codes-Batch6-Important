const DynamicPage = ({ params,searchTerm}) => {

    return (
        <div>
            <h1>This is Dynamic {params.productid}</h1>
        </div>
    );
};

export default DynamicPage;
