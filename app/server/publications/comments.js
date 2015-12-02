Meteor.publish('comments', function (selector) {
    check(selector, Object);
    return Comments.find(selector);
});
