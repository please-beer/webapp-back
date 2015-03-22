/*
*   INSERT POLICIES
*
*   - only allow logged-in users to insert campaigns
*   - deny users without an organization to insert a campaign
*
*/

Campaigns.allow({
    insert: function (userId) {
        return !!userId;
    }
});

/*
*   UPDATE POLICIES
*
*   - no updates allowed
*
*/

//TODO
Campaigns.allow({
    update: function () {
        return true;
    }
});

/*
*   REMOVE POLICIES
*
*   - no removes allowed
*
*/
