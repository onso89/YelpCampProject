var mongoose = require("mongoose"),
    Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data= [
          {
              name: "Business review",
              image: "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?auto=format&fit=crop&w=1650&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
              description: "bla bla bla",
          },
          {
              name: "Bloomberg review",
              image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=3155&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
              description: "bla bla bla",
          },
          {
              name: "Company Stock",
              image: "https://images.unsplash.com/photo-1427751840561-9852520f8ce8?auto=format&fit=crop&w=1655&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
              description: "bla bla bla",
          }
    ];

function seedDB(){
//REMOVE ALL CAMPGROUNDS
   Campground.remove({}, function (err) {
    if(err){
        console.log(err);
        } else {
                console.log("removed campgrounds");
                //ADD A FEW CAMPGROUNDS
                data.forEach(function(seed){
                    Campground.create(seed, function(err, campground){
                      if(err){
                          console.log(err);
                      } else {
                          console.log("Added Campground");
                          // ADD COMMENTS
                          Comment.create(
                              {
                                  text: "This place is great but wish it had internet",
                                  author: "James"
                              }, function(err, comment){
                                  if(err){
                                       console.log(err);
                                  } else{
                                       campground.comments.push(comment);
                                       campground.save();
                                       console.log("Created new Comments");
                                   }
                                }
                            );
                      }  
                  });  
                });
            }
    }); 
    
}    

module.exports = seedDB;