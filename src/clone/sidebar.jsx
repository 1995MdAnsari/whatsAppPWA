import React, {Component} from "react";
import "./sidebarStyle.css"
class SideBarCom extends Component{

    render() {
    const  {user,date,curIndex,handleContact} = this.props;
    const {img, names,lastMsg,msgArr} = user;
    // let count = user.msgArr.length;
    // console.log(count)
    // const userData1 = localStorage.getItem('userChat');
    // const userData2= JSON.parse(userData1);
    // let count = userData2.msgArr.length;

        return(
            <button className="details"
                onClick={()=>{handleContact(curIndex)}}>
                <div className="contactItem">
                    <div className="profileImg">
                        <img src={img} alt="image"/>
                    </div>
                     <div className="names">
                        <div className="userName">{names}</div><br/>
                        <span className="lastMsg">{lastMsg}</span>    
                    </div> 
                </div>
                <div className="date">{date}
                    <div className="seenMsg"><p>{msgArr.length}</p></div>
                </div>
            </button>
        )
    }
}
export default SideBarCom;