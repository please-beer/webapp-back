Accounts.onCreateUser(function (options, user) {
    user.profile = {};
    if (user.services.facebook) {
        user.profile.pictureUrl = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile.name = user.services.facebook.name;
        user.emails = [{
            address: user.services.facebook.email,
            verified: true
        }];
    } else 
        if (user.services.google) {
        user.profile.name = user.services.google.name;
        user.emails = [{
            address: user.services.google.email,
            verified: true
        }];
    }
    //async send email call
    Meteor.call('sendEmail',
            user.emails[0].address,
            'Welcome to Please Beer!',
            '<p>Thank you for registering your account, you can now log in and purchase your beer.</p><br/>Please Beer team.');

    return user;
});
