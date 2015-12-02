App.GameComment = React.createClass({
    mixins: [],
    propTypes: {},

    // @TODO: comments, username from props - date from collection

    render() {
        return (
            <li className="comment item">
                <h4 className="user">
                    <span className="date">[date]</span> username:
                </h4>
                <p className="comment">comment</p>
            </li>
        );
    }
});