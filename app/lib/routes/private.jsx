const privateRedirect = () => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
        FlowRouter.go('login');
    }
};

const privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [privateRedirect]
});

privateRoutes.route('/battle/:name', {
    name: 'battle',
    action(params) {
        ReactLayout.render(App.Layout, {
            view: <App.Battle id={params.id} />
        });
    }
});

privateRoutes.route('/dashboard', {
    name: 'dashboard',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Dashboard />});
    }
});