import React, { Component } from 'react';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";

class Visiteur extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nomVille: '',
            dateResevation: ''
        };
    }

    handleNomVilleInputChange = (event) => {
        this.setState({
            nomVille: event.target.value
        });
    }

    handleDateReservationInputChange = (event) => {
        this.setState({
            dateResevation: event.target.value
        });
    }

    handleFormSubmit = (event) => {
        if (this.state.nomVille !== '' && this.state.dateReservation !== '') {
            this.props.history.push(`/Recherche.${this.state.nomVille}.${this.state.dateResevation}`);
        }
    }

    render() {
        let d = new Date();
        let minDate = d.toISOString().split("T")[0];
        return (
            <div className="Visiteur">
                <VisiteurNavbar />
                <section className="promo_full" style={{ height: "763px" }}>
                    <div className="promo_full_wp">
                        <div>
                            <h3 className="container" style={{ backgroundColor: "#4252be66", fontSize: "45px" }}>
                                <b>Réservation de chambres d'hôtels en journée</b>
                            </h3>
                            <div id="book_container" style={{ backgroundColor: "rgba(253, 166, 7, 0.4)" }}>
                                <div id="group_3">
                                    <div id="container_5">
                                        <label>Où allez-vous ?</label>
                                        <input type="text" onChange={this.handleNomVilleInputChange} value={this.state.nomVille} className="form-control" name="nomVille" placeholder="Où allez-vous ?" />
                                    </div>
                                    <div id="container_6">
                                        <label>Arrivée</label>
                                        <input type="date" min={minDate} onChange={this.handleDateReservationInputChange} value={this.state.dateResevation} className="form-control" name="dateReservation" />
                                    </div>
                                    <div id="container_6">
                                        <input type="submit" onClick={this.handleFormSubmit} className="form-control btn_1" value="Rechercher" style={{ backgroundColor: "#4252be", color: "white" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <VisiteurFooter />
            </div>
        );
    }

}

export default Visiteur;
