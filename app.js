var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Set UP


var campgrounds = [
    {name: "Salmon creek", image:"http://www.photosforclass.com/download/1342367857"},
    {name: "Granite Hill", image:"http://www.photosforclass.com/download/7121863467"} ,  
    {name: "Mountain Goat's Rest", image:"http://www.photosforclass.com/download/7626464792"}   
];


app.get("/",function(req, res){
    res.render("landing");
});

app.get("/campgrounds",function(req, res){

     res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds",function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image= req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //riderect back to campgrounds page
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpcamp Has Started!");
})