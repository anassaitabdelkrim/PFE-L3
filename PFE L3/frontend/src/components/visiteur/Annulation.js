import React, { Component } from 'react';
import axios from 'axios';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";

class Annulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailClient: ''
        }
    }

    componentDidMount = () => {
    }

    handleEmailClientInputChange = (event) => {
        this.setState({
            emailClient: event.target.value
        });
    }

    handleAnnulerButton = () => {
        axios.get(`http://localhost:5000/Client/Email/${sessionStorage.getItem("idClient")}/${this.state.emailClient}`).then(result => {
            if (result.data.length !== 0) {
                axios.put(`http://localhost:5000/Reservation/Annuler/${this.props.match.params.idReservation}`).then(result2 => {
                    this.props.history.push('/Client');
                }).catch(err2 => console.log(err2));
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="Annulation">
                <VisiteurNavbar />

                <div className="container margin_60_35">
                    <br /><br /><br /><br />
                    <h2 className="main_title"><em></em>Annuler votre reservation</h2>
                    <div className="row add_top_20">
                        <div className="col-md-8 col-md-offset-4">
                            <div id="message-contact"></div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Numero de reservation</label>
                                            <input type="text" value={this.props.match.params.idReservation} className="form-control" name="idReservation" placeholder="Numero de reservation" disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" value={this.state.emailClient} onChange={this.handleEmailClientInputChange} className="form-control" name="emailClient" placeholder="email@gmail.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row add_bottom_30">
                                    <div className="col-md-6" style={{ textAlign: "center" }}>
                                        <input type="submit" onClick={this.handleAnnulerButton} value="Confirmer" className="btn_1" />
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>

                <VisiteurFooter />
            </div>
        )
    }

}

export default Annulation;
