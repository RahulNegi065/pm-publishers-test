import { useQuery } from "@tanstack/react-query"
import { handleGetProducts } from "../services/products";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/stores/cartStore";
import { decrement, increment } from "../redux/features/cartSlice";
import Loader from "../components/Loader";

function Home() {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const [products, setProducts] = useState<any[]>([])
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => handleGetProducts(products),
  })

  useEffect(() => {
    refetch();
  
    return () => {}
  }, [products])

  if(isPending) return <Loader />
  if(error) return `Error! ${error}`

  return (
    <div style={{width: '100%', minHeight: '100vh', padding: '20px', boxSizing: 'border-box'}}>
      {data && data.length && (
          <div className="grid">
            {data.map(product => (
              <div key={product.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '4px', boxShadow: '0 0 2px lightgray'}}>
                <Link to={`product/${product.id}`}>
                  <img src={product.images[0]} style={{maxWidth: '100%', objectFit: 'cover'}} height={'200px'} alt="product.name" />
                </Link>
                <p style={{marginTop: '10px'}}>{product.title}</p>
                <h5 style={{marginBottom: '12px'}}>{product.brand}</h5>
                <div className="addToCartBtn">
                  <button onClick={() => dispatch(decrement({id: product.id, qty: 1}))}>-</button>
                  <button style={{paddingInline: 0, width: '50px', background: 'transparent', pointerEvents: 'none', marginBottom: '10px'}}>
                    { cart.products[product.id] || 0 }
                  </button>
                  <button onClick={() => dispatch(increment({id: product.id, qty: 1}))}>+</button>
                </div>
              </div>
            ))}
          </div>
      )}
      { data && data.length<30 &&
      <div style={{display: 'flex', placeContent: 'center', width: '100%', paddingBlock: '20px 10px'}}>
        <button onClick={() => {products.length<20 ? setProducts(data) : null}}>Load More</button>
      </div>
      }

    </div>
  )
}

export default Home