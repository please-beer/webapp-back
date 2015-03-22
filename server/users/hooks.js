Accounts.onCreateUser(function (options, user) {
    user.profile = {};
    if (user.services.facebook) {
        user.profile.pictureUrl = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile.name = user.services.facebook.name;
        user.emails = [{
            address: user.services.facebook.email,
            verified: true
        }];
    }
    return user;
});
