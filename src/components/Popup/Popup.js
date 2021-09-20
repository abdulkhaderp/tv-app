import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap';
import './Popup.css';
export default class Popup extends Component {

  render() {
     const {popUpInfo,dataSource} = this.props;
    return (
      <div>
        <Modal centered
          show={this.props.show}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>{popUpInfo.title}
            <span>{"       -   " +new Date(popUpInfo.start).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} : {new Date(popUpInfo.end).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
            </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Watch In : <span><b>{dataSource.title}</b></span></span>
            <div className="row">
              <div className="col-6">
                <div className="programPoster"></div>
              </div>
              <div className="col-6">
<p>Friends is an American television sitcom created by David Crane and Marta Kauffman, which aired on NBC from September 22, 1994, to May 6, 2004, lasting ten seasons. With an ensemble cast starring Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc, Matthew Perry and David Schwimmer, the show revolves around six friends in their 20s and 30s who live in Manhattan, New York City.  
            </p></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}






