import React ,{Component, Fragment} from 'react';
import { Link, Redirect } from "react-router-dom";
import {Button, Carousel ,Container ,Row,Col,Card,Tabs,Tab,Sonnet,Form, Navbar,Nav,NavDropdown} from 'react-bootstrap';
import './searchbar.css';
import { connect } from 'react-redux'
import Select from "react-select-search"
import SelectSearch from "react-select"
import icon from '../../../../assets/img/icon.png'; 
import { faSearch ,faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { suggestResourceAction }  from "../../../../../actions/resourceActions"; 


class Searchbar extends Component {

  /**
   * Constructs a new instance.
   *
   * @param {<type>}  props The properties
   */
  constructor(props) {

      super(props);

      const rawOptions = [];
      Object.entries(categories).map(([key, value]) => { rawOptions.push({ value: value ,name:key } ) });

      const rawkeywords = [];
      Object.entries(keywords).map(([key, value]) => { rawkeywords.push({ value: value ,label:key} ) });
      
      this.state = {
          resources:[],
          inputValue:null,
          searchKeywords:[{label: "All industries", value: "All industries"}],
          selectedType : 1,
          searchedFor: [],
          suggestions : rawkeywords,
          suggestedKeywords:rawkeywords,
          options:rawOptions
      };
      
      var alreadyCalled = '';
  }

  componentDidMount() {
     
  }

  /**
   *   {when follwing props changes , set the New State Value}
   *   seachedFor
   *   Suggestions
   *   Suggested Keywords
   */
  componentDidUpdate(prevProps) {
    
    if(this.props.searchedFor !== prevProps.searchedFor ){
   
        this.setState({searchKeywords:this.props.searchedFor.keywords,selectedType:this.props.searchedFor.type});
        console.log(this.props.searchedFor.type);
    }
  
  }


/**
* { search Input & select Type . Change }
*/ 
      

      /**
       * { function_description }
       *
       * @param      {<type>}  e       { parameter_description }
       */
      handleChangeType = (e) => {
          
        this.setState({selectedType:e});
        
        // const keywords = this.state.searchKeywords; 
        // if(keywords != "" && keywords != undefined ){
        //     this.props.handler(e,keywords.value);
        // }
      }
      

      /**
       * { function_description }
       *
       * @param      {string}  e       { parameter_description }
       * @param      {string}  action  The action
       */

      handleTypedKeywords = (e,action) => {
        // console.log(action.action);
          this.setState({inputValue:e});
          // if(action.action == 'set-value'){
          //     console.log('action');
          // }              

          // }else{
          //    console.log(e);
          //    if(e.keyCode === 13 ){
               
          //       const {searchKeywords , selectedType } = this.state;
          //       if(searchKeywords !== "" && searchKeywords != null && searchKeywords != [] && selectedType!= undefined && selectedType!= null && selectedType!= ""){
          //           this.props.handler(selectedType,searchKeywords);
          //       }
          //     }
          // }
              
             
           
      }
        
       
      // }
     //  suggestions = (type,keywords) => {
     //      this.props.dispatch(suggestResourceAction(type,keywords));
     //  }
      

     // handleOnFocus = (e) => {
        
     // }
  
  
/**
 * { click search or on enter search functions  }
 */
      /**
       * { search button clicked }
       */
      handleSearhClick = () => {
          const {searchKeywords , selectedType } = this.state;
          if(searchKeywords != "" && searchKeywords != null && searchKeywords != [] && selectedType!= undefined && selectedType!= null && selectedType!= ""){
              this.props.handler(selectedType,searchKeywords);
          }
      }

      /**
       * {when any option selected form suggestions}
       * @param  e  <type> Object {e is option selected } 
       */
      handleChangeKeywords = (e) => {
          //console.log('change');
          this.setState({searchKeywords:e});
       
      } 

      /**
       * { when enter (keycode=13) is clicked }
       *
       * @param      {<type>}  e { e is keyPressed }
       */
      handleEnterKey = (e) => {
        //console.log('enter key');
     
        if(this.state.inputValue == '' && e.keyCode === 13 ){
      
            const {searchKeywords , selectedType } = this.state;
            if(searchKeywords !== "" && searchKeywords != null && searchKeywords != [] && selectedType!= undefined && selectedType!= null && selectedType!= ""){
                this.props.handler(selectedType,searchKeywords);
            }
        }
      }



  /**
   * {Renders the Component}
   */
  render() {
     const {selectedType, searchKeywords} = this.state;
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
                                value={ this.state.selectedType }
                                options={ this.state.options }
                                onChange={ (e) => {this.handleChangeType(e)}}
                              />
                            </Col>
                            <Col lg={9} xs={12} md={12} className="searchmain-home"> 
                              <SelectSearch 
                                
                                name="keywords"
                                onInputChange={(e,action) => {this.handleTypedKeywords(e,action)}}
                                onKeyDown={e => {this.handleEnterKey(e)}}
                                onChange={(e)  =>  {this.handleChangeKeywords(e)}} 
                                options={suggestedKeywords}
                                placeholder={"Type Keywords"} 
                                className="form-control"
                                isMulti={'True'}
                                value={ this.state.searchKeywords}
                                inputValue={this.state.inputValue}
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


/**
 * { Get the updated props from reducers }
 */
function mapStateToProps(state){
   return {  
        searchedFor : state.resourceReducer.searchedFor,
    }
 }


export default connect(mapStateToProps)(Searchbar)



