import React ,{ Component , Fragmnent} from 'react';
import {Button, Carousel ,Container ,Row,Col,Card,Tabs,Tab,Sonnet ,Form,Image,Pagination} from 'react-bootstrap';
import './search.css';

import {Redirect , Link ,useHistory} from "react-router-dom";
import Searchimg from './../../assets/img/searchimg.jpg'; 
import { connect } from 'react-redux'
import Resource from "./partials/resource";
import { searchResourceAction ,}  from "./../../../actions/resourceActions";
import Searchbar from './partials/searchbar/';

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHome , faDownload } from "@fortawesome/free-solid-svg-icons";
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {MoonLoader} from "react-spinners";
import { css } from "@emotion/core";

import Modal from 'react-modal';




class Search extends Component{


    constructor(props) {
      super(props);
      this.state = { 
        keywords : [],
        type : '',
        pageCount: '',
        activePage:1,
        pages:[],
        redirect: null,
        countResults:0,
        paginationResults: 40,
        loading:false,
        showModal: false,
        modalResource:null,
    };
      

      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handler = this.handler.bind(this); 
      this.openModal = this.openModal.bind(this); 

      let pages=[];  
     
    }
    
    componentDidMount( ){
        if(this.props.location.state != undefined){
          const {keywords , type } = this.props.location.state;

          const {activePage,paginationResults} = this.state;
          this.props.dispatch(searchResourceAction(type,keywords,activePage,paginationResults));
          this.setState({loading:true,keywords:keywords,type:type });
        }
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.resources !== prevProps.resources) {
            
            if(this.props.totalResults != undefined){ 
              var pages = [];
              var results = Math.ceil(this.props.totalResults/this.state.paginationResults);
              for(var i = 1; i <= results ; i++) {
                  pages[i] = i;
              }
              this.pages = pages;  
              this.setState({resources : this.props.resources , activePage : this.props.activePage ,countResults:this.props.totalResults,pageCount:Math.ceil(this.props.totalResults/this.state.paginationResults)});
              
            }else{
              this.setState({ resources: this.props.resources});
            }
            this.props.dispatch(hideLoading());
            this.setState({loading:false});
        }

