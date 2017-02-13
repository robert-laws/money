var React = require('react');
var { Link } = require('react-router');
var { Container, Header, Segment, Divider, Message, Image, List, Icon } = require('semantic-ui-react');

var Footer = React.createClass({
    render() {
        return (
            <Segment vertical inverted className="footer">
                <Container>
                    <div className="ui stackable inverted divided equal height stackable grid">
                        <div className="three wide column">
                            <Header as="h4" inverted>About</Header>
                            <List inverted link>
                                <List.Item>
                                    <Link className="item" to="/">Sitemap</Link>
                                </List.Item>
                                <List.Item>
                                    <Link className="item" to="/">Contact Us</Link>
                                </List.Item>
                                <List.Item>
                                    <Link className="item" to="/">Multimedia</Link>
                                </List.Item>
                                <List.Item>
                                    <Link className="item" to="/">Affiliations</Link>
                                </List.Item>
                            </List>
                        </div>
                        <div className="three wide column">
                            <Header as="h4" inverted>Other Projects</Header>
                            <List inverted link>
                                <List.Item>
                                    <Link className="item" to="/">More Money</Link>
                                </List.Item>
                                <List.Item>
                                    <Link className="item" to="/">Adobe Portfolio</Link>
                                </List.Item>
                                <List.Item>
                                    <Link className="item" to="/">Behance</Link>
                                </List.Item>
                                <List.Item>
                                    <Link className="item" to="/">Creative Cloud</Link>
                                </List.Item>
                            </List>
                        </div>
                        <div className="seven wide column">
                            <Header as="h4" inverted>money.libtech.georgetown.domains</Header>
                            <p>"Sometimes understanding how to calculate the value of money is easier said than done."</p>
                        </div>
                    </div>
                </Container>
            </Segment>
        )
    }
});

module.exports = Footer;
