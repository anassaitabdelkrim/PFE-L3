import React, { Component } from 'react';
import axios from 'axios';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";
import Etoile from "./Etoile";

class Recherche extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nomVille: '',
            dateReservation: '',
            hotels: [],
            hotelsProvi: [],
            hotelsDuree: [],
            hotelsHeureArrive: [],
            hotelsPrixChambreHoraire: [],
            hotelsNbEtoileHotel: [],
            duree: '',
            heureArrive: '',
            prixChambreHoraire: 200,
            nbEtoileHotel: '',
            heureArriveSelect: [],
            dureeSelect: []
        };
    }

    componentDidMount() {
        let heureArriveSelect = [];
        let dureeSelect = [];
        for (let i = 6; i <= 20; i++) {
            if (i < 10) { heureArriveSelect.push(`0${i}`); }
            else { heureArriveSelect.push(i); }
        }
        for (let i = 1; i <= 10; i++) {
            dureeSelect.push(i);
        }
        this.setState({
            heureArriveSelect: heureArriveSelect,
            dureeSelect: dureeSelect,
            nomVille: this.props.match.params.nomVille,
            dateReservation: this.props.match.params.dateReservation
        });
        this.getAllHotelByVille(this.props.match.params.nomVille, this.props.match.params.dateReservation);
    }

    getAllHotelByVille = (nomVille, dateReservation) => {
        axios.get(`http://localhost:5000/Hotel/Ville/${nomVille}`).then(result => {
            let hotels = [];
            for (let i = 0; i < result.data.length; i++) {
                axios.get(`http://localhost:5000/PlageHoraire/Hotel/${result.data[i].idHotel}/${dateReservation}`).then(result2 => {
                    hotels.push({
                        hotel: result.data[i],
                        plageHoraires: result2.data
                    });
                    this.setState({
                        hotels: hotels,
                        hotelsProvi: hotels,
                        hotelsDuree: hotels,
                        hotelsHeureArrive: hotels,
                        hotelsPrixChambreHoraire: hotels,
                        hotelsNbEtoileHotel: hotels
                    });
                }).catch(err2 => console.log(err2));
            }
        }).catch(err => console.log(err));
    }

    handleNomVilleInputChange = (event) => {
        this.setState({
            nomVille: event.target.value
        });
    }

    handleDateReservationInputChange = (event) => {
        this.setState({
            dateReservation: event.target.value
        });
    }

    handleFormSubmit = (event) => {
        this.getAllHotelByVille(this.state.nomVille, this.state.dateReservation);
        this.props.history.push(`/Recherche.${this.state.nomVille}.${this.state.dateReservation}`);
    }

    handleHotelButton = (idHotel) => {
        this.props.history.push(`/Detail.${idHotel}.${this.props.match.params.dateReservation}`);
    }

    handleDureeInputChange = (event) => {
        let hotels = [];
        if (event.target.value === '') {
            hotels = this.state.hotels;
        } else {
            for (let i = 0; i < this.state.hotels.length; i++) {
                for (let j = 0; j < this.state.hotels[i].plageHoraires.length; j++) {
                    let sub = this.state.hotels[i].plageHoraires[j].heureDepart.split(":")[0] - this.state.hotels[i].plageHoraires[j].heureArrive.split(":")[0];
                    if (sub >= event.target.value) {
                        hotels.push(this.state.hotels[i]);
                        break;
                    }
                }
            }
        }
        let hotels2 = [];
        for (let i = 0; i < hotels.length; i++) {
            for (let j = 0; j < this.state.hotelsHeureArrive.length; j++) {
                for (let k = 0; k < this.state.hotelsPrixChambreHoraire.length; k++) {
                    for (let l = 0; l < this.state.hotelsNbEtoileHotel.length; l++) {
                        if (hotels[i].hotel.idHotel === this.state.hotelsHeureArrive[j].hotel.idHotel
                            && hotels[i].hotel.idHotel === this.state.hotelsPrixChambreHoraire[k].hotel.idHotel
                            && hotels[i].hotel.idHotel === this.state.hotelsNbEtoileHotel[l].hotel.idHotel) {
                            hotels2.push(hotels[i]);
                        }
                    }
                }
            }
        }
        this.setState({
            hotelsProvi: hotels2,
            hotelsDuree: hotels,
            duree: event.target.value
        });
    }

    handleHeureArriveInputChange = (event) => {
        let hotels = [];
        if (event.target.value === '') {
            hotels = this.state.hotels;
        } else {
            for (let i = 0; i < this.state.hotels.length; i++) {
                for (let j = 0; j < this.state.hotels[i].plageHoraires.length; j++) {
                    if (this.state.hotels[i].plageHoraires[j].heureArrive === event.target.value) {
                        hotels.push(this.state.hotels[i]);
                        break;
                    }
                }
            }
        }
        let hotels2 = [];
        for (let i = 0; i < this.state.hotelsDuree.length; i++) {
            for (let j = 0; j < hotels.length; j++) {
                for (let k = 0; k < this.state.hotelsPrixChambreHoraire.length; k++) {
                    for (let l = 0; l < this.state.hotelsNbEtoileHotel.length; l++) {
                        if (this.state.hotelsDuree[i].hotel.idHotel === hotels[j].hotel.idHotel
                            && this.state.hotelsDuree[i].hotel.idHotel === this.state.hotelsPrixChambreHoraire[k].hotel.idHotel
                            && this.state.hotelsDuree[i].hotel.idHotel === this.state.hotelsNbEtoileHotel[l].hotel.idHotel) {
                            hotels2.push(this.state.hotelsDuree[i]);
                        }
                    }
                }
            }
        }
        this.setState({
            hotelsProvi: hotels2,
            hotelsHeureArrive: hotels,
            heureArrive: event.target.value
        });
    }

    handlePrixChambreHoraireInputChange = (event) => {
        let hotels = [];
        if (event.target.value === '') {
            hotels = this.state.hotels;
        } else {
            for (let i = 0; i < this.state.hotels.length; i++) {
                if (this.state.hotels[i].hotel.minPrixChambreHoraire <= event.target.value) {
                    hotels.push(this.state.hotels[i]);
                }
            }
        }
        let hotels2 = [];
        for (let i = 0; i < this.state.hotelsDuree.length; i++) {
            for (let j = 0; j < this.state.hotelsHeureArrive.length; j++) {
                for (let k = 0; k < hotels.length; k++) {
                    for (let l = 0; l < this.state.hotelsNbEtoileHotel.length; l++) {
                        if (this.state.hotelsDuree[i].hotel.idHotel === this.state.hotelsHeureArrive[j].hotel.idHotel
                            && this.state.hotelsDuree[i].hotel.idHotel === hotels[k].hotel.idHotel
                            && this.state.hotelsDuree[i].hotel.idHotel === this.state.hotelsNbEtoileHotel[l].hotel.idHotel) {
                            hotels2.push(this.state.hotelsDuree[i]);
                        }
                    }
                }
            }
        }
        this.setState({
            hotelsProvi: hotels2,
            hotelsPrixChambreHoraire: hotels,
            prixChambreHoraire: event.target.value
        });
    }

    handleNbEtoileHotelInputChange = (event) => {
        let hotels = [];
        if (event.target.value === '') {
            hotels = this.state.hotels;
        } else {
            for (let i = 0; i < this.state.hotels.length; i++) {
                if (this.state.hotels[i].hotel.nbEtoileHotel === parseInt(event.target.value)) {
                    hotels.push(this.state.hotels[i]);
                }
            }
        }
        let hotels2 = [];
        for (let i = 0; i < this.state.hotelsDuree.length; i++) {
            for (let j = 0; j < this.state.hotelsHeureArrive.length; j++) {
                for (let k = 0; k < this.state.hotelsPrixChambreHoraire.length; k++) {
                    for (let l = 0; l < hotels.length; l++) {
                        if (this.state.hotelsDuree[i].hotel.idHotel === this.state.hotelsHeureArrive[j].hotel.idHotel
                            && this.state.hotelsDuree[i].hotel.idHotel === this.state.hotelsPrixChambreHoraire[k].hotel.idHotel
                            && this.state.hotelsDuree[i].hotel.idHotel === hotels[l].hotel.idHotel) {
                            hotels2.push(this.state.hotelsDuree[i]);
                        }
                    }
                }
            }
        }
        this.setState({
            hotelsProvi: hotels2,
            hotelsNbEtoileHotel: hotels,
            nbEtoileHotel: event.target.value
        });
    }

    render() {
        return (
            <div className="Recherche">
                <VisiteurNavbar />
                <div className="container add_top_60">
                    <h1 className="main_title_in" style={{ textAlign: "left", marginTop: "50px" }}>{this.props.match.params.nomVille.toUpperCase()}: {this.state.hotelsProvi.length} établissements trouvés</h1>
                </div>
                <div className="container add_bottom_60">
                    <div className="row">
                        <div className="col-md-8" id="room_detail_desc">
                            {/* <div id="single_room_feat">
                                <ul>
                                    <li><b>Trier par :</b></li>
                                    <li><button onClick={this.handleTriPrixBas}><i className="icon-euro"></i>Le moins cher</button></li>
                                    <li><button onClick={this.handleTriPrixHaut}><i className="icon-euro"></i>Le plus cher</button></li>
                                    <li><button onClick={this.handleTriEtoileBas}><i className="icon-star-empty"></i>Etoiles [1->5]</button></li>
                                    <li><button onClick={this.handleTriEtoileHaut}><i className="icon-star"></i>Etoiles [5->1]</button></li>
                                </ul>
                            </div> */}

                            <div className="row">

                                {
                                    this.state.hotelsProvi.map(hotel => (
                                        <div className="row" key={hotel.hotel.idHotel}>
                                            <div className="col-md-5 col-md-offset-1" style={{ marginLeft: "0" }}>
                                                <figure className="room_pic">
                                                    <img src={`style/img/${hotel.hotel.photoHotel}`} alt="" className="img-responsive" />
                                                    <span className="wow" style={{ backgroundColor: "rgb(253, 166, 7)", width: "130px" }}>
                                                        <sup>€</sup>{hotel.hotel.minPrixChambreHoraire}<small></small>
                                                    </span>
                                                </figure>
                                            </div>
                                            <div className="col-md-6 col-md-offset-1">
                                                <div className="room_desc_home">
                                                    <h3>{hotel.hotel.nomHotel} <Etoile nbEtoileHotel={hotel.hotel.nbEtoileHotel} /></h3>
                                                    <p>{hotel.hotel.adresseHotel}</p>
                                                    <p><i className="icon-phone"></i> : 0{hotel.hotel.telHotel}
                                                        <br /><i className="icon-mail"></i> : {hotel.hotel.emailHotel}</p>
                                                    <table style={{ width: "100%", textAlign: "center" }}>
                                                        <thead>
                                                            <tr>
                                                                {
                                                                    hotel.plageHoraires.map(plageHoraire => (
                                                                        <td key={plageHoraire.idChambreHoraire} style={plageHoraire.disponible === -1 ? { padding: "11px", border: "solid #fda607 1px", } : { padding: "11px", border: "solid #fda607 1px", backgroundColor: "#ededed" }}>
                                                                            <b>
                                                                                {plageHoraire.heureArrive.split(":")[0]}h - {plageHoraire.heureDepart.split(":")[0]}h
                                                                            </b>
                                                                        </td>
                                                                    ))
                                                                }

                                                            </tr>
                                                        </thead>
                                                    </table>

                                                    <ul>
                                                        <li>

                                                            <div className="tooltip_styled tooltip-effect-4">
                                                                <span className="tooltip-item"><i className="icon_set_2_icon-104"></i></span>
                                                            </div>
                                                            <div className="tooltip_styled tooltip-effect-4">
                                                                <span className="tooltip-item"><i className="icon_set_2_icon-118"></i></span>
                                                            </div>
                                                            <div className="tooltip_styled tooltip-effect-4">
                                                                <span className="tooltip-item"><i className="icon_set_2_icon-116"></i></span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div style={{ textAlign: "right" }}>
                                                        <button onClick={() => { this.handleHotelButton(hotel.hotel.idHotel) }} className="btn_1_outline" style={{ background: "#4252be", color: "white", borderColor: "#4252be" }}>Choisissez-votre chambre</button>
                                                    </div>
                                                </div>
                                                <h1><hr /></h1>
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>
                        </div>


                        <div className="col-md-4" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div className="box_style_1">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-6">
                                            <h4><b>Rechercher</b></h4>
                                        </div>
                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Destination</label>
                                                <input type="text" onChange={this.handleNomVilleInputChange} value={this.state.nomVille} className="form-control" name="nomVille" placeholder="Où allez-vous ?" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Date d'arrivée</label>
                                                <input type="date" onChange={this.handleDateReservationInputChange} value={this.state.dateReservation} className="form-control" name="dateReservation" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <input type="submit" value="Rechercher" onClick={this.handleFormSubmit} className="btn_full" style={{ background: "#4252be" }} />
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Heure d'arrivée</label>
                                                <select onChange={this.handleHeureArriveInputChange} className="form-control" style={{ WebkitAppearance: "auto" }}>
                                                    <option value="">Heure d'arrivée</option>
                                                    {
                                                        this.state.heureArriveSelect.map(h => (
                                                            <option key={h} value={`${h}:00:00`}>{`${h}`}:00</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Durée</label>
                                                <select onChange={this.handleDureeInputChange} className="form-control" style={{ WebkitAppearance: "auto" }}>
                                                    <option value="">Durée</option>
                                                    {
                                                        this.state.dureeSelect.map(h => (
                                                            < option key={h} value={h}>{h}h</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Nombre d'étoile</label>
                                                < select onChange={this.handleNbEtoileHotelInputChange} className="form-control" style={{ WebkitAppearance: "auto" }}>
                                                    <option value="">Etoile</option>
                                                    <option value="5">*****</option>
                                                    <option value="4">****</option>
                                                    <option value="3">***</option>
                                                    <option value="2">**</option>
                                                    <option value="1">*</option>
                                                </select >
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Prix</label>
                                                <table style={{ width: "100%" }}>
                                                    <thead>
                                                        <tr>
                                                            <td>
                                                                0€
                                                            </td>
                                                            <td>
                                                                < input type="range" value={this.state.prixChambreHoraire} onChange={this.handlePrixChambreHoraireInputChange} min="0" max="200" step="10" className="form-control-range" />
                                                            </td>
                                                            <td>
                                                                {this.state.prixChambreHoraire}€
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                < VisiteurFooter />
            </div >
        );
    }
}

export default Recherche;
