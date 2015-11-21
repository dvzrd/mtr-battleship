const publicRedirect = () => {
    if (Meteor.userId()) {
        FlowRouter.go('root');
    }
};

const publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [publicRedirect]
});

publicRoutes.route('/', {
    name: 'root',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Root />});
    }
});

publicRoutes.route('/leaderboard', {
    name: 'leaderboard',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Leaderboard />});
    }
});

publicRoutes.route('/signup', {
    name: 'signup',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Signup />});
    }
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Login />});
    }
});

publicRoutes.route('/recover-password', {
    name: 'recoverPassword',
    action() {
        ReactLayout.render(App.Layout, {view: <App.RecoverPassword />});
    }
});

publicRoutes.route('/reset-password/:token', {
    name: 'resetPassword',
    action() {
        ReactLayout.render(App.Layout, {view: <App.ResetPassword />});
    }
});