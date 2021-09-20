import React, { Component } from 'react';
import './ChannelRow.css';
import {EPG_Data} from '../../constant/epg';
import Popup from '../Popup/Popup';

export default class ChannelRow extends Component {
    state={
        show :false,
        popUpInfo:{},
        dataSource:{}
    }
    componentDidMount() {
       
        this.timer = setInterval(this.initiateScroll, 60000);
        this.initiateScroll();
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    
    initiateScroll = ()=>{
        const ulCollection = document.getElementsByClassName("schedule-list");
        for(let i=0;i<ulCollection.length;i++){
            this.scrollLiToCurrentShows(ulCollection[i]);
        }
    }

    scrollLiToCurrentShows=(ul)=>{
        const nodes = ul.children || [];
        let offset_scroll=0;
        let elapsed_minutes=0;
        for(let i=0;i<nodes.length;i++){
            if(nodes[i].attributes.data.value == 1){
                offset_scroll = nodes[i].offsetLeft;
                const start_time = nodes[i].attributes.start.value;
                let diff=0;
                if(start_time < Date.now()){
                     diff = Math.abs(start_time - Date.now());
                }
                elapsed_minutes = (diff/1000)/60;
                break;
            }
        }
        const current_minute = (new Date().getMinutes())*this.props.widthPerMinute;
        ul.scrollLeft = offset_scroll + (elapsed_minutes * this.props.widthPerMinute) - (current_minute);
    }
    openDetails =(item,dataSource)=>{
        this.setState({show:true,popUpInfo:item,dataSource});
    }
    handleClose =()=>{
        this.setState({show:false});
    }
    render() {
        const {dataSource} = this.props;
        const currentHour  = new Date().getHours();
        const name = dataSource.images.LOGO;
        const schedules = dataSource.schedules; 
        const path = require('../../assets/'+name).default;
        let scrollLeft=0;
        var divStyle = {
            backgroundImage: 'url(' + path + ')'
            
        }
        return (
            <div className="row single-channel-wrapper">
                <div className="col-md-2 channel-logo-col col-3">
                    {/* <img  src={path} height="50" width="50" alt="Logo" className="channel-logo"/> */}
                    <div className="logo-container" style={divStyle}></div>
                </div>
                <div className="col-md-10 position-relative col-9">
                <Popup show={this.state.show} handleClose={this.handleClose} popUpInfo={this.state.popUpInfo} dataSource={this.state.dataSource}/>

                    <ul className="schedule-list" id="li-item">
                        {schedules.map((item,index)=>{
                            let show = 0;
                            const timestamp_begin = new Date(item.start);
                            const timestamp_end = new Date(item.end);
                            const timestamp_current = Date.now();
                            if(timestamp_current >= item.start && timestamp_current <= item.end){
                                show = 1;
                            }
                            const diffInMinutes = ((Math.abs(item.end - item.start)/1000)/60);
                            const width = diffInMinutes * this.props.widthPerMinute;
                            return (
                                <li key={index} style={{width:width}} data={show} start={item.start} onClick={()=>this.openDetails(item,dataSource)}>
                                    <div>
                                        <div className="show-title">{item.title}</div>
                                        <div className="show-time">{timestamp_begin.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} - 
                                        {timestamp_end.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
