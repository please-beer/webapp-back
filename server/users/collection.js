var addressSchema = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        optional: true
    },
    postcode: {
        type: String,
        optional: true
    },
    country: {
        type: String,
        optional: true
    },
    state: {
        type: String,
        optional: true
    },
    mobileNumber: {
        type: String,
        optional: true
    },
    noteForDelivery: {
        type: String,
        optional: true
    },
    isDefault: {
        type: Boolean,
        defaultValue: false,
        optional: true
    }

});
var profileSchema = new SimpleSchema({
    name: {
        type: String,
        optional: true
    },
    username: {
        type: String,
        optional: true
    },
    pictureUrl: {
        type: String,
        optional: true
    },
    address: {
        type: [addressSchema],
        defaultValue: []
    },
});
var userSchema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    emails: {
        optional: true,
        type: [Object],
        custom: function () {
            console.log(this);
        }
    },
    "emails.$.address": {
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        optional: true,
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: String,
        optional: true,
        blackbox: true,
        allowedValues: ['users', 'organizations', 'admin']
    },
    profile: {
        type: profileSchema,
        optional: true
    }
});
Meteor.users.attachSchema(userSchema);
//UserDetails = new Mongo.Collection("user_details");
//UserDetails.attachSchema(userSchema);
