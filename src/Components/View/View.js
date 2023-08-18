import React from 'react';
import { useState,useContext,useEffect } from 'react';
import { PostContext } from '../../store/PostContext';
import { collection,getDocs,getFirestore,query,where } from 'firebase/firestore';
import firebase from '../../firebase/config';
import './View.css';
function View() {
  const {postDetails} = useContext(PostContext)
  const sellerId = postDetails && postDetails[0].userId;
  const [seller,setSeller]  = useState()
  const firestore = getFirestore(firebase)
  useEffect(() => {
    console.log(sellerId,'seellleer');
    if (sellerId) {
      const q = query(collection(firestore, 'users'), where('id', '==', sellerId));
      getDocs(q).then((details) => {
        if (details.empty) {
          console.log('User not found');
        } else {
           setSeller(details.docs[0].data());
        }
      });
    }
  }, [firestore, sellerId]); // Include dependencies in the useEffect dependency array
  console.log(seller,'seller');
  return (
    <>
    {postDetails ? (
      <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img 
          src={postDetails[0].image}
          alt=""
          />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails[0].price} </p>
          <span>{postDetails[0].name}</span>
          <p>{postDetails[0].category}</p>
          <span>{postDetails[0].createdAt}</span>
        </div>
        {seller && ( // Add conditional check for seller
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{seller.name}</p>
                <p>{seller.mobile}</p>
              </div>
            )}
      </div>
        
    </div>) : <div> not data</div>
  }
    </>
  );
}
export default View;
