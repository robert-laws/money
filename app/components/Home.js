var React = require('react');
var { Link } = require('react-router');
var { Container, Header, Divider, Segment, Message, Image, Icon } = require('semantic-ui-react');

var Home = React.createClass({
    render() {
        return (
            <Container>
                <Segment vertical>
                    <Header as="h1">
                      Money, Banking, and Finance - Tools
                    </Header>
                    <Divider />
                    <Image src="img/money.jpg" fluid />
                    <Divider />
                </Segment>
            </Container>
        )
    }
});

module.exports = Home;
