import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../redux/stores/cartStore"
import { decrement, increment } from "../redux/features/cartSlice"
import Rating from "../components/Rating"

function product() {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const queryClient = useQueryClient();
  const cachedProducts = queryClient.getQueryData<any[]>(['products']);
  
  useEffect(() => {
    if(cachedProducts && cachedProducts.length) {
      const productId = params.id;
      const index = cachedProducts.findIndex(item => item.id==productId);
      console.log(cachedProducts[index])
      if(index>=0) setProduct(cachedProducts[index]);
    } else navigate('/');
  }, [params.id])
  
  return (
    <div className="productPage" style={{display: "flex", flexDirection: 'column', width: '100%', minHeight: '100vh', padding: '20px'}}>
      {
        product && (
          <>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
          {
            product.images.map((image:string) => (
              <img key={image} style={{objectFit: 'cover', borderRadius: '4px'}} width={'200px'} height={'200px'} src={image} alt="" />
            ))
          }
          </div>
          <p style={{marginTop: '20px', fontSize: '24px'}}>{product.title}</p>
          <h5 style={{fontSize: '18px'}}>{product.brand}</h5>
          <div className="addToCartBtn">
            <button onClick={() => dispatch(decrement({id: product.id, qty: 1}))}>-</button>
            <button style={{paddingInline: 0, width: '50px', background: 'transparent', pointerEvents: 'none', marginBottom: '10px'}}>
              { cart.products[product.id] || 0 }
            </button>
            <button onClick={() => dispatch(increment({id: product.id, qty: 1}))}>+</button>
          </div>
          <Rating />
          </>
        )  
      }
    </div>
  )
}

export default product