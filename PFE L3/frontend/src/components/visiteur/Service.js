import React, { Component } from 'react';
import axios from 'axios';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";
import Etoile from "./Etoile";

class Service extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            hotel: [],
            chambreHoraire: [],
            prixTotal: 0
        };
    }

    componentDidMount() {
        this.getAllServiceByHotel();
        this.getHotel();
        this.getChambreHoraire();
    }

    getAllServiceByHotel = () => {
        axios.get(`http://localhost:5000/Service/Hotel/${this.props.match.params.idHotel}`).then(result => {
            let services = [];
            for (let i = 0; i < result.data.length; i++) {
                services.push({
                    service: result.data[i],
                    qteService: 0
                });
            }
            this.setState({
                services: services
            });
        }).catch(err => console.log(err));
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
                prixTotal: result.data[0].prixChambreHoraire
            });
        }).catch(err => console.log(err));
    }

    handleSubService = (idService) => {
        let services = this.state.services;
        let prixTotal = this.state.prixTotal;
        for (let i = 0; i < services.length; i++) {
            if (services[i].service.idService === idService && services[i].qteService > 0) {
                services[i].qteService--;
                prixTotal = prixTotal - services[i].service.prixService;
                this.setState({
                    services: services,
                    prixTotal: prixTotal
                });
                break;
            }
        }
    }

    handleAddService = (idService) => {
        let services = this.state.services;
        let prixTotal = this.state.prixTotal;
        for (let i = 0; i < services.length; i++) {
            if (services[i].service.idService === idService && services[i].qteService < 3) {
                services[i].qteService++;
                prixTotal = prixTotal + services[i].service.prixService;
                this.setState({
                    services: services,
                    prixTotal: prixTotal
                });
                break;
            }
        }
    }

    handleServiceButton = () => {
        let services = this.state.services.filter(service => service.qteService !== 0);
        let prixTotal = this.state.prixTotal;
        sessionStorage.setItem('services', JSON.stringify(services));
        sessionStorage.setItem('prixTotal', prixTotal);
        this.props.history.push(`/Confirmation.${this.props.match.params.idHotel}.${this.props.match.params.dateReservation}.${this.props.match.params.idChambreHoraire}`);
    }

    render() {
        return (
            <div className="Service">
                <VisiteurNavbar />

                <div className="container add_top_60">
                    <h1 className="main_title_in" style={{ textAlign: "left", marginTop: "50px" }}>Pour se faire plaisir</h1>
                </div>
                <div className="container add_bottom_60">
                    <div className="row">
                        <div className="col-md-8" id="room_detail_desc">
                            <div className="row">
                                <table style={{ width: "100%",  fontSize: "20px" }}>
                                    <tbody>

                                        {
                                            this.state.services.map(service => (
                                                <tr key={service.service.idService}>
                                                    <td style={{ padding: "20px" }}>
                                                        <b>{service.service.libelleService}</b>
                                                        <br /><br />
                                                        <button onClick={() => { this.handleSubService(service.service.idService) }}>-</button>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;{service.qteService}&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <button onClick={() => { this.handleAddService(service.service.idService) }}>+</button>
                                                    </td>
                                                    <td style={{ padding: "20px" }}>
                                                        <b>{service.service.prixService}€</b>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colspan="2" style={{ padding: "40px" }}>
                                                <button className="btn_1_outline" style={{ background: "#4252be", color: "white", borderColor: "#4252be" }} onClick={() => { this.handleServiceButton() }}>Continuer</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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

export default Service;
