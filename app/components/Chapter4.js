var React = require('react');
var { Container, Segment, Header, Divider, Label } = require('semantic-ui-react');

var FindPercentage = require('FindPercentage');
var AnnuityDefinitions = require('AnnuityDefinitions');
var FutureAnnuity = require('FutureAnnuity');
var AnnuityDue = require('AnnuityDue');
var PresentAnnuity = require('PresentAnnuity');
var PresentDue = require('PresentDue');

var Chapter4 = React.createClass({
  render: function() {
    return (
      <div>
        <Container className="onlyTopDiv">
          <Header as="h1">Chapter 4</Header>
        </Container>
        <AnnuityDefinitions />
        <FutureAnnuity />
        <AnnuityDue />
        <Divider />
        <PresentAnnuity />
        <PresentDue />
        <Container className="onlyTopDiv">
          <Header as="h1">Utilities</Header>
        </Container>
        <FindPercentage />
      </div>
    )
  }
});

module.exports = Chapter4;
