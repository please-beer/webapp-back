Organizations.before.insert(function (userId, organization) {
    // Set (or overwrite) owner
    organization.owner = userId;
});
