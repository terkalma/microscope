/**
 * Created by terkalma on 7/4/15.
 */
Meteor.publish("posts", function(options) {
    check(options, {
        sort: {submitted: Number},
        limit: Number
    });
    return Posts.find({}, options);
});

Meteor.publish("post", function(id) {
    check(id, String);
    return Posts.find(id);
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
    if (this.userId) {
        return Notifications.find({userId: this.userId, read: false});
    }

    // returning an array which we can iterate through.
    return [];
});