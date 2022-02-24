import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Visiteur from './Visiteur';
import Recherche from './Recherche';
import Detail from './Detail';
import Service from './Service';
import Confirmation from './Confirmation';
import Recapitulatif from './Recapitulatif';
import Connexion from './Connexion';
import Client from './Client';
import Annulation from './Annulation';

class VisiteurRoute extends Component {
    render() {
        return (
            <div className="VisiteurRoute">
                <Route path="/" exact component={Visiteur} />
                <Route path="/Recherche.:nomVille.:dateReservation" exact component={Recherche} />
                <Route path="/Detail.:idHotel.:dateReservation" exact component={Detail} />
                <Route path="/Service.:idHotel.:dateReservation.:idChambreHoraire" exact component={Service} />
                <Route path="/Confirmation.:idHotel.:dateReservation.:idChambreHoraire" exact component={Confirmation} />
                <Route path="/Recapitulatif.:idReservation" exact component={Recapitulatif} />
                <Route path="/Connexion" exact component={Connexion} />
                <Route path="/Client" exact component={Client} />
                <Route path="/Annulation.:idReservation" exact component={Annulation} />
            </div>
        );
    }
}

export default VisiteurRoute;
