import React ,{useState , useEffect ,Component , Fragmnent} from 'react';
import {Button ,Container ,Row,Col,Card,Image,Badge} from 'react-bootstrap';
import {Link, Redirect ,useHistory} from "react-router-dom"
import { connect } from 'react-redux'
import queryString from 'query-string'
import axios from 'axios';
import './../searchsingle/searchsingle.css';
import searchresult from '../../assets/img/searchresult.jpg'; 
import { Player , ControlBar } from 'video-react'
import moment from "moment"
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHome , faDownload ,faExternal} from "@fortawesome/free-solid-svg-icons";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Reactmodal from 'react-modal';

class Modal extends Component{

  constructor(props) {
        
        super(props);
        this.state = {
            resource:'',
            redirect:null,
        };

        
       
  }

  componentDidMount() {
      this.setState({ resource : this.props.resource });
  }

  

  redirectToSearch = (keywords) => {
      
      return {
        pathname:"/search",
        search:"",
        state: {
          type: (this.state.resource?.category?.id ?? "1"),
          keywords: keywords
        }
      }

  }

   

  handleDownload = (resource) => {
      //window.open(app_url+"/site/file/download/"+downloadableType+"/"+downloadableId);
      console.log(resource);
      
      var resourceType = resource.category?.title;
      var url=""; 
      
      if(resource.sourceable_download_link != "" && resource.sourceable_downloaded == 1 ){
            url = app_url+"/site/sourceable/download/"+resource.id;
      }else if(resourceType == 'image-photo' || resourceType == 'image-vector' || resourceType == 'image-illustration' ){
          var downloadable_type  = "image";
          url = app_url+"/site/file/download/"+downloadableType+"/"+resource.resource.images[0].id;
      }
      
      if( resource.resource?.downloads){
        resource.resource.downloads = resource.resource.downloads+1;
        this.setState({resource:resource});
      }
      
      window.open(url);
  } 
  
  handleDemo = (url) => {
     
     //if(url != null){
        window.open(url);   
     //} 
      
  } 
  
   
 
  render () {

    if(this.state.redirect){
      return <Redirect push to={this.state.redirect}/>
    }

    const resource = this.state.resource?.resource;
    console.log(resource);
    if( resource == '' || resource == undefined){
        return (
            <div className="singleresultfile">  
                <h2>Any Error</h2>
              
             </div> 
        );
    }else{

    const resourceType = resource.category?.title;
      
    return (
     
     <ReactModal 


     > 
     <div className="singleresultfile">  
          
          <Container>

          <br/>

          <Row className="searhresultsingle">
             
              <Col lg={8} className="searhresultsingleimg">
                
                  
                  {  
                      (resourceType == "animation" || resourceType == "Video")  && <Player  autoPlay={true} poster={resource.images?.[0]?.url  ?  (asset_url()+"/resources/images/medium/"+ ( resource.images?.[0]?.url))  : resource.image }>
                        <source src={ resource.files?.[0]?.url ?  (asset_url()+"/resources/files/"+(resource.files?.[0]?.url) ) : resource.preview_video_url } />
                        <ControlBar autoHide={false} />
                      </Player>
                  }
                 
                
                  {
                  (resourceType == "logo" && resourceType == "web-design" || resourceType == "" || resourceType == "app-design" || resourceType == "art-illustration" )  &&  
                    <Image src={ resource.images?.[0]?.url  ?  (asset_url()+"/resources/images/medium/"+ ( resource.images?.[0]?.url))  :   ( resource.image ??    (asset_url()+"/resources/images/medium/"+"not-found.png"  ))} rounded />
                  }
                  
                  
                  { 
                    ( (resourceType == "web-design") 
                      && resource.demo_url   != null ) && <div className="col-md-12"><Button className="demo-button rajaex-kk" variant="primary" onClick={() => this.handleDemo(resource.demo_url)}  >Demo<FontAwesomeIcon icon={faEye} /></Button></div> 
                  }
              
              </Col>


              <Col lg={4}  className="badgemain">

              <h2>{"App Description"}</h2>
              <span className="keyworsdiv">
              <hr/>
                   { resource.keywords != undefined  && 
                        resource.keywords.map((keyword,i) => {
                             if(i >= 5){
                                 return ""
                             }    
                             return <Link to={() => this.redirectToSearch(keyword) } key={keyword}>
                              <span className="badge label-info"  ><h3><Badge variant="secondary">{keyword}</Badge></h3>  </span></Link>
                        })
                    }   
                 </span>
                   
                <hr/>
                <span className="photodis"> 
                  {/*<p><strong>Largest Size: </strong>Lorem Ipsum is simply dummy text</p>*/}
                  <p><strong>Photo ID: </strong>{'RS-100-'+resource.id}</p>
                  <p><strong>Created Date: </strong>{moment(resource.created_at).format("dddd, MMMM Do YYYY")}</p>
                </span>

                   <div className="numofdownloads"> 
                    <p><strong>Visit AppStore</strong></p>
                   </div>
                   <div className="numofdownloads"> 
                    <p><strong>Visit PlayStore</strong></p>
                   </div>
                   {/* ( (resourceType == "image-photo" || resourceType == "image-vector" || resourceType == "image-illustration")  
                                && resource.images !=[] ) && <Button variant="primary" onClick={() => this.handleDownload(resource)}>Download Now <FontAwesomeIcon icon={faDownload} /></Button> }
                   { ( (resourceType != "image-photo" && resourceType != "image-vector" && resourceType != "image-illustration") 
                                && resource.files   !=[] ) && <Button variant="primary" onClick={() => this.handleDownload(resource)}  >Download Now <FontAwesomeIcon icon={faDownload} /></Button> */}
                   
              </Col>



              </Row>

             
         </Container>
                 
      </div> 

      </ReactModal>
    );
  }
  }
}

const mapStateToProps = (state) => {
  return ""
}



export default connect(mapStateToProps)(Searchsingle);


 {/*
                  <Carousel>
                        <div>
                            <img src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src="http://react-responsive-carousel.js.org/assets/3.jpeg" />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src="http://react-responsive-carousel.js.org/assets/5.jpeg" />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>
                  */}