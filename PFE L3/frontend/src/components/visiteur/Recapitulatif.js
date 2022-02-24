import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import VisiteurNavbar from "./VisiteurNavbar";
import VisiteurFooter from "./VisiteurFooter";

class Recapitulatif extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <div className="Recapitulatif">
                <VisiteurNavbar />
                <div className="container margin_60_35">
                    <br /><br /><br /><br />
                    <h2 className="main_title"><em></em>Votre réservation est validée</h2>
                    <h2 className="main_title" >Numéro de réservation: <b style={{ color: "black" }}>{this.props.match.params.idReservation}</b></h2>
                    <h3 style={{ textAlign: "center" }}>En cas de désistement, rendez-vous dans la section <Link to="/Client" style={{color:"blue"}}>Mes reservations</Link> et trouvez le voyage que vous souhaitez annuler.</h3>
                </div>
                <VisiteurFooter />!
            </div>
        )
    }

}

export default Recapitulatif;
