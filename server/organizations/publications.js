Meteor.publish("organizations:byId", function (_id) {
    check(_id, String);
    return Organizations.find({_id: _id});
});

Meteor.publish("organizations:owned", function () {
    return Organizations.find({owner: this.userId});
});
