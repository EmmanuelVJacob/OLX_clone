import React,{useContext,useState,useEffect} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import firebase from '../../firebase/config';
import { collection,getDocs,getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';


function Posts() {
const [products,setProducts] = useState([])
const firestore = getFirestore(firebase)
const {setPostDetails} = useContext(PostContext)
const navigate = useNavigate()
useEffect(()=>{
  const fetchedProducts = []
  getDocs(collection(firestore,'products')).then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
      const productData = {
        ...doc.data(),
        id:doc.id
      };
      fetchedProducts.push(productData)
    })
    setProducts(fetchedProducts)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
function handleClick(params) {
  const filteredProducts = products.filter(product => product.id === params);
  setPostDetails(filteredProducts)
  navigate('/view')
}
  return (
    <div className="postParentDiv">
     
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            products.map((product)=>(
              <div  onClick={()=>{
                handleClick(product.id)
              }} className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.image} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.CreatedAt}</span>
            </div>
          </div>
            )

            )
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
