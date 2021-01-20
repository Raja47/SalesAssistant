import React ,{Component, Fragment} from'react';
import {Button, Carousel ,Container ,Row,Col,Card,Tabs,Tab,Navbar,Nav,Form,FormControl,NavDropdown} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './header.css';

import { connect } from 'react-redux'
import icon from '../../../assets/img/icon.png'; 
import Select from "react-select-search";

import SelectSearch from "react-select"
import { suggestResourceAction }  from "../../../../actions/resourceActions";

import logo from '../../../assets/img/logo-new.png'; 
import dash from '../../../assets/img/dash.png'; 
// get our fontawesome imports
import { faSearch ,faEye , faHome ,faTachometerAlt,faUser,faComments} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingBar from 'react-redux-loading-bar'



class Header extends Component {
  
  constructor(props) {
      super(props);
      const rawOptions = [];
      Object.entries(categories).map(([key, value]) => { rawOptions.push({value: value ,name:key }) });

      const rawkeywords = [];
      Object.entries(keywords).map(([key, value]) => { rawkeywords.push({value: value ,label:key }) });

      this.state = {
          resources:[],
          type: 'group',
          searchKeywords:"",
          redirect :null,
          selectedType : 1,
          suggestions : [],
          suggestedKeywords: rawkeywords,
          options:rawOptions
      };
      
      const alreadyCalled = '';
  }


   handleChangeType = (e) => {
    this.setState({'selectedType':e})
  }

  /**
 * { When Search button , enter in search , option is clicked }
 */   
      /**
       * { search button clicked }
       */
      handleSearhClick = () => {
        var {searchKeywords , selectedType } = this.state;
        
        if(searchKeywords.value !== "" ){
            this.setState({redirect:"/search"});
        } 
      }

      /**
       * when any option selected form suggestions}
       * @param  e  <type> Object {e is option selected } 
       */
      handleChangeKeywords = (e,action) => {
          this.setState({searchKeywords:e});
          // if(e.value !== "" || e.value !== undefined){
          //     this.setState({redirect : "/search"})  
          // }
      }

      /**
      * { when enter (keycode=13) is clicked }
      *
      * @param {<type>}  e { e is keyPressed }
      */
      handleEnterKey = (e) => {
       if(e.keyCode === 13){
            const {searchKeywords ,selectedType} = this.state;
            if(searchKeywords != "" && searchKeywords != null && selectedType != null && selectedType != "" ){
             
                this.setState({redirect : "/search"}) 
            }
        }
      }

  render () {

    if( this.state.redirect ){
      var { searchKeywords , selectedType } = this.state;
      return <Redirect push
              to={{
                  pathname: this.state.redirect,
                  state: { keywords: searchKeywords , type: selectedType  }
              }}
              />
    }

    const {suggestions,suggestedKeywords} = this.state;

    return (
      <span>
        <Container fluid className="top-header-kk">
                  <Row>
                        <Col md={1} sm={12} className="home-link-kk home-btn">
                        
                        <Navbar>
                              <Navbar.Brand href="/">Home</Navbar.Brand>
                        </Navbar>
                        
                        </Col>
                        <Col md={9} sm={12} className="formfirstcontent topheader-kk">
                       
                          <Row>
                             <Col lg={3} xs={12} md={12} className="selecttype4"> 
                              <Select
                                name="type" 
                                placeholder="Select Type"
                                value={this.state.selectedType}
                                options={this.state.options}
                                
                                onChange={ (e) => {this.handleChangeType(e)}}
                              />
                            </Col>
                            <Col lg={9} xs={12} md={12} className="searchmain-home"> 
                              <SelectSearch 
                                
                                onKeyDown={ e => {this.handleEnterKey(e)} }
                                onChange={  (e,action)  => {this.handleChangeKeywords(e,action)}} 
                                options={this.state.suggestedKeywords} 
                                placeholder={"Type Your keywords"} 
                                className="form-control"
                                isMulti={"True"}
                              />
                             
                            </Col>
                            <FontAwesomeIcon icon={faSearch}  onClick = {this.handleSearhClick} className="getbtn"/>
                          </Row>
                              
                          </Col>
                
                          <Col md={1} sm={12} className="home-link-kk">
                        
                            <Navbar>
                                  <Navbar.Brand href="/admin/login">Dashboard</Navbar.Brand>
                            </Navbar>
                            
                        </Col>
                
                        </Row>
        </Container>
       
      </span>
   
    );
  }
}

export default Header;
