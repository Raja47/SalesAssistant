import React ,{Component, Fragment} from 'react';
import { Link, Redirect,useHistory} from "react-router-dom";
import {Button ,Container ,Row,Col,Card,Tabs,Tab,Sonnet,Form, Navbar,Nav,NavDropdown,Image,Modal } from 'react-bootstrap';

import './carousels.css';




import { connect } from 'react-redux'
import icon from '../../../../assets/img/icon.png'; 
import Select from "react-select-search";

import { faSearch ,faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SelectSearch from "react-select"
import { suggestResourceAction }  from "../../../../../actions/resourceActions";

import ReactFancyBox from 'react-fancybox';
import 'react-fancybox/lib/fancybox.css';




import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Carouselslider extends Component {


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
          selectedType : 1,
          suggestions : [],
          suggestedKeywords: rawkeywords,
          options:rawOptions
      };
      const alreadyCalled = '';

  }


  /**
   *   {when follwing props changes , set the New State Value}
   *   Suggestions
   *   Suggested Keywords
   */

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.suggestions !== prevProps.suggestions) {
  //     this.setState({suggestions:this.props.suggestions});
  //   }
  //   if (this.props.suggestedKeywords !== prevProps.suggestedKeywords) {
  //     this.setState({suggestedKeywords:this.props.suggestedKeywords});
  //   }
  // }

  handleChangeType = (e) => {
    this.setState({'selectedType':e})
  }

  // handleTypedKeywords = (e,action) => {
    
  //   if( action.action == 'menu-close' || action.action == 'input-blur' ){
  //     return '';
  //   }
  //   if( e =="" || e == undefined || e == null){
        
  //        this.setState({suggestedKeywords:[]});
  //        this.setState({searchKeywords:{label:e , value:e}});
  //   }else{

  //     var {selectedType } = this.state;
  //     clearTimeout(this.alreadyCalled);
  //     this.alreadyCalled = setTimeout( () => this.suggestions(selectedType,e) ,230 ); 
  //     this.setState({searchKeywords:{label:e , value:e}});  
  //   }
  // }

  // suggestions = (type,keywords) => {
  //    this.props.dispatch(suggestResourceAction(type,keywords));
  // }
  
  
    /**
     * { When use clicks in Select ,already values need to be cleared }
     */   
      // handleOnFocus = (e) => {
      //     //this.setState({searchKeywords:null});
      // }
  
  
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

  /**
   * Renders the Component.
   *
   * @return {<Html>}  { return reactable html on web page}
  */
  render() {
    
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
                              <Navbar.Brand href="#home">Home</Navbar.Brand>
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
                                  <Navbar.Brand href="#dashboard">Dashboard</Navbar.Brand>
                            </Navbar>
                            
                        </Col>
                
                        </Row>
        </Container>
        <Container>
              <Row>
                     <Col md={2}></Col>   
                     <Col md={8} className="searhtagline"><h2>Ideas in your feed are based on these topics</h2></Col>  
                     <Col md={2}></Col>  
              
              </Row>        
        
        </Container>
        
        
        <Container className="majorsearch">
              <Row>
                    <Col md={3} className="majorsearch-col">
                        <Card className="majorsearch-card">
                          <Card.Img variant="top" src="https://i.pinimg.com/564x/3b/3f/8a/3b3f8a6c0085a49a592ccbeaa1dcbc96.jpg" />
                          <Card.Body>
                            <Card.Title>Web Design</Card.Title>
                          </Card.Body>
                        </Card>
                    </Col>   
                   <Col md={3} className="majorsearch-col">
                        <Card className="majorsearch-card">
                          <Card.Img variant="top" src="https://i.pinimg.com/564x/12/c8/97/12c8970c0085584d34d098acd79973d6.jpg" />
                          <Card.Body>
                            <Card.Title>Logo Design</Card.Title>
                          </Card.Body>
                        </Card>
                    </Col>   
                    <Col md={3} className="majorsearch-col">
                        <Card className="majorsearch-card">
                          <Card.Img variant="top" src="https://i.pinimg.com/564x/a4/1b/b5/a41bb54228288ae7070f8d1283a2acfa.jpg" />
                          <Card.Body>
                            <Card.Title>Apps Design</Card.Title>
                          </Card.Body>
                        </Card>
                    </Col>   
                    <Col md={3} className="majorsearch-col">
                        <Card className="majorsearch-card">
                          <Card.Img variant="top" src="https://i.pinimg.com/564x/1a/01/52/1a015293a3c37f8330a345cce945b5c9.jpg" />
                          <Card.Body>
                            <Card.Title>Animation</Card.Title>
                          </Card.Body>
                        </Card>
                        
                    </Col>  
                    
                    
              </Row>        
        
        </Container>
        
        
        <br/><br/><br/>
        <Container>
              <Row>
                     <Col md={2}></Col>   
                     <Col md={8} className="searhtagline"><h2>See All Examples Design</h2></Col>  
                     <Col md={2}></Col>  
              </Row>        
        
        </Container>
        <Container fluid className="search-result-final-kk">
           <Row> 
                <Col md={3} sm={12} xs={12} className="search-result-img-kk">
                    <Card>
                    <ReactFancyBox
                          thumbnail="https://i.pinimg.com/564x/0e/71/98/0e71984cbbc19c84ddd2fb2ac96db6a7.jpg"
                          image="https://i.pinimg.com/564x/0e/71/98/0e71984cbbc19c84ddd2fb2ac96db6a7.jpg" defaultThumbnailHeight />
                      
                       <Card.Body >
                        <Card.Title>View large Image</Card.Title>
                        </Card.Body>
                    </Card>
                
                </Col> 
                <Col md={3} sm={12} xs={12} className="search-result-img-kk">
                   <Card>
                        <Image variant="top" thumbnail  src="https://i.pinimg.com/564x/02/86/28/028628abb46fc4a6c4e4a4c87dd13bea.jpg"/>
                      <Card.Body >
                        <Card.Title>
                          <a href="https://www.google.com/" target="blank">
                            <svg aria-hidden="true" focusable="false" 
                            data-prefix="fas" data-icon="external-link-alt" 
                            class="svg-inline--fa fa-external-link-alt fa-w-16" 
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" 
                            d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,
                            0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,
                            0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,
                            471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z">
                            </path>
                            </svg>Visit Wesbite Link
                          </a>
                        </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>  
                <Col md={3} sm={12} xs={12} className="search-result-img-kk">
                   <Card>
                      <Image variant="top" thumbnail  src="https://i.pinimg.com/564x/fb/c1/a2/fbc1a24a0f7469944481f63f399d7f9d.jpg"/>
                      <Card.Body >
                        <Card.Title>CC App Design</Card.Title>
                            <div>
                                <FontAwesomeIcon icon={faEye}  />
                            </div>  
                        </Card.Body>
                    </Card>
                </Col> 
                
                <Col md={3} sm={12} xs={12}  className="search-result-img-kk">
                   <Card>
                      <Image variant="top" thumbnail  src="https://i.pinimg.com/236x/76/df/a0/76dfa0f33b106ed6cf8269b71d7d148e.jpg"/>
                      <Card.Body >
                        <Card.Title>DD Video Animation</Card.Title>
                            <div>
                                <FontAwesomeIcon icon={faEye}  />
                            </div>  
                        </Card.Body>
                    </Card>
                </Col> 
                <Col md={3} sm={12} xs={12} className="search-result-img-kk">
                   <Card>
                      <Image variant="top" thumbnail  src="https://i.pinimg.com/564x/09/68/59/09685975631d27bdb1e4099babff0b12.jpg"/>
                      <Card.Body >
                        <Card.Title>DD Video Animation</Card.Title>
                            <div>
                                <FontAwesomeIcon icon={faEye}  />
                            </div>  
                        </Card.Body>
                    </Card>
                </Col>  
                    
           </Row> 
        
        </Container>
        
        
     {/*  <Row className="slidermain">
        
        <Col md={12}>
         
        <Row>
        <Col md={2}></Col>
        <Col md={8} className="formfirstcontent">
       
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

          <Col md={2}></Col>

        </Row>
         
        </Col>
      
      </Row>
      */}
      
    </span>
    );
  }
}


function mapStateToProps(state){
   return {  
        //suggestions: state.resourceReducer.suggestedResources,
        //suggestedKeywords: state.resourceReducer.suggestedKeywords
    }
}


export default connect(mapStateToProps)(Carouselslider)