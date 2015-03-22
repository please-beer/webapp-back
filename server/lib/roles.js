Roles = {
    isUserInRole: function (user, role) {
        check(user, Match.OneOf(null, String, Object));
        check(role, String);
        if (Match.test(user, String)) {
            user = Meteor.users.findOne({
                _id: user
            });
        }
        return user && _.contains(user.roles, role);
    }
};
