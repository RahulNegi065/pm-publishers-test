export async function handleGetProducts(products:any[]) {
    try {
        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${products.length}`);
        const resData = await res.json();
        const newProducts = products.concat(resData.products);
        console.log(newProducts);
        return newProducts;
    } catch (error) {
        throw(error);
    }
}
