import './App.css';
import { Component } from 'react';

//img icon
import FacebookIcon from './img/icons/facebook.png';
import TwitterIcon from './img/icons/twitter.png';
import LinkedInIcon from './img/icons/linkedin.png';
import GithubIcon from './img/icons/github.png'; 

import img from './img/wash.gif';



const cashArray = [
  {currancy:2000,amount:0},
  {currancy:500,amount:0},
  {currancy:200,amount:0},
  {currancy:100,amount:0},
  {currancy:50,amount:0},
  {currancy:20,amount:0},
  {currancy:10,amount:0},
  {currancy:5,amount:0},
  {currancy:2,amount:0},
  {currancy:1,amount:0}
]

class App extends Component{

  constructor(props){
     super(props);
     this.state = {
       billamount:0,
       cashgiven:0,
       showtable:false,
       openDialogbox:false,
       ArrayOfCash:cashArray,
     }
  }
  

  onhandleBillAmountChange=(e)=>{
     this.setState({ billamount:e.target.value , ArrayOfCash:cashArray})
  }

  onhandleCashGivenChange=(e)=>{
      this.setState({ cashgiven:e.target.value , ArrayOfCash:cashArray})
  }

  remainingAmount=()=>{
     var amount_1 = this.state.cashgiven - this.state.billamount;
     var ArrayOfCash = this.state.ArrayOfCash;
     const notesCount = [];

          for (let val of ArrayOfCash) { 

               if(amount_1>=val.currancy){
                notesCount.push(Math.floor(amount_1/val.currancy));
                   amount_1 = amount_1%val.currancy;
               }else{
                notesCount.push(0);
               }
          }

          const newArrayObj = this.state.ArrayOfCash.reduce((acc, current, index) => {
            return acc.concat({...current, amount: notesCount[index]}); 
        }, []); 


        this.setState({ArrayOfCash:newArrayObj,showtable:true});

  }

  calculateamount=()=>{
    if(parseInt(this.state.billamount)> parseInt(this.state.cashgiven)){
      // console.log("wash wash wash")
      this.setState({showtable:false,openDialogbox:true})
    }else{
      this.remainingAmount();
    }
  }

  handleCloseDialogBox =(e)=>{
    this.setState({openDialogbox:false,cashgiven:0})
  }


  DialogBoxrender=()=>{
 
    return(
      this.state.openDialogbox ?
      <div>  
         <dialog id="myFirstDialog" style={{width:'50%',backgroundColor:'#F4FFEF',border:'1px dotted black',zIndex:'2',top:'13%'}} open>  
          <center> <p><q> Alert!!! Do you want wash plates? </q> </p>  </center>
          <img src={img} alt="wash plate" style={{width:'100%'}}/> <br/>
          <button id="hide" onClick={this.handleCloseDialogBox} style={{float:'right'}}> Close </button>  
          </dialog>  
      </div> : null
    )
  }


  DisplayResultrender=()=>{
    return(
      this.state.showtable ?
      <table style={{width:'100%',height:'100%',border:'1px solid #dddddd'}}>
        <tbody style={{border:'1px solid #dddddd'}}>
          <tr style={{border:'1px solid #dddddd'}}>
            {
              this.state.ArrayOfCash.map((item,index)=>{
                return ( <td key={index}>{item.currancy} </td>)
              })
            }
          </tr>
          <tr style={{border:'1px solid #dddddd'}}>
            {
              this.state.ArrayOfCash.map((item,index)=>{
               
                return(  item.amount>0  ? <td key={index} style={{color:'red',border:'1px solid #dddddd'}}>{item.amount} </td> : 
                                         <td key={index} style={{border:'1px solid #dddddd'}}>{item.amount} </td> )
              })
            }
          </tr>
        </tbody>
    </table> : null
      
    )
  }

  HOMErender=()=>{
    return(
      <div className="App">
                <div className="cashregister_heading"> Cash Register Manager </div>
                <div className="cashregister_subtext"> Enter the bill amount and cash given by the customer and know minimum number of notes to return.</div>
                <div className="cashregister_billtext">
                      <input type="number" placeholder="Enter bill amount"  value={this.state.billamount?this.state.billamount:""} onChange={this.onhandleBillAmountChange} style={{width:'20%',height:'5vh'}} />
                     <br/>
                     {this.state.billamount <= -1 ? <small style={{color:'red'}}>positive number only</small> : ""}
                </div>
                { this.state.billamount && this.state.billamount>=0?
                <div className="cashregister_cashtext">
                    <input type="number" placeholder="Enter cash amount" value={this.state.cashgiven?this.state.cashgiven:""} onChange={this.onhandleCashGivenChange} style={{width:'20%',height:'5vh'}} />
                    <br/>
                   {this.state.cashgiven <= -1 ? <small style={{color:'red'}}>positive number only</small> : ""}
                </div> : null
                }

                {this.state.cashgiven && this.state.cashgiven>=0 && this.state.billamount && this.state.billamount>=0?
                <div className="cashregister_button">
                  <button  onClick={this.calculateamount} className="button1" style={{width:'20%',height:'5vh',border:'2px solid rgba(0, 128, 255, 0.5)'}}> Calculate </button>
                </div>:null
                }
            <div style={{paddingTop:'4%'}}> 
                
                { this.state.cashgiven && this.state.cashgiven>=0 && this.state.billamount && this.state.billamount>=0?
                this.DisplayResultrender() : ""
                } 
            </div>
      </div>
    )
  }

  render(){
    return(
      <div className="container-cashregister">
      <div className="background-cashregister">
        <div style={{width:'-webkit-fill-available',position:'fixed'}}>
            <div className="menu__logoSpace"> 
                <a href="/" className="menu__logo"> Creator Space </a>
            </div>
            <div className="menu__socialItems">
                  <a className="menu__socialLink" target="_blank" href='https://www.facebook.com/chanchal.panpaliya'> 
                    <span className="menu__socialIcon">
                      <img style={{width:'8%',paddingTop:'2%'}} src={FacebookIcon} alt="facebooklink"/>
                    </span>
                  </a> <br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://twitter.com/CPanpaliya'> 
                     <span className="menu__socialIcon">
                        <img style={{width:'8%',paddingTop:'2%'}} src={TwitterIcon} alt="twitterlink"/>
                     </span>
                  </a><br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://www.linkedin.com/in/chanchal-panpaliya-0b0436112'> 
                    <span className="menu__socialIcon">
                       <img style={{width:'8%',paddingTop:'2%'}} src={LinkedInIcon} alt="linkedinlink"/>
                      </span>
                  </a> <br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://github.com/chanchal-panpaliya'> 
                    <span className="menu__socialIcon">
                      <img style={{width:'8%',paddingTop:'2%'}} src={GithubIcon} alt="githublink"/>
                    </span>
                </a>
              </div>
        </div>
      </div>
      <div className="body-frame-cashregister">
        {this.HOMErender()}
      </div> 
      {this.DialogBoxrender()}
  </div>
    )
  }

}

export default App;
