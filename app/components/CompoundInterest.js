var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');
// import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'

var CompoundInterest = React.createClass({
  getDefaultProps() {
    return {
      FV: 0,
      PV: 0,
      TI: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      FV: this.props.FV,
      PV: this.props.PV,
      TI: this.props.TI
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("CIForm");
    form.reset();
    this.setState({formData: {}, FV: 0, PV: 0, TI: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doCITest({formData});
  },
  doCITest: function(data) {
    var fd = data.formData;
    if(fd.futureValue) {
      var res = this.doPVCalculation(fd.futureValue, fd.interestRate, fd.term);
      this.setState({FV: fd.futureValue});
      this.setState({PV: res});
      var totalInterest = this.doTICaluculation(fd.futureValue, res);
      this.setState({TI: totalInterest});
    } else {
      if(fd.presentValue && fd.interestRate && fd.term) {
        var res = this.doCICalculation(fd.presentValue, fd.interestRate, fd.term);
        this.setState({FV: res});
        this.setState({PV: fd.presentValue});
        var totalInterest = this.doTICaluculation(res, fd.presentValue);
        this.setState({TI: totalInterest});
      }
    }
  },
  doCICalculation(pv, i, t) {
    var pv = parseFloat(pv);
    var ir = 1 + parseFloat(i);
    var t = parseFloat(t);
    var interestOverYears = Math.pow(ir, t);
    var fv = pv * interestOverYears;
    return fv.toFixed(2);
  },
  doPVCalculation(fv, i, t) {
    var fv = parseFloat(fv);
    var ir = 1 + parseFloat(i);
    var t = parseFloat(t);
    var interestOverYears = Math.pow(ir, t);
    var pv = fv / interestOverYears;
    return pv.toFixed(2);
  },
  doTICaluculation(fv, pv) {
    var fv = parseFloat(fv);
    var pv = parseFloat(pv);
    var ti = fv - pv;
    return ti.toFixed(2);
  },
  render() {
    return (
        <Container id="topDiv">
          <Segment color="teal">
            <Header as="h2">Compound Interest</Header>
            <Divider />
            <Form id="CIForm" onSubmit={this.onFormSubmit}>
              <Form.Group widths="equal">
                <Form.Input label="Future Value" name="futureValue" placeholder="ex. 9500.50" /> =
                <Form.Input label="Present Value" name="presentValue" placeholder="ex. 5000" />
                <Form.Input label="( 1 + Interest Rate )" name="interestRate" placeholder="ex. 0.075" />
                <Form.Input label="to the power of Term" name="term" placeholder="ex. 12" />
              </Form.Group>
              <Button primary type="submit" size="big">Submit</Button>
              <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
              <Label size="big">Future Value: <Label.Detail>{this.state.FV}</Label.Detail></Label>
              <Label size="big">Present Value: <Label.Detail>{this.state.PV}</Label.Detail></Label>
              <Label size="big">Total Interest: <Label.Detail>{this.state.TI}</Label.Detail></Label>
            </Form>
          </Segment>
        </Container>
      )
    }
  });

module.exports = CompoundInterest;
