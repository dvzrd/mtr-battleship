App.Menu = React.createClass({
    renderButtons() {
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <a className="secondary icon button" href={RouterHelpers.pathFor('dashboard')}>
                    <i className="fa fa-user"></i>
                </a>
            );
        } else {
            return (
                <a className="secondary icon button" href={RouterHelpers.pathFor('login')}>
                    <i className="fa fa-plug"></i>
                </a>
            );
        }
    },
    render() {
        return (
            <module className="menu module">
                <div className="right buttons">
                    {this.renderButtons()}
                </div>
            </module>
        );
    }
});