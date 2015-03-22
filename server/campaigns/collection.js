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
    organizationId: {
         type: String
    },
    title: {
        type: String,
        optional: true
    },
    startDate: {
        type: Number,
        optional: true
    },
    endDate: {
        type: Number,
        optional: true
    },
    imageUrl: {
        type: String,
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
