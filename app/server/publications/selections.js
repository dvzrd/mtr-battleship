Meteor.publish('selections', function (selector) {
    check(selector, Object);
    return Selections.find(selector);
});
