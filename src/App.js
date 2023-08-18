import React, { useContext,useEffect } from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import View from './Pages/ViewPost'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import firebase from './firebase/config';
import {AuthContext} from './store/Context'
import Post from './store/PostContext'
import {getAuth } from 'firebase/auth'
import {getDocs,collection,query,where,getFirestore} from 'firebase/firestore'

function App() {
  const {setUser,user} = useContext(AuthContext)
  console.log(user,'user common');
  const auth = getAuth(firebase)
  const firestore = getFirestore(firebase)
  useEffect(() => {
    auth.onAuthStateChanged(async(user)=>{
      if(user){
        const q = query(collection(firestore,'users'),where('id','==',user.uid))
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot,'somerthing');
        if (querySnapshot.empty) {
          console.log('User not found');
        } else {
          const user = querySnapshot.docs[0].data();
          setUser(user)
          
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>
      <Post>
      <Routes>
      <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/create' element={<Create />}/>
        <Route path='/view' element={<View />}/>
      </Routes>
      </Post>
    </div>
  );
}

export default App;
