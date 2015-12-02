App.Menu = React.createClass({
    PropTypes: {},
    getInitialState: function () {
        return {renderGameCreate: false};
    },
    shouldComponentUpdate() {
        return true;
    },
    handleCreateToggle(event) {
        event.preventDefault();

        this.setState({renderGameCreate: !this.state.renderGameCreate});
    },
    handleCompleteGameClick(event) {
        event.preventDefault();
        // @TODO: refactor - move this call into gameComplete with reactive gameId

        let gameId = FlowRouter.getParam('_id');

        Meteor.call('completeGame', gameId, (error) => {
            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {
                Bert.alert('Game completed!', 'success');
                FlowRouter.go('root');
            }
        });
    },
    handleChatToggle(event) {
        event.preventDefault();

        console.log('toggle chat module');
    },
    // @TODO: move to actions module
    renderLeftButton() {
        // @TODO: make a router helper
        if (FlowRouter.current().route.name === 'battle') {
            return (
                <button type="button" className="left secondary icon button" onClick={this.handleCompleteGameClick}>
                    <i className="fa fa-trash"></i>
                </button>
            )
        } else {
            return (
                <button type="button" className="left secondary icon button" onClick={this.handleCreateToggle}>
                    {this.state.renderGameCreate ? <i className="fa fa-times"></i> : <i className="fa fa-plus"></i>}
                </button>
            )
        }
    },
    renderRightButton() {
        // @TODO: make a router helper
        if (FlowRouter.current().route.name === 'root') {
            return (
                <a className="right secondary icon button" href={RouterHelpers.pathFor('dashboard')}>
                    <i className="fa fa-user"></i>
                </a>
            );
        }
        if (FlowRouter.current().route.name === 'battle') {
            return (
                <button type="button" className="right secondary icon button" onClick={this.handleChatToggle}>
                    <i className="fa fa-comments-o"></i>
                </button>
            );
        } else {
            return (
                <a className="right secondary icon button" href={RouterHelpers.pathFor('root')}>
                    <i className="fa fa-home"></i>
                </a>
            );
        }
    },
    renderButtons() {
        // @TODO: move these buttons into own component with propTypes for different button varieties
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <module className="actions module">
                    {this.renderLeftButton()}
                    {this.renderRightButton()}
                </module>

            );
        } else {
            return (
                <module className="actions module">
                    <a className="right secondary icon button" href={RouterHelpers.pathFor('login')}>
                        <i className="fa fa-plug"></i>
                    </a>
                </module>
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