App.GameCreate = React.createClass({
    mixins: [ReactMeteorData],

    propTypes: {
        isActive: React.PropTypes.bool,
        className: React.PropTypes.string
    },

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        return {
            isActive: this.props.isActive
        }
    },

    handleSubmit(event) {
        event.preventDefault();

        let gameAttributes = {
            title: $('[name="title"]').val()
        }, currentUser = Meteor.user();

        if (!currentUser) {
            Bert.alert('You need to be logged in to create games', 'warning');
        }
        if (gameAttributes.title === '') {
            Bert.alert('Your game needs a title so others can find it', 'warning');
        } else {
            Meteor.call('createGame', gameAttributes, (error, gameId) => {
                let pathDef = '/battle/:_id',
                    params = gameId,
                    path = FlowRouter.path(pathDef, params);

                if (error) {
                    Bert.alert(error.reason, 'warning');
                } else {
                    //@TODO: find a better way to toggle this modal
                    $('.create.game.module.active').removeClass('active');

                    Bert.alert('Game created!', 'success');

                    // @TODO: refactor this call to gameBoardCreate module
                    let gameAttributes = {
                        gameId: gameId._id
                    };

                    Meteor.call('createGameBoard', gameAttributes, (error) => {
                        if (error) {
                            console.error(error.reason);
                        } else {
                            FlowRouter.go(path);
                        }
                    });
                }
            });
        }
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

        if (this.data.isActive) {
            className += ' active';
        }

        return (
            <module className={className}>
                {this.renderForm()}
            </module>
        );
    }
});