        if(this.props.location.state !== prevProps.location.state ){
             this.handler(this.props.location.state.type,this.props.location.state.keywords);
        }
    }

    handler = (type ,keywords) => {
        const { paginationResults } = this.state;
        const activePage=1;
        this.props.dispatch(searchResourceAction(type,keywords,activePage,paginationResults));
        this.props.dispatch(showLoading());
        this.setState({keywords:keywords,type:type});
    }

    /**
     * {All pagination handling Functions  }
    */
    handleFirst = () => {
        const activePage=1;
        const {type,keywords,paginationResults} = this.state;
        this.props.dispatch(searchResourceAction(type,keywords,activePage,paginationResults));
        this.props.dispatch(showLoading());
        setTimeout( () =>{this.props.dispatch(hideLoading()) }, 1500);
    }

    handlePrevious = () => {
      let {type,keywords,activePage,paginationResults} = this.state;
      
      if(activePage !== 1 ){
          activePage = activePage-1;
          this.props.dispatch(searchResourceAction(type,keywords,activePage,paginationResults));
          this.props.dispatch(showLoading());
          setTimeout( () =>{this.props.dispatch(hideLoading()) }, 1500);
      }
    }

    handleLast = () => {
      let {type,keywords,paginationResults,pageCount} = this.state;
       this.props.dispatch(searchResourceAction(type,keywords,pageCount,paginationResults));
       this.props.dispatch(showLoading());
      setTimeout( () =>{ this.props.dispatch(hideLoading())} , 1500);
    }

    handleNext = () => {
      let {type,keywords,activePage,paginationResults,pageCount} = this.setState;
      if(pageCount == activePage){

      }else{
        activePage=activePage+1;
       
        this.props.dispatch(searchResourceAction(type,keywords,activePage,paginationResults));
        this.props.dispatch(showLoading());
        setTimeout( () =>{this.props.dispatch(hideLoading())} , 1500);
      }
    }

    handlePageChange = (i) => {
      let {type,keywords,activePage,paginationResults,pageCount} = this.state;
      if(activePage != i ){
          activePage=i;
          this.props.dispatch(searchResourceAction(type,keywords,activePage,paginationResults));
      }
      this.props.dispatch(showLoading());
      setTimeout( () =>{this.props.dispatch(hideLoading())} , 1500);
    }
    


    /**
   * Renders the Modal and Close Modal
   *
   * @return { render and close modal }
   */
    handleOpenModal () {
      this.setState({ showModal: true });
    }
  
    handleCloseModal () {
      this.setState({ showModal: false });
    }

    openModal = (i) => {
      this.setState({modalResource:i});
      this.handleOpenModal();
    } 


    handlePreviousResourceInModal= () => {
      var {countResults , modalResource } = this.state;
       if(countResults != 0){
          this.setState({modalResource: modalResource-1 })
       } 
    } 
   
    handleNextResourceInModal = () => {
      var {countResults , modalResource } = this.state;
       if(countResults != modalResource+1){
          this.setState({modalResource: modalResource+1 })
       } 
    }
    
    handleDemo = (url) => {
     //if(url != null){
        window.open(url);   
     //}   
    } 

  /**
   * Renders the Searchbar & Resource Search Results{resources} 
   *
   * @return { renders Page Searchbar & Resources(All Type in Resource Comp) }
   */
  render () {
   
    const {resources,activePage,pageCount,countResults,paginationResultsc,modalResource} = this.state;
    
    const pagess = this.pages
    
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    console.log(resources);
    return (
      <span className="search-result-final-kk"> 
            
            <Row className="searhresultsec searhresulMode-view-kk">
             <Col md={12}> 
               <Searchbar handler={this.handler}  /><br/>
             </Col>
             
             <div className="loader-results">
                 <MoonLoader
                  size={150}
                  color={"#123abc"}
                  loading={this.state.loading}
                />
             </div>
                
             {/**
             * { filtering results belonging to activePage only}
             */}
            { resources !== undefined  && Array.isArray(resources) && resources.map((resource,i) => {
                
              
                   return <Resource openModal={ () => this.openModal(i)} resource={resource} key={i} position={i}  />
             
            })}
            
            { resources !== undefined  && !Array.isArray(resources) && Object.values(resources).map((resource , i) => {
                
              
                   return <Resource openModal={ () => this.openModal(i) } resource={resource} key={i} position={i}  />
             
            })}
           

          <Modal  
               isOpen={this.state.showModal}
               contentLabel="Minimal Modal Example"
               style={customStyles}
               closeTimeoutMS={500}
            >
            

            { resources !== undefined  && modalResource !== null && Array.isArray(resources) && resources.map((resource,i) => {

              if(modalResource === i ){

                  return <img src={ resource.searchable.uploaded_image_url  ?  (asset_url()+"/resources/images/medium/"+ (resource.searchable.uploaded_image_url))  :   ( resource.searchable.image ??    (asset_url()+"/resources/images/small/"+"not-found.png"  ))  }/>;
              }
            
            })}



            { resources !== undefined  && modalResource !== null && Array.isArray(resources) && resources.map((resource,i) => {

              if( modalResource == i && resource.searchable.demo_url != null ){
            
                  return <div className="col-md-12">
                  <Button className="demo-button rajaex-kk" variant="primary" onClick={() => this.handleDemo(resource.searchable.demo_url)}  >
                   
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" class="svg-inline--fa fa-external-link-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z">
                      </path>
                      </svg> Visit live link
                  </Button></div> 
              }
            })
            }   


            <br/>

            <span onClick={this.handlePreviousResourceInModal}>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z">
                  </path>
                  </svg>
            </span>


            <span onClick={this.handleNextResourceInModal}> 
              <svg aria-hidden="true" focusable="false" 
              data-prefix="fas" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14" 
              role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                </path>
              </svg>
            </span>

            <br/>

            <span onClick={this.handleCloseModal}>
                
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                  <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">  
              </path>
              </svg>
            </span>
                 
           </Modal>
           









           
          </Row>
          { resources == undefined && this.state.loading==false && <Row><Col md={3}></Col><Col lg={6} className="errormessage"><h1>Please enter keyword to search.</h1> <p>No Keywords</p></Col><Col md={3}></Col></Row> }
          { resources=='' && <Row><Col md={3}></Col><Col lg={6} className="errormessage"><h1>Sorry No Resource against keywords</h1> <p>404</p></Col><Col md={3}></Col></Row>}
          { resources != ''  && resources != undefined && resources != [] && <Row>
              
              <Col md={2}> </Col>
              <Col md={8} className="paginationcustome">
                { pageCount != '1' &&                       
                  <Pagination>
                    <Pagination.First onClick={this.handleFirst}/>
                    <Pagination.Prev  onClick={this.handlePrevious} />  
                    
                    {/**
                     * { dynamic page number generetation inside pagination }
                     */}
                     
                    { pagess !== undefined && pagess.map((object,i) => { 
                        if( (i > (parseInt(activePage)-5) &&  i < (parseInt(activePage)+5))){
                            return <Pagination.Item onClick={ () => this.handlePageChange(i)} active={activePage==i ? 'active' : null } key={i}>{i}</Pagination.Item> 
                        }                
                    })}

                    <Pagination.Next onClick={this.handleNext}/>
                    <Pagination.Last onClick={this.handleLast}>Last({pageCount})</Pagination.Last><span className="">{" (Records:"+countResults +")" }</span>
                  </Pagination> 
                 
                }

                
              </Col>
              <Col md={2}></Col>  

          </Row>
        }
      </span> 
    );
  }
}


 function mapStateToProps(state){
   return {  
        resources: state.resourceReducer.searchedResources, 
        activePage: state.resourceReducer.page_no,
        totalResults: state.resourceReducer.totalResults,
    }
 }

export default connect(mapStateToProps)(Search)
  

  