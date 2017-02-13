var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');
// import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'
var FindPercentage = require('FindPercentage');
var SimpleDiscount = require('SimpleDiscount');
var SimpleDiscountFormula = require('SimpleDiscountFormula');
var ArithmeticSequences = require('ArithmeticSequences');

var Chapter2 = React.createClass({
  render() {
    return (
        <div>
          <Container id="onlyTopDiv">
            <Header as="h1">Chapter 2</Header>
          </Container>
          <SimpleDiscount />
          <SimpleDiscountFormula />
          <ArithmeticSequences />
          <FindPercentage />
        </div>
      )
    }
  });

module.exports = Chapter2;
