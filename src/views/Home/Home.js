import React, { Component } from 'react'
import './Home.css';
import {EPG_Data} from '../../constant/epg';
import ChannelRow from "../../components/ChannelRow/ChannelRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faStar} from '@fortawesome/free-solid-svg-icons';
export default class Home extends Component {
    state={
        widthPerMinute:0,
        EPG_Data : [],
        favIconSelected:false

    }
    EPG_Data_Backup = [];
    dayMap = {
        0 : "Sunday",
        1: "Monday",
        2:"Tuesday",
        3:"Wednesday",
        4:"Thursday",
        5:"Friday",
        6:"Saturday"
    }
    componentDidMount() {
        this.updateNeedle();
        this.timer = setInterval(this.updateNeedle, 60000);
        
        //Let's manipulate the schules of EPG data a bit to match with current date.
        //Also, we are adding different time intervals for schedules (30 minutes, 45 minutes etc).
        let timeInMilliSeconds = Date.now();
        const thirtyMinuteDifference = 1800000;
        const oneHourDifference = 3600000;
        const fifteenMinutesDifference = 900000;
        const fourtyFiveMinutesDifference = 2700000;
        const sevenMinute = 420000;
        let showTime=0;
        let additionFactor=0;

        let EPG_Data_Modified = EPG_Data;
        for(let i=0;i<EPG_Data_Modified.length;i++) {
            if(i===0 || i=== 5){
                showTime =  timeInMilliSeconds - ( 2 * oneHourDifference);
                additionFactor = thirtyMinuteDifference;
            }else if(i===2 || i===6){
                showTime =  timeInMilliSeconds - ( 2 * oneHourDifference);
                additionFactor = oneHourDifference+fifteenMinutesDifference;
            }
            else if(i===4 || i===8){
                showTime =  timeInMilliSeconds - ( 2 * oneHourDifference);
                additionFactor = fourtyFiveMinutesDifference + sevenMinute;
            }
            else{
                showTime =  timeInMilliSeconds - ( 2 * oneHourDifference);
                additionFactor = fourtyFiveMinutesDifference;
            }
            let item = EPG_Data_Modified[i];
            for(let j=0;j<item.schedules.length;j++){
                let show = item.schedules[j];
                show.start = showTime;
                showTime = showTime+additionFactor;
                show.end = showTime;
            }
        }
        this.setState({EPG_Data:EPG_Data_Modified});
    }
    updateNeedle = ()=>{
        const minute = new Date().getMinutes();
        const offest_left = document.getElementById("left-offset").offsetWidth;
        const availableWidth = document.getElementById("time-needle-wrapper").offsetWidth;
        const widthPerMinute = availableWidth / 60;
        this.setState({widthPerMinute});
        const margin_left = offest_left + (minute*widthPerMinute);
        document.getElementById("needle").style.left = margin_left+'px';
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    filterFavouriteChannels = ()=>{
        if(this.state.favIconSelected){
            this.setState({EPG_Data:this.EPG_Data_Backup,favIconSelected:false});
        }else{
            this.EPG_Data_Backup = this.state.EPG_Data;
            let temp=this.state.EPG_Data.filter((item)=>{
            if(item.favourite) {
               return true;
            }
        });
        this.setState({EPG_Data : temp,favIconSelected:true});
        }
        
    }
    render() {
        const hour_from = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit'})
        const hour_to = new Date((Date.now()+3600000)).toLocaleTimeString(navigator.language, {hour: '2-digit'})
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDay();
        const year=new Date().getFullYear();
        let dateArray=[];
        for(let i=(date-3);i<=(date+3);i++){
            dateArray.push(i)
        }
       
        return (
            <div className=" position-relative row home-wrapper">
                
                <div className="col-md-12 info-bar-wrapper">
                    <div className="date-nav row">
                        <div className="col-md-2 col-2 text-center">
                            <span className={"favourite-icon "+(this.state.favIconSelected?'favColor':'')} title="Favourites" onClick={this.filterFavouriteChannels}>
                                <FontAwesomeIcon icon={faStar}/>
                            </span>
                        </div>
                        <div className="col-md-10 col-10 date-range-wrapper">
                                {
                                    dateArray.map((item,index)=>{
                                        const dateString=month+'/'+item+'/'+year;
                                        const dateObj=new Date(dateString);
                                        const day= dateObj.getDay();
                                        return (
                                            <span key={index} className={"date-item "+(item===date?"highlight":"")}>
                                                <span >{item}-{month}</span>
                                                <br></br>
                                                <span>{this.dayMap[day]}</span>
                                            </span>
                                            

                                        )
                                    })
                                }
                        </div>
                    </div> 
                    <div className="row hour-range">
                        <div className="col-md-2" id="left-offset"></div>
                        <div className="col-md-10" id="time-needle-wrapper">
                            <div className="time-needle" id="needle"></div>
                                <span className="fl">{hour_from}</span>
                                <span className="fr">{hour_to}</span>
                        </div>
                    </div>
                </div>
               
                <div className="col-md-12">
                <div className="row channel-wrapper">
                    <div className="col-md-12">
                        {
                            this.state.EPG_Data.map((item,index)=>{
                                return (
                                    <ChannelRow widthPerMinute={this.state.widthPerMinute} dataSource={item} key={index}/>
                                )
                            })
                        }
                    </div>                  
                </div>
                </div>
                <div className="footer-section">

                </div>
                
            </div>
        )
    }
}
