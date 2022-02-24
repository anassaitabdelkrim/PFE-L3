import React, { Component } from 'react';
import axios from 'axios';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";

import Etoile from './Etoile';

class Client extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        }
    }

    componentDidMount = () => {
        this.getAllReservationByClient();
    }

    getAllReservationByClient = () => {
        axios.get(`http://localhost:5000/Reservation/Client/${sessionStorage.getItem("idClient")}`).then(result => {
            this.setState({
                reservations: result.data
            });
        }).catch(err => console.log(err));
    }

    handleAnnulerButton = (idReservation) => {
        this.props.history.push(`/Annulation.${idReservation}`);
    }

    render() {
        return (
            <div className="Client">
                <VisiteurNavbar />
                <div className="container add_top_60">
                    <h1 className="main_title_in" style={{ textAlign: "left", marginTop: "50px" }}>Mes reservations</h1>
                </div>
                <div className="container add_bottom_60">
                    <div className="row">
                        <div className="col-md-8" id="room_detail_desc">

                            <div className="row">


                                {
                                    this.state.reservations.map(reservation => (
                                        <div className="row" key={reservation.idReservation}>
                                            <div className="col-md-5 col-md-offset-1" style={{ marginLeft: "0" }}>
                                                <figure className="room_pic">
                                                    <img src={`style/img/${reservation.photoHotel}`} alt="" className="img-responsive" />
                                                    <span className="wow" style={{ backgroundColor: "rgb(253, 166, 7)", width: "130px" }}>
                                                        <sup>€</sup>{reservation.prixChambreHoraire}<small></small>
                                                    </span>
                                                </figure>
                                            </div>
                                            <div className="col-md-6 col-md-offset-1">
                                                <div className="room_desc_home">
                                                    <h3>{reservation.nomHotel} <Etoile nbEtoileHotel={reservation.nbEtoileHotel} /></h3>
                                                    <p>{reservation.typeChambre}
                                                    </p>
                                                    <p> {reservation.dateReservation.split("T")[0]}
                                                        <br />
                                                        de <b>{reservation.heureArrive} </b>
                                                        à <b>{reservation.heureDepart}</b></p>

                                                    {
                                                        reservation.etatReservation === "valide" &&
                                                        <div style={{ textAlign: "right" }}>
                                                                                                                        <button className="btn_1_outline" style={{ background: "green", color: "white", borderColor: "green" }}>Modifier</button>&nbsp;
                                                            <button onClick={
                                                                () => {
                                                                    this.handleAnnulerButton(reservation.idReservation);
                                                                }
                                                            } className="btn_1_outline" style={{ background: "#4252be", color: "white", borderColor: "#4252be" }}>Annuler</button>

                                                        </div>
                                                    }

                                                    {
                                                        reservation.etatReservation === "annuler" &&
                                                        <div style={{ textAlign: "left" }}>
                                                            <button className="btn_1_outline" style={{ background: "red", color: "white", borderColor: "red" }} disabled>En cours d'annulation</button>
                                                        </div>
                                                    }


                                                </div>
                                                <h1><hr /></h1>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>










                <VisiteurFooter />
            </div >
        )
    }

}

export default Client;
