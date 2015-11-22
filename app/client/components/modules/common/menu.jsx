App.Menu = React.createClass({
    leftButtons() {
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <a className="secondary icon button" href="#" onClick={Meteor.logout}>
                    <i className="fa fa-power-off"></i>
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
                <div className="left buttons">
                    {this.leftButtons()}
                </div>
                <div className="right buttons">
                    <button type="button" className="secondary icon button"><i className="fa fa-bars"></i></button>

                </div>
            </module>
        );
    }
});