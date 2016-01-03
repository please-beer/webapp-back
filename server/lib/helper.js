var Future = Npm.require('fibers/future');

Meteor.methods({                                                               
  "ObjectID": function () { 
	return new Mongo.ObjectID();
  },
  "sendLogMessage": function(){
        return "Hello world";
    },
  "user:stripe-sync": function(loginToken){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "user:stripe-sync","params":[],"loginToken":loginToken}});
	} catch(error) {
	 return error;
	}
  },
  "user:stripe-login": function(loginToken){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "user:stripe-login","params":[],"loginToken":loginToken}});
	} catch(error) {
	 return error;
	}
  },
  "users:add-card": function(exp_month,exp_year,number, loginToken){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "users:add-card","params":[{"exp_month":exp_month, "exp_year":exp_year,"number":number}],"loginToken":loginToken}});
	} catch(error) {
	 return error;
	}
  },
  "users:delete-card": function(cardID, loginToken){
  	try {
	return HTTP.post("http://localhost:4000/call/", {data:{"method": "users:delete-card","params":[{"cardID":cardID}],"loginToken":loginToken}});
	} catch(error) {
	 return error;
	}
  },
  "users:list-cards": function(loginToken){
  		console.log("Function users:list-cards");
  		var f = new Future();
	    HTTP.post("http://localhost:4000/call/", {data:{"method": "users:list-cards","params":[],"loginToken":loginToken}}, function(error, result) {
    		console.log(result);
	    	console.log(error);
	    	if (result)
	    	{
	    		f.return(result);
	    	} else f.throw(error);
	    });
	    return f.wait();
  },
    "users:pay-for-beer": function(campaign, price, title, description, card, loginToken){
  		console.log("Function users:pay-for-beer");
  		var f = new Future();
		HTTP.post("http://localhost:4000/call/", {data:{"method": "users:submit-payment","params":[{"campaignID":campaign, "ammount":price, "title":title, "description":description, "source":card}],"loginToken":loginToken}}, function(error, result) {
        if (result)
        {
	        Meteor.call('sendPaymentConfirmatinoEmail', title, description, price);
	        f.return(result);
	    } else f.throw(error);
		});
		return f.wait();
  }


});