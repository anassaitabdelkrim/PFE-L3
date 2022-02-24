import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VisiteurNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleDeconnecterButton = () => {
        sessionStorage.removeItem("idClient");
        window.open(`/`, '_self');
    }

    render() {
        return (
            <div className="VisiteurNavbar">
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col--md-3 col-sm-3 col-xs-3">
                                <Link to="/" id="logo">
                                    <img src="style/img/logo.png" width="190" height="23" alt="" data-retina="true" style={{height: "50px"}} />
                                </Link>
                            </div>
                            <nav className="col--md-9 col-sm-9 col-xs-9">
                                <button className="cmn-toggle-switch cmn-toggle-switch__htx open_close">
                                    <span>Menu mobile</span>
                                </button>
                                <ul id="lang_top" style={{marginTop: "20px"}}>
                                    {
                                        sessionStorage.getItem("idClient") === null &&
                                        <li>
                                            <Link to="/Connexion">Se connecter / S'inscrire</Link>
                                        </li>
                                    }
                                    {
                                        sessionStorage.getItem("idClient") !== null &&
                                        <li onClick={() => { this.handleDeconnecterButton(); }}>
                                            Se deconnecter
                                            </li>
                                    }
                                </ul>
                                <div className="main-menu">
                                    <div id="header_menu">
                                        <img src="style/img/logo.png" width="141" height="40" alt="" data-retina="true" />
                                    </div>
                                    <button className="open_close" id="close_in">
                                        <i className="icon_set_1_icon-77"></i>
                                    </button>
                                    <ul style={{paddingTop: "10px"}}>
                                        <li>
                                            <Link to="/">Accueil</Link>
                                        </li>
                                        {
                                            sessionStorage.getItem("idClient") !== null &&
                                            <li>
                                                <Link to="/Client">Mes reservations</Link>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default VisiteurNavbar;
