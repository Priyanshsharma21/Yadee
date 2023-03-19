import { Container, AppBar, Typography, Grow, Grid,Button } from '@material-ui/core';
import memories from '../src/images/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import useStyles from './styles'
import {getPosts} from './actions/post'
import {useDispatch} from 'react-redux'
// import { FloatButton } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route,Link, Navigate} from "react-router-dom";
import { Homepage,CreateEvent,Auth,PostDetails } from './pages/index'
import { NavG } from '../src/components/main/index'


function App() {
  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(()=>{
    dispatch(getPosts())
  },[currentId])



  return (
    <GoogleOAuthProvider clientId="153276461249-bilphade43v98clj23r320j0m6bevhjo.apps.googleusercontent.com">
      <div className="app_main">
        <Container maxWidth="xl" className="app__container">
        <NavG />
        <Routes>
          {/* <Route path="/" exact element={()=> <Navigate to="/posts" />} /> */}
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Homepage setCurrentId={setCurrentId} currentId={currentId} />}/>
          <Route path="/posts/search" element={<Homepage setCurrentId={setCurrentId} currentId={currentId} />}/>
          <Route path="/posts/:id" element={<PostDetails />}/>
          <Route path="/auth" element={(!user ? <Auth /> : <Navigate replace to="/posts" />)}/>
          <Route path="/create-event" element={<CreateEvent setCurrentId={setCurrentId} currentId={currentId} />}/>
        </Routes>
        {/* <FloatButton.BackTop /> */}
      </Container>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
