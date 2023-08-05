import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : error ? (
        <div>{error?.data.message || error.error} </div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <div className="row">
            {products.map((product) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3"
                key={product._id}
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
