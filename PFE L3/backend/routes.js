const router = require('express').Router();
const controlers = require('./controlers');

router.route('/Hotel/Ville/:nomVille').get(controlers.getAllHotelByVille);
router.route('/PlageHoraire/Hotel/:idHotel/:dateReservation').get(controlers.getAllPlageHoraireByHotel);
router.route('/ChambreHoraire/Hotel/:idHotel/:dateReservation').get(controlers.getAllChambreHoraireByHotel);
router.route('/Equipement/Chambre/:idChambre').get(controlers.getAllEquipementByChambre);
router.route('/Service/Hotel/:idHotel').get(controlers.getAllServiceByHotel);
router.route('/Hotel/:idHotel').get(controlers.getHotel);
router.route('/ChambreHoraire/:idChambreHoraire').get(controlers.getChambreHoraire);

router.route('/Client').post(controlers.addClient);
router.route('/Client/Max').get(controlers.getClientMax);
router.route('/Client/Email/:idClient/:emailClient').get(controlers.getClientEmail);

router.route('/Reservation').post(controlers.addReservation);

router.route('/Service/Reservation').post(controlers.addServiceReservation);

router.route('/Client/Connexion/:emailClient/:passwordClient').get(controlers.getClientConnexion);

router.route('/Reservation/Client/:idClient').get(controlers.getAllReservationByClient);

router.route('/Reservation/Annuler/:idReservation').put(controlers.annulerReservation);

module.exports = router;