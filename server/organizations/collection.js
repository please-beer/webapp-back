var organizationSchema = new SimpleSchema({
    owner: {
        type: String,
        // Always set before insert by a hook
        optional: true
    },
    name: {
        type: String,
        optional: true
    },
    logoUrl: {
        type: String,
        optional: true
    },
    location: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    website: {
        type: String,
        optional: true
    }
});

Organizations = new Mongo.Collection("organizations");
Organizations.attachSchema(organizationSchema);
