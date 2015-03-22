var s3Config = Configurations.findOne({
    name: "s3"
});

Slingshot.fileRestrictions("pictures", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
    maxSize: 10 * 1024 * 1024
});

Slingshot.createDirective("pictures", Slingshot.S3Storage, {
    acl: "public-read",
    bucket: s3Config.bucket,
    region: s3Config.region,
    AWSAccessKeyId: s3Config.AWSAccessKeyId,
    AWSSecretAccessKey: s3Config.AWSSecretAccessKey,
    authorize: function () {
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }
        return true;
    },
    key: function (file) {
        return Random.hexString(32);
    }
});
