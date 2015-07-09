
if (Meteor.isServer) {
    Accounts.validateNewUser(function (user) {
        check(user, { services: { google: Object }, createdAt: Date, _id: String, profile: Object });

        var email = user.services.google.email || '@';
        if (email.split('@')[1] === Meteor.settings.emailDomain) { return true; }
        throw new Meteor.Error(403, "Invalid Email address ;)");
    });

    Accounts.onCreateUser(function(options, user) {
        check(options, { profile: Object });

        _.extend(options.profile, {email: user.services.google.email});
        user.profile = options.profile;
        return user;
    });
}