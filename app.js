var express = require("express");
var app = new express();
app.set("view engine","ejs");
app.use(express.static("public"));


app.get('/',function(req,res){
    res.render("index");
});

app.post("/rcv/data", function(req,res){
  console.log(req.body);
  res.send("ok");
});
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server started");
});
