import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import {getDownloadURL,getStorage,ref,uploadBytes} from 'firebase/storage'
import firebase from '../../firebase/config'
import {addDoc,collection,getFirestore} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';



const Create = () => {
  const {user}  = useContext(AuthContext)
  const [name , setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState(null)
  const [image,setImage] = useState(null)

  const firestorage=getStorage(firebase)
  const firestore = getFirestore(firebase)
  const nav = useNavigate()


  const handleSubmit = () => {
    const date=new Date()
    if(user){
      const storageRef = ref(firestorage, `/images/${image.name}`)
      console.log(storageRef,'storagereg')      
      const imageBlob = new Blob([image], {type:image.type});
        uploadBytes(storageRef, imageBlob).then((snapshot) => {
          getDownloadURL(ref(firestorage, `/images/${image.name}`))
          .then(async(url) => {
            console.log(url,'image url');
            await addDoc(collection(firestore, "products"), {
              productName: name,
              category: category,
              price: price,
              image: url,
              CreatedAt:date.toDateString(),
              userId:user.id
            });
            console.log("User updated successfully!");
            nav('/')
          })
    
        });
    }else{
      alert('please log in')
      setTimeout(() => {
       nav('/login')
      }, 1000);
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
            <br />
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
