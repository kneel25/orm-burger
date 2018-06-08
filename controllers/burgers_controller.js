var express = require("express");

var router = express.Router();

var burgers = require("../models/burgers.js");

var methodOverride = require('method-override');

//Routes

//Main Index 
router.get("/", function (req, res) {
    burgers.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    })
})
//Create a new burger
router.post("/api/burgers", function (req, res) {
    burgers.create(["burger_name", "devoured"], [req.body.burger_name, false], function (result) {
        // Send back the ID of the new quote
        res.redirect("/");
        console.log("POST");
    });
});
//Eat a buger
router.put("/api/update/:id", function (req, res) {
    var condition = "id = " + req.params.id
    burgers.update({
        devoured: true
    }, condition, function (result) {
        res.redirect("/");
    })
})
//API 
router.get("/api", function (req, res) {
    burgers.all(function (data) {
        res.json(data);
    })
})


module.exports = router;