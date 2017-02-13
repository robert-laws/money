var React = require('react');
var { Container } = require('semantic-ui-react');

var Page404 = React.createClass({
    render() {
        return (
            <Container id="topDiv">
                <h1>404 Error - Page Not Found</h1>
            </Container>
        )
    }
});

module.exports = Page404;
