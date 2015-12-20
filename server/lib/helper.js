var Future = Npm.require('fibers/future');

Meteor.methods({                                                               
  "ObjectID": function () { 
	return new Mongo.ObjectID();
  },
  "sendLogMessage": function(){
        return "Hello world";
    },
  "user:stripe-sync": function(){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "user:stripe-sync","params":[],"loginToken":"DpksFEBuVdwY_QkAYb9jxCX_o2DiBXPjyZsTZyRMS23"}});
	} catch(error) {
	 return error;
	}
  },
  "user:stripe-login": function(){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "user:stripe-login","params":[],"loginToken":"DpksFEBuVdwY_QkAYb9jxCX_o2DiBXPjyZsTZyRMS23"}});
	} catch(error) {
	 return error;
	}
  },
  "users:add-card": function(exp_month,exp_year,number){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "users:add-card","params":[{"exp_month":exp_month, "exp_year":exp_year,"number":number}],"loginToken":"DpksFEBuVdwY_QkAYb9jxCX_o2DiBXPjyZsTZyRMS23"}});
	} catch(error) {
	 return error;
	}
  },
  "users:delete-card": function(cardID){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "users:delete-card","params":[{"cardID":cardID}],"loginToken":"DpksFEBuVdwY_QkAYb9jxCX_o2DiBXPjyZsTZyRMS23"}});
	} catch(error) {
	 return error;
	}
  },
  "users:list-cards": function(token){
  	try {//Accounts._storedLoginToken(
  		if(!token) token = "DpksFEBuVdwY_QkAYb9jxCX_o2DiBXPjyZsTZyRMS23";
  		console.log("Function users:list-cards");
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "users:list-cards","params":[],"loginToken":token}});
	} catch(error) {
	 return error;
	}
  },
    "users:pay-for-beer": function(campaign, price, title, description, card){
  		console.log("Function users:pay-for-beer");
  		var f = new Future();
		HTTP.post("http://localhost:4000/call/", {data:{"method": "users:submit-payment","params":[{"campaignID":campaign, "ammount":price, "title":title, "description":description, "source":card}],"loginToken":"DpksFEBuVdwY_QkAYb9jxCX_o2DiBXPjyZsTZyRMS23"}}, function(error, result) {
        if (result)
        {
	        Meteor.call('sendPaymentConfirmatinoEmail', title, description, price);
	        f.return(result);
	    } else f.throw(error);
		});
		return f.wait();
  }


});