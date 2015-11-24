App.Menu = React.createClass({
    PropTypes: {},
    getInitialState: function () {
        return {renderGameCreate: false};
    },
    handleCreateClick: function () {
        this.setState({renderGameCreate: !this.state.renderGameCreate});
    },
    handleCompleteGameClick: function () {
        console.log('call completeGame method');
    },
    renderActiveButton() {
        // @TODO: move this login into button component
        if (FlowRouter.current().route.name === 'battle') {
            return (
                <button type="button" className="left secondary icon button" onClick={this.handleCompleteGameClick}>
                    <i className="fa fa-trash"></i>
                </button>
            )
        } else {
            return (
                <button type="button" className="left secondary icon button" onClick={this.handleCreateClick}>
                    {this.state.renderGameCreate ? <i className="fa fa-times"></i> : <i className="fa fa-plus"></i>}
                </button>
            )
        }
    },
    renderButtons() {
        // @TODO: move these buttons into own component with propTypes for different button varieties
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <div className="buttons">
                    {this.renderActiveButton()}
                    <a className="right secondary icon button" href={RouterHelpers.pathFor('dashboard')}>
                        <i className="fa fa-user"></i>
                    </a>
                </div>

            );
        } else {
            return (
                <a className="right secondary icon button" href={RouterHelpers.pathFor('login')}>
                    <i className="fa fa-plug"></i>
                </a>
            );
        }
    },
    render() {
        return (
            <module className="menu module">
                {this.renderButtons()}
                <App.GameCreate isActive={!!this.state.renderGameCreate}/>
            </module>
        );
    }
});