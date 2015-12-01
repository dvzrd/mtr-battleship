App.Logo = React.createClass({
    render() {
        return (
            <module className="logo module">
                <a className="logo" href={RouterHelpers.pathFor('root')}>Space <i className="fa fa-rocket"></i> Battle</a>
            </module>
        );
    }
});