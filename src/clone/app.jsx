import React, {Component} from "react";
import "./app.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisVertical,faMessage} from "@fortawesome/free-solid-svg-icons";
import SideBarCom from "./sidebar";
import ChatRightPanel from "./rightCom";


import ManImg from "../img/man.jpg";
import Ankita from "../img/ankita.png";
import Anna from "../img/anna.png";
import Bob from "../img/bob.png";
import Jack from "../img/jack.jpg";
import Smith from "../img/smith.png";
class MainWhatsApp extends Component{

    state = {
        users : [
            // {img:"https://www.pngitem.com/pimgs/m/50-503554_business-girl-png-business-woman-images-png-transparent.png", names:"Anna",msgArr:[],lastMsg:''},

            // {img:"https://pngimg.com/uploads/thinking_man/thinking_man_PNG11613.png", 
            //      names:"Smith", msgArr:[], lastMsg:''},
            // {img:"https://freerangestock.com/sample/127694/indian-man-.jpg", names:"Jack",msgArr:[], lastMsg:''},

            // {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQApNrapgj2zujVlrPz3VS7JcX3JAQXx3pNg79Ft8mKWIzgmbGrULGw2PYbQcvtuEkajPQ&usqp=CAU", 
            // names:"Dolly",msgArr:[], lastMsg:''},

            // {img:"https://png.pngitem.com/pimgs/s/179-1796406_thinking-man-download-transparent-png-image-man-thinking.png", names:"Bob",msgArr:[], lastMsg:''},

            // {img:"https://files.oyebesmartest.com/uploads/large/indian-girl-png-transpak6ktt.png", names:"Ankita",msgArr:[], lastMsg:''},



            {img:Anna, names:"Anna",  msgArr:[], lastMsg:'', response:[]},
            {img:Ankita, names:"Ankita",  msgArr:[], lastMsg:'', response:[]},
            {img:Bob, names:"Bob",  msgArr:[], lastMsg:'', response:[]},
            {img:Jack, names:"Jack",  msgArr:[], lastMsg:'', response:[]},
            {img:Smith, names:"Smith",  msgArr:[], lastMsg:'', response:[]},
            {img:ManImg, names:"Amit",  msgArr:[], lastMsg:'', response:[]},
        ],
        searchUser:{search:''},
        notFound:0,
        
        date : '',
        sendMsg:0,
        curIndex:-1,
        currentUser:'',
        chatUser:{},
        sendMsgArr :[],
        time:'',

        localArr : [],
        chatLst : [],
        mode : 'online'
    } 

    componentDidMount(){
        let s = {...this.state}
        const currDate= new Date().toLocaleDateString();
        s.date = currDate;
        s.chatLst= JSON.parse(localStorage.getItem('userChat'));
        s.users.map((obj) =>(
            s.chatLst.filter((obj1) =>{
                if(obj.names=== obj1.names){
                    obj.lastMsg=obj1.lastMsg;
                    obj.msgArr.push(obj1.msgArr);
                }
            })
        )) 
        // console.log(s.chatLst)
        this.setState(s)
    }
    
    
    handleContact = (index) => {
        let s = {...this.state};
        s.curIndex=index;
        s.chatUser=s.users[index];
        s.sendMsg=1;
        this.setState(s);
    }

    messageHandle = (mess) =>{
        let s = {...this.state};
        
        let data = mess;
        let chat = {};
        const current = new Date();
        const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        // hour12: false
        });
        let arr = [];
        let findname = s.chatUser.names;
        s.users.find((num)=>
            {   
                if(data.message!=='')
                { 
                    if(num.names===findname)
                    {
                        if(data.message.match(/[a-zA-Z!@#$^_=]/g))
                        {
                            num.lastMsg=data.message;
                            let res = {ans:'', res:'I did not understand the problem.', 
                                        ques:data.message};
                            num.response.push(res)
                            num.msgArr.push(data.message);
                            arr.push(res)
                            chat = {names:findname,lastMsg:data.message, msgArr:num.msgArr,
                                response:arr, time:time}
                        }
                        else
                        {   
                            let results = eval(data.message);
                            num.lastMsg=data.message;
                            let res = {ans:results, res:'Give me another problem.',
                                        ques:data.message};
                            num.response.push(res)
                            num.msgArr.push(data.message);
                            arr.push(res)
                            chat = {names:findname,lastMsg:data.message, msgArr:num.msgArr,
                                response:arr,time:time}
                        }
                    }
                }
            });
        
        s.chatLst.push(chat);           
        localStorage.setItem('users', JSON.stringify(s.users));
        localStorage.setItem('userChat', JSON.stringify(s.chatLst));
        
        console.log(s.chatLst);
        this.setState(s);
    }
    
    hendleSearch = (e) =>{
        let s = {...this.state};
        s.searchUser[e.currentTarget.name]= e.currentTarget.value;
        this.setState(s)
    }


    render() {
        let  {users,date,sendMsg,chatUser,sendMsgArr,searchUser} = this.state;
        let {search} = searchUser;
        return(
            <div className="App">
                <div className="app_body">
                    <div className=" leftPanel">
                        <div className="profile">
                            <img src={require('../img/proimg.webp')} alt="Profile" />
                                <span className="newChat">
                                    <FontAwesomeIcon icon={faMessage} 
                                    style={{opacity:'0.6', fontSize:'20px'}}/>
                                    <span className="menuIcon">
                                    <FontAwesomeIcon icon={faEllipsisVertical} 
                                    style={{opacity:'0.6', fontSize:'20px'}}/>
                                    </span>
                                </span>
                        </div>
                        <div className="search">
                            <input type="text" 
                            placeholder="Search or start new chat"
                            name="search" 
                            value="Search"
                            onChange={this.hendleSearch}
                            />
                        </div>
                       
                        {users.map((u,index)=>{
                            return (
                                <React.Fragment>
                                <div className="userList">
                                <SideBarCom user={u} 
                                key={u.names}
                                date={date}
                                curIndex={index}
                                handleContact={this.handleContact}/>
                                </div>
                                </React.Fragment>
                            )
                        })}

                    </div>
                        <ChatRightPanel 
                        sendMsg={sendMsg} 
                        chatUser={chatUser}
                        users = {users}
                        sendMsgArr={sendMsgArr}
                        onSubmit={this.messageHandle}
                        />
                </div>
            </div>
        )
    }
}
export default MainWhatsApp;