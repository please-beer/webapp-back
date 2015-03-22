var rewardSchema = new SimpleSchema({
    price: {
        type: Number,
        optional: true
    },
    availableSupply: {
        type: Number,
        optional: true
    },
    description: {
        type: String,
        optional: true
    }
});

var campaignSchema = new SimpleSchema({
    // TODO
    // organizationId: {
    //     type: String
    // },
    title: {
        type: String
    },
    startDate: {
        type: Number,
        optional: true
    },
    endDate: {
        type: Number,
        optional: true
    },
    goal: {
        type: Number,
        optional: true
    },
    currency: {
        type: String,
        allowedValues: ["EUR", "USD"],
        optional: true
    },
    text: {
        type: String,
        optional: true
    },
    rewards: {
        type: [rewardSchema],
        defaultValue: []
    },
    public: {
        type: Boolean,
        defaultValue: false
    }
});

Campaigns = new Mongo.Collection("campaigns");
Campaigns.attachSchema(campaignSchema);
