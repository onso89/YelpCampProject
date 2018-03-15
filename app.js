var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
var Campground = require("./models/campground"),
    seedDB     = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/",function(req, res){
    res.render("landing");
});

// INDEX route 
app.get("/campgrounds",function(req, res){
     //  Retrieve all campgrounds from DB
     Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
            res.render("index", {campgrounds: allCampgrounds}); 
         }
     });
});

// CREATE  - add new campground to DB
app.post("/campgrounds",function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image= req.body.image;
    var desc= req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create and add Campground to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else {
        //riderect back to campgrounds page
         res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//Show - More info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campgroud with the provided ID and 
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
        console.log(foundCampground);    
        //render show template with that ID
         res.render("show", {campgroud: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpcamp Has Started!");
})