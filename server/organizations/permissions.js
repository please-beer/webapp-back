/*
*   INSERT POLICIES
*
*   - allow only logged-in users
*   - deny to users not in role `organizations`
*
*/

Organizations.allow({
    insert: function (userId) {
        return !!userId;
    }
});

Organizations.deny({
    insert: function (userId) {
        return !Roles.isUserInRole(userId, "organizations");
    }
});

/*
*   UPDATE POLICIES
*
*   - allow only logged-in users
*   - deny to users not in role `organizations`
*   - deny to non-owners
*   - deny changing the owner
*
*/

Organizations.allow({
    update: function (userId) {
        return !!userId;
    }
});

Organizations.deny({
    update: function (userId) {
        return !Roles.isUserInRole(userId, "organizations");
    }
});

Organizations.deny({
    insert: function (userId, organization) {
        return organization.owner !== userId;
    }
});

Organizations.deny({
    insert: function (userId, organization, fields) {
        return _.contains(fields, "owner");
    }
});

/*
*   REMOVE POLICIES
*
*   - no removes allowed
*
*/
