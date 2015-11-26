App.GameBoardCell = React.createClass({
    mixins: [ReactMeteorData],
    propTypes: {
        className: React.PropTypes.string,
        targetId: React.PropTypes.string,
        board: React.PropTypes.object
    },

    getInitialState: function () {
        return {targetSelected: false};
    },

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let user = Meteor.user(),
            boardId = this.props.board._id,
            selector = {boardId: boardId, owner: user.username},
            subscription = Meteor.subscribe('selections', selector);

        return {
            isLoading: !subscription.ready(),
            className: 'cell',
            selections: Selections.find({}, {sort: {createdAt: -1}}).fetch(),
            oldestSelection: Selections.findOne({}, {sort: {createdAt: 1}})
        };
    },

    // @TODO: break this up and move into a separate module
    // This has become a big mess, really need to break this up into functions
    // see /client/modules/game_create.js for reference

    handleCellTarget(event) {
        event.preventDefault();
        console.log(Meteor.user().username + ' clicked on ' + this.props.targetId);

        let user = Meteor.user(),
            board = this.props.board,
            targetCell = '#' + this.props.targetId,
            isBoardOwner = user.username === board.owner,
            unitPlacements = this.data.selections,
            oldestSelection = this.data.oldestSelection;

        if (isBoardOwner) {
            if (board.status === null) {
                let selectionAttributes = {
                    boardId: board._id,
                    selection: this.props.targetId
                };

                if (unitPlacements.length >= 5) {
                    console.log('five targets selected');
                    console.log(unitPlacements.length);

                    if ($(targetCell).hasClass('selected')) {
                        Bert.alert('You already selected this target', 'warning');
                    } else {
                        Meteor.call('removeSelection', oldestSelection._id, (error, removedSelection) => {
                            if (error) {
                                console.error(error.reason);
                            } else {
                                console.log(removedSelection);
                                console.log(unitPlacements.length);
                                $('#' + removedSelection).removeClass('selected');

                                Meteor.call('insertSelection', selectionAttributes, (error, selectionId) => {
                                    if (error) {
                                        console.error(error.reason);
                                    } else {
                                        console.log(selectionId);
                                        console.log(unitPlacements.length);
                                        //$(targetCell).addClass('selected');

                                        this.setState({targetSelected: true});

                                        this.data.className += ' selected';
                                    }
                                });
                            }
                        });
                    }
                } else {
                    Meteor.call('insertSelection', selectionAttributes, (error, selectionId) => {
                        if (error) {
                            console.error(error.reason);
                        } else {
                            console.log('selected target cell');
                            console.log(selectionId);
                            console.log(unitPlacements.length);
                            this.setState({targetSelected: true});

                            this.data.className += ' selected';
                            //$(targetCell).addClass('selected');
                        }
                    });
                }
            } else {
                Bert.alert('You cannot change unit positions when game is in progress', 'warning');
            }
        } else {
            if (board.status === 'defending') {
                $(targetCell).addClass('target');
            } else {
                Bert.alert('Waiting for opponent', 'warning');
            }
        }
    },

    render() {
        const {targetId} = this.props;

        let className = this.data.className;

        if (this.state.targetSelected) {
            className += ' selected';
        }

        return (
            <div className={className} id={targetId} onClick={this.handleCellTarget}></div>
        );
    }
});