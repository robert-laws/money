var React = require('react');
var { Container, Segment, Header, Divider, Label } = require('semantic-ui-react');

var FindPercentage = require('FindPercentage');
var SalesTax = require('SalesTax');
var TaxableIncome = require('TaxableIncome');

var Chapter12 = React.createClass({
  render: function() {
    return (
      <div>
        <Container className="onlyTopDiv">
          <Header as="h1">Chapter 12</Header>
        </Container>
        <SalesTax />
        <TaxableIncome />
        <Container className="onlyTopDiv">
          <Header as="h1">Utilities</Header>
        </Container>
        <FindPercentage />
      </div>
    )
  }
});

module.exports = Chapter12;
