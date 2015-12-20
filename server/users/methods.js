var generateLoginToken = function(){  
    var stampedToken = Accounts._generateStampedLoginToken();
    return [
        stampedToken,
        Accounts._hashStampedToken(stampedToken)
    ];
};

var saveLoginToken = function(userId){  
    return Meteor.wrapAsync(function(userId, tokens, cb){
        // In tokens array first is stamped, second is hashed
        // Save hashed to Mongo
        Meteor.users.update(userId, {
            $push: {
                'services.resume.loginTokens': tokens[1]
            }
        }, function(error){
            if (error){
                cb(new Meteor.Error(500, 'Couldnt save login token into user profile'));
            }else{
                // Return stamped to user
                cb && cb(null, [200,tokens[0].token]);
            }
        });
    })(userId, generateLoginToken());
};

Meteor.methods({  
    'refresh-login-token': function(userID){
        return saveLoginToken(userID);
    }
});