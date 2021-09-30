import './App.css';
import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import  Button  from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  Facebook  from '@material-ui/icons/Facebook';
import  Twitter  from '@material-ui/icons/Twitter';
import  LinkedIn  from '@material-ui/icons/LinkedIn';
import  GitHub  from '@material-ui/icons/GitHub';

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
     this.setState({ billamount:e.target.value })
  }

  onhandleCashGivenChange=(e)=>{
      this.setState({ cashgiven:e.target.value })
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
      <Dialog
      open={this.state.openDialogbox}
      onClose={this.handleCloseDialogBox}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Alert!!! Do you want wash plates?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
            <img src={img} alt="wash plate"/>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={this.handleCloseDialogBox} color="primary" autoFocus>
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
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
                      <TextField type="number" label="Enter bill amount" variant="filled" value={this.state.billamount?this.state.billamount:""} onChange={this.onhandleBillAmountChange} 
                      error={this.state.billamount <= -1} helperText={ this.state.billamount <= -1 ? 'positive number only' : '' }/>
                </div>
                { this.state.billamount && this.state.billamount>=0?
                <div className="cashregister_cashtext">
                    <TextField type="number" label="Enter cash amount" variant="filled" value={this.state.cashgiven?this.state.cashgiven:""} onChange={this.onhandleCashGivenChange}
                    error={this.state.cashgiven <= -1} helperText={ this.state.cashgiven <= -1 ? 'positive number only' : '' }/>
                </div> : null
                }

                {this.state.cashgiven && this.state.cashgiven>=0?
                <div className="cashregister_button">
                  <Button variant="contained" color="primary" onClick={this.calculateamount}> Calculate </Button>
                </div>:null
                }
            <div style={{paddingTop:'4%'}}> 
                {this.DisplayResultrender()} 
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
                      <Facebook  style={{color:'grey'}}/>
                    </span>
                  </a> <br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://twitter.com/CPanpaliya'> 
                     <span className="menu__socialIcon">
                        <Twitter style={{color:'grey'}}/>
                     </span>
                  </a><br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://www.linkedin.com/in/chanchal-panpaliya-0b0436112'> 
                    <span className="menu__socialIcon">
                      <LinkedIn style={{color:'grey'}}/> 
                      </span>
                  </a> <br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://github.com/chanchal-panpaliya'> 
                    <span className="menu__socialIcon">
                      <GitHub style={{color:'grey'}}/>
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
