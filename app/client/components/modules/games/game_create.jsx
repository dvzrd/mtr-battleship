App.GameCreate = React.createClass({
    componentDidMount() {
        Modules.client.gameCreate({
            form: '#gameCreate'
        });
    },
    propTypes: {
        isActive: React.PropTypes.bool,
        className: React.PropTypes.string
    },
    shouldComponentUpdate() {
        return true;
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    renderForm() {
        return (
            <form id="gameCreate" className="create game form" onSubmit={this.handleSubmit}>
                <div className="input group">
                    <label className="label" htmlFor="title"><i className="fa fa-rocket"></i></label>
                    <input type="text" name="title" className="title input" placeholder="Title of your game"
                           autofocus/>
                </div>
                <button type="submit" className="primary centered button">Create Game</button>
            </form>
        );
    },
    render() {
        let className = 'animated fadeInUp create game module';

        if (this.props.isActive) {
            className += ' active';
        }

        return (
            <module className={className}>
                {this.renderForm()}
            </module>
        );
    }
});