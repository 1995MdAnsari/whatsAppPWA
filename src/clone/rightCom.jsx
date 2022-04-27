import React, { Component }  from "react";
import "./chatStyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophone,faSmile,faPaperclip,faLaptop} from "@fortawesome/free-solid-svg-icons";


class ChatRightPanel extends Component{

    state = {
        messageData : {message:''},
        showMsg : '',
    }

    handleChange = (e) =>{
        let s = {...this.state};
        s.messageData[e.currentTarget.name]= e.currentTarget.value;
        this.setState(s);
    }

    submitHandle = (e) =>{
        let s = {...this.state};
        e.preventDefault();
        this.props.onSubmit(this.state.messageData);
        s.messageData.message = '';
        this.setState(s)  
    }


    render() {        
        const {sendMsg,chatUser,users} = this.props;
        const {img,names} = chatUser;
        let { messageData} = this.state;
        let {message} = messageData;
        // let userData=users.filter((n)=>n.names===chatUser.names);
        const userData1 = localStorage.getItem('userChat');
        const userData2= JSON.parse(userData1);
        const userData=userData2.filter((n)=>n.names===chatUser.names);
        const current = new Date();
        const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        // hour12: false
        });
        
        
        return(
            <React.Fragment>
            {sendMsg===0 ?
                <div className="data">
                    <img src={require('../img/welcome.jpeg')} alt="connected" />
                    <p className="para1">Keep your phone connected</p>
                    <p className="para2">WhatsApp connected to your phone to sync message. To reduce data usage, connect your phone to Wi-Fi.</p>
                    <hr />
                    <p className="para3">
                    <FontAwesomeIcon icon={faLaptop} style={{'padding-right':'3px',opacity:'0.7'}}/>
                    Make calls from desktop with WhatsApp for Windows. Get it here.</p>
                </div>
                
            : 
            <div className="chat">
                <div className="chat_header">
                    <img src={img} alt="Image"/>

                    <div className="userNames">
                        <div className="chatUserName">{names}</div>
                        <span className="lastSeen">
                        last seen at {time}</span>
                    </div>
                    <div className="icons">
                        <div className="rightIcons">
                                
                        </div>
                    </div>
                </div>

                <div className="chat_body">

                    {userData.map((num)=>(
                        
                        num.response.map((m) =>(
                            <React.Fragment>
                                <div className="showMsg">
                                <div className="chat_user">
                                    <p className="chat_msg">
                                        {m.ques}
                                        <span className="chat_time">{time}</span>
                                    </p>
                                </div>

                                <div className="chat_server">
                                    {m.ans ==='' ?
                                    <p className="chat_res">
                                        {m.res}
                                        <span className="chat_time">{time}</span>
                                    </p> 
                                    :
                                    
                                    <React.Fragment>
                                    <span className="chat_res">
                                        {m.ans}
                                        <span className="chat_time">{time}</span>
                                    </span>
                                    
                                    <p className="chat_res">
                                        {m.res}
                                        <span className="chat_time">{time}</span>
                                    </p>
                                    </React.Fragment>
                                    }
                                </div>
                                </div>
                            </React.Fragment>
                        ))
                        
                    ))}  
                </div>

                <div className="chat_footer">
                    <div className="icon">
                        {/* <img src={require('../img/emoji.png')}/> */}
                    <FontAwesomeIcon icon={faSmile} 
                    style={{opacity:"0.5",cursor: "pointer", fontSize:'20px'}}/>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon 
                        style={{opacity:"0.5",cursor: "pointer"}}
                        icon={faPaperclip}
                        />
                    </div>

                    <form onSubmit={this.submitHandle}>
                        <input 
                        type="text"
                        name="message"
                        value={message}
                        placeholder="Type a message"
                        onChange={this.handleChange}
                        />
                                    
                    </form>

                
                    <div className="icon">
                        <FontAwesomeIcon 
                        style={{opacity:"0.5",cursor: "pointer"}}
                        icon={faMicrophone} />
                    </div>
                </div>

            </div>

            }
            </React.Fragment>
        )
    }
}
export default ChatRightPanel;