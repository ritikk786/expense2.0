import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Classes from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { userloginAction } from '../../Store/uselogin';
import LogoutIcon from '@mui/icons-material/Logout';

 const Header = () => {
  const isUserLogin = useSelector((state)=> state.loginmange.islogin)
  const dispatch = useDispatch();
  const logouthandler = ()=>{
    dispatch(userloginAction.logouthandler())
    localStorage.clear();
  }
  return (
    
    <header className={Classes.header}>
    <Navbar bg="light" expand="lg" style={{position:'sticky', top:'0',zIndex:'10', boxShadow:'1px 1px 6px 4px lightgray'}}>
    <Container style={{flexWrap : 'nowrap'}}>
      <div className={Classes.data}>
        <img src='https://m.media-amazon.com/images/I/61AxZXJ1u7L.png' width='40'/>
      <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
      </div>
      <div>
      {isUserLogin &&
      <Button variant="outline-success" onClick={logouthandler}>Logout
       <LogoutIcon style={{marginLeft:'0.2em'}}/></Button> 
       }
       </div> 
      
      
    </Container>
  </Navbar>
  </header>
  
  )
}
export default Header;
