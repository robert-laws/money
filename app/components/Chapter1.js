var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');
// import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'
var FindPercentage = require('FindPercentage');
var SimpleInterest = require('SimpleInterest');

var Chapter1 = React.createClass({
  render() {
    return (
        <div>
          <Container id="onlyTopDiv">
            <Header as="h1">Chapter 1</Header>
          </Container>
          <SimpleInterest />
          <FindPercentage />
        </div>
      )
    }
  });

module.exports = Chapter1;
