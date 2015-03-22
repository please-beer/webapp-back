Meteor.publish("campaigns:public", function (limit) {
    check(limit, Match.Optional(Number));
    return Campaigns.find({
        public: true
    }, {
        limit: limit,
        fields: {
            imageUrl: 1,
            title: 1,
            public: 1
        }
    });
});

Meteor.publish("campaigns:byId", function (_id) {
    check(_id, String);
    return Campaigns.find({_id: _id});
});

Meteor.publish("campaigns:byOrganization", function (_id) {
    check(_id, String);
    return Campaigns.find({organizationId: _id});
});
