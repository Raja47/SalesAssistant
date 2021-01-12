import React from 'react';
import {Button, Carousel ,Container ,Row,Col,Card,Tabs,Tab,Navbar,Nav,Form,FormControl,NavDropdown} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './header.css';

import logo from '../../../assets/img/logo-new.png'; 
import dash from '../../../assets/img/dash.png'; 
// get our fontawesome imports
import { faSearch ,faEye , faHome ,faTachometerAlt,faUser,faComments} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingBar from 'react-redux-loading-bar'



function Header() {
  
  const themeLocation = {
    pathname:'/search',
    state: {
      keywords:[{label:'All industries',value:'All industries'}],
      type:'5'
    }
  }

  const imageLocation = {
    pathname:'/search',
    state: {
      keywords:[{label:'All industries',value:'All industries'}],
      type:'2'
    }
  }

  const videoLocation = {
    pathname:'/search',
    state: {
      keywords:[{label:'All industries',value:'All industries'}],
      type:'3'
    }
  }

  const pluginLocation = {
    pathname:'/search',
    state: {
      keywords:[{label:'All industries',value:'All industries'}],
      type:'4'
    }
  }

  return (
      <span>
      
        <p></p>
      </span>
   
  );
}

export default Header;
