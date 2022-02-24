import React, { Component } from 'react';
import axios from 'axios';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";

class Connexion extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    handleCreationButton = () => {
        let client = {
            nomClient: this.state.nomClient,
            prenomClient: this.state.prenomClient,
            dateNaissanceClient: this.state.dateNaissanceClient,
            telClient: this.state.telClient,
            emailClient: this.state.emailClient,
            passwordClient: this.state.passwordClient
        }
        axios.post(`http://localhost:5000/Client`, client).then(result => {
        }).catch(err => console.log(err));
    }

    handleConexionButton = () => {
        axios.get(`http://localhost:5000/Client/Connexion/${this.state.emailClientConnexion}/${this.state.passwordClientConnexion}`).then(result => {
            if (result.data.length !== 0) {
                sessionStorage.setItem("idClient", result.data[0].idClient);
                this.props.history.push('/');
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="Connexion">
                <VisiteurNavbar />

                <div className="container add_top_60">
                    <h1 className="main_title_in" style={{ textAlign: "left", marginTop: "50px" }}> </h1>
                </div>
                <div className="container add_bottom_60">
                    <div className="row">
                        <div className="col-md-6" id="room_detail_desc" style={{backgroundColor: "#eeeeee78"}}>

                            <div className="row" style={{ margin: "20px" }}>
                                <h2 className="main_title" style={{ color: "#337ab7" }}><em></em>Creer un compte</h2>
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
                                        <input type="submit" onClick={() => { this.handleCreationButton() }} value="Valider" className="btn_1" style={{backgroundColor: "rgb(66, 82, 190)"}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">

                        </div>
                        <div className="col-md-5" id="room_detail_desc"style={{backgroundColor: "#eeeeee78"}}>
                            <div className="row" style={{ margin: "20px" }}>
                                <h2 className="main_title" style={{ color: "#337ab7" }}><em></em>Se connecter</h2>
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
                                        <input type="submit" onClick={() => { this.handleConexionButton() }} value="Connexion" className="btn_1" style={{backgroundColor: "rgb(66, 82, 190)"}} />
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

export default Connexion;
