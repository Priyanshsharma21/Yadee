import React, { useEffect, useState } from 'react'
import useStyles from '../../styles'
import { Container, AppBar, Typography, Grow, Grid,Button } from '@material-ui/core';
import { Navbar,Link, Text,useTheme } from "@nextui-org/react";
import { Link as Libk } from 'react-router-dom'
import { SiEventstore } from 'react-icons/si'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import Spline from '@splinetool/react-spline';
import decode from 'jwt-decode'
import {BsFillCloudUploadFill} from 'react-icons/bs'
import {GoSignIn} from 'react-icons/go'

import { Avatar, Image } from 'antd';
const collapseItems = [
  "About Us",
  "Contact Us",
  "Log Out",
];

const NavG = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { isDark } = useTheme();
    //this is how we get user daa from Local storage
    const location = useLocation()



    const logout = ()=>{
      dispatch({type : 'LOGOUT'})
      setUser(null)
      navigate('/')
    }

    useEffect(()=>{
      const token = user?.token;

      if(token){
        const decodedToken = decode(token)

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])




  return (
    <>
  <Navbar isBordered={isDark} className={`${classes.appBar} nav_box`} variant="sticky">
        <Navbar.Toggle showIn="xs" />
          <Navbar.Brand
            css={{"@xs": {w: "12%",},}}>
            <Text className="logo_box" b color="inherit" hideIn="xs">
            <Libk to={'/'} className="logo_main_three">
              <Text
                h1
                size={40}
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
                }}
                weight="bold"
              >
                UPSHOT
              </Text>
            </Libk>
            </Text>
          </Navbar.Brand>
       
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
       
               

               <div className="userImg">
                {user ? (
                    <div className="user">
                     <div className="user_img">
                     <Avatar src={<Image src={user?.result?.picture} style={{width: 32}}/>}>
                        {user?.result?.name?.charAt(0)}
                      </Avatar>
                     </div>
                      <div className="name_of_user">{user?.result?.name}</div>
                      <div className="logout" onClick={logout}>
                        <LogoutOutlined className="logout_logo" />
                      </div>
                    </div>
                ):(
                  <Libk className={classes.create} to={'/auth'}>
                    <div className="login">
                      <GoSignIn className="same_logo_color"/>
                    </div>
                  </Libk>
                )}
               </div>

               <Libk to={'/create-event'}>
                  <div className="create">
                    <BsFillCloudUploadFill className="same_logo_color"/>
                  </div>
               </Libk>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavG


// <AppBar className={`${classes.appBar} app_bar_main`} position="static" color="inherit">
// <Typography className={`${classes.heading} main_title`} variant="h2" align="center">
//     <Link to={'/'}>
//     Upshot
//     </Link>
// </Typography>
// <Link className={classes.create} to={'/create-event'}>
//     <Button className="create_btn" variant="outlined">Create Event</Button>
// </Link>
// </AppBar>







