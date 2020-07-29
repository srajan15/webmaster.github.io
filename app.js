const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/Signup", {useNewUrlParser: true});



	app.get("/",function(req,res){
		res.sendFile(__dirname + "/index.html");		

	});
	
	//get req from form data
	app.post("/",function(req,res){
	
		const usrName = req.body.userNames;
		const email = req.body.emails;
		const comment = req.body.comments;
		
		const data = {
			uName:usrName,
			mail:email,
			cmt:comment
			};
		const JsonData = JSON.stringify(data);
		
		//database code		
		const itemsSchema = new mongoose.Schema({
  			name:String,
  			emaill:String,
  			comments:String
  
});
let Item = mongoose.models.Item || mongoose.model('Item', itemsSchema);

	//const Item = mongoose.model("Item", itemsSchema);

const item = new Item({
  name:usrName,
  emaill:email,
  comments:comment
});

item.save(function(err){
	if(err){
		console.log(err);
		}
	else{
		console.log("successfull");	
	}
});

 res.sendFile(__dirname + '/form.html');

})

app.listen(4000,function(){
	console.log("server is runnning on 4000");
});
