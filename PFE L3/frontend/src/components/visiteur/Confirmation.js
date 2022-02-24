import React, { Component } from 'react';
import axios from 'axios';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";
import Etoile from "./Etoile";

class Confirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            hotel: [],
            chambreHoraire: [],
            prixTotal: 0,
            nomClient: '',
            prenomClient: '',
            dateNaissanceClient: '',
            telClient: '',
            emailClient: '',
            passwordClient: '',
            emailClientConnexion: '',
            passwordClientConnexion: '',
        };
    }

    componentDidMount() {
        let services = JSON.parse(sessionStorage.getItem('services'));
        let prixTotal = JSON.parse(sessionStorage.getItem('prixTotal'));
        this.setState({
            services: services,
            prixTotal: prixTotal
        });
        this.getHotel();
        this.getChambreHoraire();
    }

    getHotel = () => {
        axios.get(`http://localhost:5000/Hotel/${this.props.match.params.idHotel}`).then(result => {
            this.setState({
                hotel: result.data
            });
        }).catch(err => console.log(err));
    }

    getChambreHoraire = () => {
        axios.get(`http://localhost:5000/ChambreHoraire/${this.props.match.params.idChambreHoraire}`).then(result => {
            this.setState({
                chambreHoraire: result.data,
            });
        }).catch(err => console.log(err));
    }

    handleNomClientInputChange = (event) => {
        this.setState({
            nomClient: event.target.value
        });
    }

    handlePrenomClientInputChange = (event) => {
        this.setState({
            prenomClient: event.target.value
        });
    }

    handleDateNaissanceClientInputChange = (event) => {
        this.setState({
            dateNaissanceClient: event.target.value
        });
    }
    handleTelClientInputChange = (event) => {
        this.setState({
            telClient: event.target.value
        });
    }
    handleEmailClientInputChange = (event) => {
        this.setState({
            emailClient: event.target.value
        });
    }
    handlePasswordClientInputChange = (event) => {
        this.setState({
            passwordClient: event.target.value
        });
    }

    handleEmailClientConnexionInputChange = (event) => {
        this.setState({
            emailClientConnexion: event.target.value
        });
    }
    handlePasswordClientConnexionInputChange = (event) => {
        this.setState({
            passwordClientConnexion: event.target.value
        });
    }

    genererIdReservation = (taille) => {
        let result = '';
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < taille; i++) {
            result = result + caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return result;
    }

    handleConfirmationCreationButton = () => {
        let client = {
            nomClient: this.state.nomClient,
            prenomClient: this.state.prenomClient,
            dateNaissanceClient: this.state.dateNaissanceClient,
            telClient: this.state.telClient,
            emailClient: this.state.emailClient,
            passwordClient: this.state.passwordClient
        }
        axios.post(`http://localhost:5000/Client`, client).then(result => {
            axios.get(`http://localhost:5000/Client/Max`).then(result2 => {
                let idReservation = this.genererIdReservation(10);
                let reservation = {
                    idReservation: idReservation,
                    dateReservation: this.props.match.params.dateReservation,
                    etatReservation: 'valide',
                    idClient: result2.data[0].idClient,
                    idChambreHoraire: this.props.match.params.idChambreHoraire
                }
                axios.post(`http://localhost:5000/Reservation`, reservation).then(result3 => {
                    for (let i = 0; i < this.state.services.length; i++) {
                        let serviceReservation = {
                            idService: this.state.services[i].service.idService,
                            idReservation: idReservation,
                            qteService: this.state.services[i].qteService
                        }
                        axios.post(`http://localhost:5000/Service/Reservation`, serviceReservation).then(result4 => {
                        }).catch(err4 => console.log(err4));
                    }
                    sessionStorage.setItem("idClient", result2.data[0].idClient);
                    this.props.history.push(`/Recapitulatif.${idReservation}`);
                }).catch(err3 => console.log(err3));
            }).catch(err2 => console.log(err2));
        }).catch(err => console.log(err));
    }

    handleConfirmationConexionButton = () => {
        axios.get(`http://localhost:5000/Client/Connexion/${this.state.emailClientConnexion}/${this.state.passwordClientConnexion}`).then(result => {
            if (result.data.length !== 0) {
                let idReservation = this.genererIdReservation(10);
                let reservation = {
                    idReservation: idReservation,
                    dateReservation: this.props.match.params.dateReservation,
                    etatReservation: 'valide',
                    idClient: result.data[0].idClient,
                    idChambreHoraire: this.props.match.params.idChambreHoraire
                }
                axios.post(`http://localhost:5000/Reservation`, reservation).then(result2 => {
                    for (let i = 0; i < this.state.services.length; i++) {
                        let serviceReservation = {
                            idService: this.state.services[i].service.idService,
                            idReservation: idReservation,
                            qteService: this.state.services[i].qteService
                        }
                        axios.post(`http://localhost:5000/Service/Reservation`, serviceReservation).then(result3 => {
                        }).catch(err3 => console.log(err3));
                    }
                    sessionStorage.setItem("idClient", result.data[0].idClient);
                    this.props.history.push(`/Recapitulatif.${idReservation}`);
                }).catch(err2 => console.log(err2));
            } else {
                console.log(result.data);
            }
        }).catch(err => console.log(err));
    }

    handleConfirmationButton = () => {
        let idReservation = this.genererIdReservation(10);
        let reservation = {
            idReservation: idReservation,
            dateReservation: this.props.match.params.dateReservation,
            etatReservation: 'valide',
            idClient: sessionStorage.getItem("idClient"),
            idChambreHoraire: this.props.match.params.idChambreHoraire
        }
        axios.post(`http://localhost:5000/Reservation`, reservation).then(result => {
            for (let i = 0; i < this.state.services.length; i++) {
                let serviceReservation = {
                    idService: this.state.services[i].service.idService,
                    idReservation: idReservation,
                    qteService: this.state.services[i].qteService
                }
                axios.post(`http://localhost:5000/Service/Reservation`, serviceReservation).then(result2 => {
                }).catch(err2 => console.log(err2));
            }
            this.props.history.push(`/Recapitulatif.${idReservation}`);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="Confirmation">
                <VisiteurNavbar />

                <div className="container add_top_60">
                    <h1 className="main_title_in" style={{ textAlign: "left", marginTop: "50px" }}>Confirmation</h1>
                </div>
                <div className="container add_bottom_60">
                    <div className="row">
                        <div className="col-md-8" id="room_detail_desc">
                            <div className="row">
                                <h2 className="main_title" style={{color:"rgb(51, 122, 183)"}}><em></em>Créez votre compte</h2>

                                {
                                    sessionStorage.getItem("idClient") === null &&
                                    <div>

                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Nom</label>
                                                    <input type="text" value={this.state.nomClient} onChange={this.handleNomClientInputChange} className="form-control" name="nomClient" placeholder="nom" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Prenom</label>
                                                    <input type="text" value={this.state.prenomClient} onChange={this.handlePrenomClientInputChange} className="form-control" name="prenomClient" placeholder="prenom" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Date de Naissance</label>
                                                    <input type="date" value={this.state.dateNaissanceClient} onChange={this.handleDateNaissanceClientInputChange} name="dateNaissanceClient" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Telephone</label>
                                                    <input type="text" value={this.state.telClient} onChange={this.handleTelClientInputChange} name="telClient" className="form-control" placeholder="0677445588" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" value={this.state.emailClient} onChange={this.handleEmailClientInputChange} name="emailClient" className="form-control" placeholder="email@gmail.com" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Mot de passe</label>
                                                    <input type="password" onChange={this.handlePasswordClientInputChange} value={this.state.passwordClient} name="passwordClient" className="form-control" placeholder="********" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row add_bottom_30">
                                            <div className="col-md-6">
                                                <input type="submit" onClick={() => { this.handleConfirmationCreationButton() }} value="Je reserve" className="btn_1" style={{backgroundColor:"rgb(51, 122, 183)"}} />
                                            </div>
                                        </div>

                                        <h2 className="main_title" style={{color:"rgb(51, 122, 183)"}}><em></em>Me connecter</h2>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" value={this.state.emailClientConnexion} onChange={this.handleEmailClientConnexionInputChange} name="emailClient" className="form-control" placeholder="email@gmail.com" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label>Mot de passe</label>
                                                    <input type="password" onChange={this.handlePasswordClientConnexionInputChange} value={this.state.passwordClientConnexion} name="passwordClient" className="form-control" placeholder="*********" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row add_bottom_30">
                                            <div className="col-md-6">
                                                <input type="submit" onClick={() => { this.handleConfirmationConexionButton() }} value="Je reserve" className="btn_1" style={{backgroundColor:"rgb(51, 122, 183)"}} />
                                            </div>
                                        </div>

                                    </div>
                                }
                                {
                                    sessionStorage.getItem("idClient") !== null &&
                                    <div className="row add_bottom_30">
                                        <div className="col-md-6">
                                            <input type="submit" onClick={() => { this.handleConfirmationButton() }} value="Je reserve" className="btn_1" />
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>


                        <div className="col-md-4" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div className="box_style_1">
                                    <div className="row">
                                        {
                                            this.state.hotel.map(h => (
                                                <div key={h.idHotel}>
                                                    <div className="col-md-12 col-sm-6">
                                                        <h4><b>{h.nomHotel}</b></h4>
                                                        <span><Etoile nbEtoileHotel={h.nbEtoileHotel} /></span>
                                                        <span>{h.adresseHotel}, {h.nomVille}</span>
                                                        <hr />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {
                                            this.state.chambreHoraire.map(c => (
                                                <div key={c.idChambreHoraire}>
                                                    <div className="col-md-12 col-sm-6">
                                                    <h4>{this.props.match.params.dateReservation} | de <b>{c.heureArrive.split(":")[0]}:{c.heureArrive.split(":")[1]}</b> à <b>{c.heureDepart.split(":")[0]}:{c.heureDepart.split(":")[1]}</b></h4>
                                                        <hr />
                                                    </div>

                                                    <div className="col-md-12 col-sm-6">
                                                        <table style={{ width: "100%" }}>
                                                            <thead>
                                                                <tr>
                                                                    <td>
                                                                        <h4>{c.typeChambre}</h4>
                                                                    </td>
                                                                    <td style={{ textAlign: "right" }}>
                                                                        <b>{c.prixChambreHoraire}€</b>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                        <hr />
                                                    </div>

                                                    <div className="col-md-12 col-sm-6">
                                                        <table style={{ width: "100%" }}>
                                                            <thead>
                                                                {
                                                                    this.state.services.map(service => (
                                                                        <tr key={service.service.idService}>
                                                                            {
                                                                                service.qteService !== 0 &&
                                                                                <td>
                                                                                    <h4>{service.qteService} x {service.service.libelleService}</h4>
                                                                                </td>
                                                                            }
                                                                            {
                                                                                service.qteService !== 0 &&
                                                                                <td>
                                                                                    <b>{service.qteService * service.service.prixService}€</b>
                                                                                </td>
                                                                            }
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </thead>
                                                        </table>
                                                        <hr />
                                                    </div>

                                                    <div className="col-md-12 col-sm-6">
                                                        <table style={{ width: "100%" }}>
                                                            <thead>
                                                                <tr>
                                                                    <td>
                                                                        <h4>Total</h4>
                                                                    </td>
                                                                    <td style={{ textAlign: "right" }}>
                                                                        <b>{this.state.prixTotal}€</b>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>


                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <VisiteurFooter />
            </div>
        );
    }
}

export default Confirmation;
