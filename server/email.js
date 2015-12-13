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
  sendEmail: function (to, subject, text) {
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