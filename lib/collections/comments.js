Comments = new Meteor.Collection("comments");

Meteor.methods({
    commentInsert: function(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);

        if (!post) {
            throw new Meteor.Error('invalid-comment', 'You must comment on a post!');
        }

        if (!commentAttributes.body) {
            throw new Meteor.Error('invalid-comment', 'Comment body can not be empty!');
        }

        var comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.emails[0].address,
            submitted: new Date()
        });

        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        comment._id = Comments.insert(comment);

        createCommentNotification(comment);

        return comment._id;
    }
});