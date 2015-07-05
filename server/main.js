/**
 * Created by terkalma on 7/4/15.
 */
Meteor.publish("posts", function() {
   return Posts.find();
});