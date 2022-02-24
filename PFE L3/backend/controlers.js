const con = require('./db');

const controlers = {

    getAllHotelByVille: (req, res) => {
        let values = [
            req.params.nomVille
        ];
        let sql = `SELECT h.*, MIN(ch.prixChambreHoraire) minPrixChambreHoraire
        FROM Hotel h, Ville v, Chambre c, ChambreHoraire ch
        WHERE h.idVille = v.idVille
        AND h.idHotel = c.idHotel
        AND c.idChambre = ch.idChambre
        AND v.nomVille = ?
        GROUP BY h.idHotel`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getAllPlageHoraireByHotel: (req, res) => {
        let values = [
            req.params.idHotel,
            req.params.dateReservation
        ];
        let sql = `SELECT T.*, IFNULL(r.idChambreHoraire, -1) disponible
        FROM
        (
        SELECT ch.idChambreHoraire, ph.heureArrive, ph.heureDepart
        FROM Hotel h, Chambre c, ChambreHoraire ch, PlageHoraire ph
        WHERE h.idHotel = ?
        AND h.idHotel = c.idHotel
        AND c.idChambre = ch.idChambre
        AND ch.idPlageHoraire = ph.idPlageHoraire
        GROUP BY ph.idPlageHoraire
        ) T
        LEFT JOIN Reservation r ON T.idChambreHoraire = r.idChambreHoraire
        AND r.dateReservation = ?
        AND r.etatReservation = 'valide'`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getAllChambreHoraireByHotel: (req, res) => {
        let values = [
            req.params.idHotel,
            req.params.dateReservation
        ];
        let sql = `SELECT T.*, IFNULL(r.idChambreHoraire, -1) disponible
        FROM
        (
        SELECT ch.idChambreHoraire, ch.prixChambreHoraire, ph.heureArrive, ph.heureDepart, c.*
        FROM Hotel h, Chambre c, ChambreHoraire ch, PlageHoraire ph
        WHERE h.idHotel = ?
        AND h.idHotel = c.idHotel
        AND c.idChambre = ch.idChambre
        AND ch.idPlageHoraire = ph.idPlageHoraire
        ) T
        LEFT JOIN Reservation r ON T.idChambreHoraire = r.idChambreHoraire
        AND r.dateReservation  = ?
        AND r.etatReservation = 'valide'`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getAllEquipementByChambre: (req, res) => {
        let values = [
            req.params.idChambre
        ];
        let sql = `SELECT e.* FROM Chambre c, ChambreEquipement ce, Equipement e
        WHERE c.idChambre = ce.idChambre
        AND ce.idEquipement = e.idEquipement
        AND c.idChambre = ?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getAllServiceByHotel: (req, res) => {
        let values = [
            req.params.idHotel
        ];
        let sql = `SELECT s.*, hs.prixService FROM Hotel h, HotelService hs, Service s
        WHERE h.idHotel = hs.idHotel
        AND hs.idService = s.idService
        AND h.idHotel = ?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getHotel: (req, res) => {
        let values = [
            req.params.idHotel
        ];
        let sql = `SELECT * FROM Hotel h, Ville v
        WHERE h.idVille = v.idVille
        AND h.idHotel = ?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getChambreHoraire: (req, res) => {
        let values = [
            req.params.idChambreHoraire
        ];
        let sql = `SELECT * FROM ChambreHoraire ch, Chambre c, PlageHoraire ph
        WHERE ch.idChambre = c.idChambre
        AND ch.idPlageHoraire = ph.idPlageHoraire
        AND ch.idChambreHoraire = ?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    addClient: (req, res) => {
        let values = [
            req.body.nomClient,
            req.body.prenomClient,
            req.body.dateNaissanceClient,
            req.body.telClient,
            req.body.emailClient,
            req.body.passwordClient
        ];
        let sql = `INSERT INTO Client (nomClient, prenomClient, dateNaissanceClient, telClient, emailClient, passwordClient)
        VALUES (?,?,?,?,?,?)`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getClientMax: (req, res) => {
        let sql = `SELECT MAX(idClient) idClient FROM Client`;
        con.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    addReservation: (req, res) => {
        let values = [
            req.body.idReservation,
            req.body.dateReservation,
            req.body.etatReservation,
            req.body.idClient,
            req.body.idChambreHoraire
        ];
        let sql = `INSERT INTO Reservation (idReservation, dateReservation, etatReservation, idClient, idChambreHoraire)
        VALUES (?,?,?,?,?)`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    addServiceReservation: (req, res) => {
        let values = [
            req.body.idService,
            req.body.idReservation,
            req.body.qteService,
        ];
        let sql = `INSERT INTO ServiceReservation (idService, idReservation, qteService)
        VALUES (?,?,?)`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getClientConnexion: (req, res) => {
        let values = [
            req.params.emailClient,
            req.params.passwordClient,
        ];
        let sql = `SELECT idClient FROM Client WHERE emailClient = ? AND passwordClient = ?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getAllReservationByClient: (req, res) => {
        let values = [
            req.params.idClient
        ];
        let sql = `SELECT r.idReservation, r.dateReservation, r.etatReservation, ch.prixChambreHoraire, ph.heureArrive, ph.heureDepart, c.typeChambre, h.nomHotel, h.photoHotel, h.nbEtoileHotel
        FROM Reservation r, ChambreHoraire ch, Chambre c, Hotel h, PlageHoraire ph
        WHERE r.idChambreHoraire=ch.idChambreHoraire
        AND ch.idChambre=c.idChambre
        AND c.idHotel=h.idHotel
        AND ch.idPlageHoraire=ph.idPlageHoraire
        AND r.idClient=?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    getClientEmail: (req, res) => {
        let values = [
            req.params.idClient,
            req.params.emailClient
        ];
        let sql = `SELECT idClient FROM Client WHERE idClient=? AND emailClient=?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    },

    annulerReservation: (req, res) => {
        let values = [
            req.params.idReservation
        ];
        let sql = `UPDATE Reservation SET etatReservation = 'annuler' WHERE idReservation = ?`;
        con.query(sql, values, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    }

}

module.exports = controlers;



