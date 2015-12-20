Meteor.startup(function () {
  process.env.MANDRILL_API_KEY = 'wa8LQ2qa1N8KrL1t3uDPSA'
  process.env.MANDRILL_API_USER = 'dariusz.tarczynski@gmail.com'
// server code
Mandrill.config({
  username: process.env.MANDRILL_API_USER,  // the email address you log into Mandrill with. Only used to set MAIL_URL.
  key: process.env.MANDRILL_API_KEY  // get your Mandrill key from https://mandrillapp.com/settings/index
});
  Accounts.config({
    sendVerificationEmail: true
  });

});

Meteor.methods({
  sendPaymentConfirmatinoEmail: function (title, description, price) {
        Meteor.call('sendEmail',
            Meteor.user().emails[0].address,
            'Please Beer! Order confirmation',
            '<p>Thank you for submitting your order.</p><br/>Here are your order details:<br/><b>'+title+'</b><br/>'+description+'<br/>Price: '+price+' eur<br/>Your credit card will not be charged until your beer will receive the desired ammount of orders.</br><p>Please Beer team</p>');
  },
  sendEmail: function (to, subject, text) {
    console.log("Function sendEmail");
    this.unblock();
    try {
      var result = Mandrill.messages.send({
        "message": {
            "html": text,
            "subject": subject,
            "from_email": "pleasebeer@pleasebeer.com",
            "from_name": "Please Beer",
            "to": [{
                    "email": to
                }]}
      });
      console.log(result);
      return result;
    } catch (e) {
      return e;
    }
  }
});