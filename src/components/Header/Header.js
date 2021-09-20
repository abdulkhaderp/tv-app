import React, { Component } from 'react'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faUserCircle,faSearch} from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
    render() {
        return (
            <header className="header row">
                <React.Fragment>
                    <div className="col-md-4 col-4 text-left fh">
                        <span className="profile-logo"><FontAwesomeIcon icon={faUserCircle}/></span>
                    </div>
                    <div className="col-md-4 col-4 text-center fh">
                        <div className="brand-logo"></div>
                    </div>
                    <div className="col-md-4 col-4 text-right fh">
                     {/* <div className="search">
                             <FontAwesomeIcon icon={faSearch}/>
                             <input type="text" className="form-control" placeholder="Have a question? Ask Now"/> 
                    </div> */}

        <div className="col-md-5 text-right mt-3">
            <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" readOnly={true} type="search" value="Search.." id="example-search-input"/>
                <span className="input-group-append">
                    <button className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5" type="button">
                    <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </span>
            </div>
        </div>

                    </div>
                </React.Fragment>
              

            </header>
        )
    }
}
