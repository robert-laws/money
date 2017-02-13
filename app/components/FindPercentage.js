var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');
// import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'

var FindPercentage = React.createClass({
  getDefaultProps() {
    return {
      PasD: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      PasD: this.props.PasD
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("PasDForm");
    form.reset();
    this.setState({formData: {}, PasD: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doPasDTest({formData});
  },
  doPasDTest: function(data) {
    var fd = data.formData;
    if(fd.firstNumber && fd.secondNumber && fd.thirdNumber) {
      var res = this.doPasDCalculation(fd.firstNumber, fd.secondNumber, fd.thirdNumber);
      this.setState({PasD: res});
    }
  },
  doPasDCalculation(first, second, third) {
    var first = parseFloat(first);
    var second = parseFloat(second);
    var third = parseFloat(third);

    var s1 = first * third;
    var s2 = s1 + second;
    var s3 = (s2 / third) / 100;

    return s3.toFixed(5);
  },
  render() {
    return (
        <Container id="topDiv">
          <Segment color="red">
            <Header as="h2">Percentage as a Decimal</Header>
            <Divider />
            <Form id="PasDForm" onSubmit={this.onFormSubmit}>
              <Form.Group widths="equal">
                <Form.Input label="First Number" name="firstNumber" placeholder="ex. 5" />
                <Form.Input label="Second Number" name="secondNumber" placeholder="ex. 4" />
                <Form.Input label="Third Number" name="thirdNumber" placeholder="ex. 7" />
              </Form.Group>
              <Button primary type="submit" size="big">Submit</Button>
              <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
              <Label size="big">Percentage as Decimal: <Label.Detail>{this.state.PasD}</Label.Detail></Label>
            </Form>
          </Segment>
        </Container>
      )
    }
  });

module.exports = FindPercentage;
