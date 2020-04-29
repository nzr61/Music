var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Music');

router.get('/', function(req, res) {
var collection = db.get('Albums'); collection.find({}, function(err, albums){
if (err) throw err; res.json(albums);
});
});
router.post('/', function(req, res){ var collection = db.get('Albums'); collection.insert({
    name: req.body.name, author: req.body.author, rep: req.body.rep
    }, function(err, albums){
    if (err) throw err;
    
    res.json(albums);
    });
    });  
    router.get('/:id', function(req, res) {
        var collection = db.get('Albums');
        collection.findOne({ _id: req.params.id }, function(err, album){
        if (err) 
        throw err;
        
        res.json(album);
        });
        });
        router.put('/:id', function(req, res){
             var collection = db.get('Albums'); 
             collection.update({
            _id: req.params.id
            },
            {$set:{
                name: req.body.name, author: req.body.author, rep: req.body.rep}
            }, function(err, album){
            if (err) throw err;
            
            res.json(album);
            });
            });
            router.delete('/:id', function(req, res){
                var collection = db.get('Albums');
                collection.remove({ _id: req.params.id }, function(err, album){
                if (err) throw err;
                
                res.json(album);
                });
                });
                
module.exports = router;
