import React, { useEffect, useState } from 'react'
import AppRouter from './router'
import { getUser } from './api/auth-service'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/slices/auth-slice'

const App = () => {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const loadData = async () => { 
    try {
    const resp = await getUser();
    dispatch(login(resp));
    } catch (err) {
      console.log(err);
      dispatch(logout());
    }
    finally{
      setLoading(false);
    }
   }

   useEffect(() => {
     loadData();
   }, [])
   

  return <>{loading ? <div>Loading...</div> : <AppRouter/>}</>
}

export default App