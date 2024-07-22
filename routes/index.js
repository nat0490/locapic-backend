var express = require('express');
var router = express.Router();
const { checkBody } = require('../module/checkBody');
const Marker = require('../models/markers');


//POST /places : ajout d’un marqueur en base de données (via req.body)
router.post('/places', (req,res) => {
    const { nickname , name, latitude, longitude } = req.body;
    if(checkBody(req.body, ["nickname" , "name", "latitude", "longitude" ])) {
        const newMarker = new Marker({
            nickname,
            name, 
            latitude, 
            longitude,
        });
        newMarker.save().then(()=> res.json({result: true}))
    } else {
        res.json({result: false});
    }
});

//GET /places/:nickname : récupération de tous les marqueurs d’un utilisateur en fonction de son surnom (via req.params)
router.get('/places/:nickname', (req, res)=> {
    Marker.find({nickname : req.params.nickname})
        .then(markerFind => {
            if(markerFind) {
                res.json({result: true, places: markerFind});
                console.log(markerFind);
            } else {
                res.json({result: false})
            }});
});




//DELETE /places : suppression d’un marqueur à partir de son nom et du surnom de l’utilisateur (via req.body)
router.delete('/places', (req,res)=> {
    const { nickname , name } = req.body;
    if (checkBody( req.body, ["nickname" , "name"])) {
        Marker.deleteOne({ nickname , name })
            .then((markerDeleted) => {
                if (markerDeleted.deletedCount === 0) {
                    res.json({result: false})
                } else {
                    res.json({result: true});
                }
            })
    } else { res.json ({ result: false, error : "no data found"})}
});

module.exports = router;
