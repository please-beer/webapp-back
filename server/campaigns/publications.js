// Meteor.publish("campaigns:current", function (limit) {
//     check(limit, Match.Optional(Number));
//     return Campaigns.find({});
// });

Meteor.publish("campaigns:byId", function (_id) {
    check(_id, String);
    return Campaigns.find({_id: _id});
});

Meteor.publish("campaigns:byOrganization", function (_id) {
    check(_id, String);
    return Campaigns.find({organizationId: _id});
});
