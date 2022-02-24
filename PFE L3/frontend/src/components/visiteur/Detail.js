import React, { Component } from 'react';
import axios from 'axios';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";
import Etoile from "./Etoile";

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateReservation: '',
            hotel: [],
            chambreHoraires: [],
        };
    }

    componentDidMount() {
        this.setState({
            dateReservation: this.props.match.params.dateReservation
        });
        this.getAllChambreHoraireByHotel(this.props.match.params.dateReservation);
        this.getHotel();
    }

    getHotel = () => {
        axios.get(`http://localhost:5000/Hotel/${this.props.match.params.idHotel}`).then(result => {
            this.setState({
                hotel: result.data
            });
        }).catch(err => console.log(err));
    }

    getAllChambreHoraireByHotel = (dateReservation) => {
        axios.get(`http://localhost:5000/ChambreHoraire/Hotel/${this.props.match.params.idHotel}/${dateReservation}`).then(result => {
            let chambreHoraires = [];
            for (let i = 0; i < result.data.length; i++) {
                axios.get(`http://localhost:5000/Equipement/Chambre/${result.data[i].idChambre}`).then(result2 => {
                    chambreHoraires.push({
                        chambreHoraire: result.data[i],
                        equipements: result2.data
                    });
                    this.setState({
                        chambreHoraires: chambreHoraires
                    });
                }).catch(err2 => console.log(err2));
            }
        }).catch(err => console.log(err));
    }

    handleDateReservationInputChange = (event) => {
        this.getAllChambreHoraireByHotel(event.target.value);
        this.props.history.push(`/Detail.${this.props.match.params.idHotel}.${event.target.value}`);
        this.setState({
            dateReservation: event.target.value
        })
    }

    handleButtonChambre = (idChambreHoraire) => {
        this.props.history.push(`/Service.${this.props.match.params.idHotel}.${this.state.dateReservation}.${idChambreHoraire}`);
    }

    render() {
        return (
            <div className="Detail">
                <VisiteurNavbar />

                {
                    this.state.hotel.map(h => (
                        <section key={h.idHotel} className="promo_full" style={{ background: `url('style/img/${h.photoHotel}') center no-repeat`, WebkitBackgroundSize: "cover" }}>
                            <div className="promo_full_wp">
                                <div>
                                    <h3 className="container" style={{ backgroundColor: "#4252be66" }}>

                                        {h.nomHotel} <Etoile nbEtoileHotel={h.nbEtoileHotel} /><span>{h.adresseHotel}, {h.nomVille}</span>
                                    </h3>
                                </div>
                            </div>
                        </section>
                    ))
                }

                <div className="container add_top_60">
                    <div className="row">
                        <div className="col-md-8" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div className="box_style_1">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <h3>Les offres disponibles en journée</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div className="box_style_1">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Changer de Date</label>
                                                <input type="date" value={this.state.dateReservation} onChange={this.handleDateReservationInputChange} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container add_bottom_60 add_top_40">
                    {
                        this.state.chambreHoraires.map(chambreHoraire => (

                            <div key={chambreHoraire.chambreHoraire.idChambreHoraire} className="row" style={{ margin: "10px", boxShadow: "#443f3f 1px 1px 20px" }}>
                                <div className="col-md-2" style={{ backgroundColor: "rgb(253, 166, 7)", padding: "20px", textAlign: "center", color: "white", fontSize: "30px" }}>
                                    <b>{chambreHoraire.chambreHoraire.heureArrive.split(":")[0]}:{chambreHoraire.chambreHoraire.heureArrive.split(":")[1]}</b>
                                    <hr />
                                    <b>{chambreHoraire.chambreHoraire.heureDepart.split(":")[0]}:{chambreHoraire.chambreHoraire.heureDepart.split(":")[1]}</b>
                                </div>
                                <div className="col-md-8" style={{ backgroundColor: "#eee", padding: "20px", textAlign: "left", color: "black", fontSize: "30px" }}>
                                    {chambreHoraire.chambreHoraire.typeChambre}
                                    <hr />
                                    {
                                        chambreHoraire.equipements.map(equipement => (
                                            <span key={equipement.idEquipement} style={{fontSize: "15px"}}>
                                                 - {equipement.libelleEquipement}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                             
                                            </span>
                                        ))
                                    }
                                </div>

                                {
                                    chambreHoraire.chambreHoraire.disponible !== -1 ?
                                        <div className="col-md-2" style={{ backgroundColor: "red", padding: "20px", textAlign: "center", color: "white", fontSize: "30px"}}>
                                            {chambreHoraire.chambreHoraire.prixChambreHoraire}€
                                            <hr />
                                            Epuisé
                                        </div>
                                        :
                                        <button onClick={
                                            () => { this.handleButtonChambre(chambreHoraire.chambreHoraire.idChambreHoraire) }
                                        } className="col-md-2" style={{ backgroundColor: "rgb(66, 82, 190)", padding: "20px", textAlign: "center", color: "white", fontSize: "30px", border: "none" }}>
                                            {chambreHoraire.chambreHoraire.prixChambreHoraire}€
                                            <hr />
                                            Réserver
                                        </button>
                                }

                            </div>
                        ))
                    }
                </div>


                <VisiteurFooter />
            </div>
        );
    }
}

export default Detail;
