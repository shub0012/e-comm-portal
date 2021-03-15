import React from 'react'
import { Carousel,Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';


const ProductsCarousel = ({products, onAddToCart}) => {
    console.log(products)
//     const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//     console.log(selectedIndex,index)
//   };
  return (
        <Carousel indicators={false} >
        {products.map((product) => (
            <Carousel.Item key={product.id} className="w-100">
                <Carousel.Caption>
                    <h3 className="text-dark">{product.name}</h3>
                </Carousel.Caption>
                <img
                    className="w-100"
                    src={product.media.source}
                    alt={product.name}
                    height="500"
                />
                <div className="text-center">
                <Button type="button" className="btn btn-success" onClick={() => onAddToCart(product.id,1)}>Add to Cart</Button>
                </div>
            </Carousel.Item>
        ))}
      </Carousel>  
      )
}


export default ProductsCarousel
