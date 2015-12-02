App.GameComment = React.createClass({
    mixins: [],
    propTypes: {},

    // @TODO: comments, username from props - date from collection

    render() {
        return (
            <li className="comment item">
                <h4 className="user">
                    username <small className="date">date</small>
                </h4>
                <p className="comment">comment</p>
            </li>
        );
    }
});