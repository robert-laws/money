var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');
// import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'

var frequencies = [
  { key: '0', text: 'Annually', value: 'annually' },
  { key: '1', text: 'Semiannually', value: 'semiannually' },
  { key: '2', text: 'Quarterly', value: 'quarterly' },
  { key: '3', text: 'Monthly', value: 'monthly' },
  { key: '4', text: 'Biweekly', value: 'biweekly' },
  { key: '5', text: 'Weekly', value: 'weekly' },
  { key: '6', text: 'Daily', value: 'daily' },
  { key: '7', text: 'Daily (Bankers)', value: 'dailybankers' },
  { key: '8', text: 'Continously', value: 'continously' }
]

var CompoundingFrequencies = React.createClass({
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
    var form = document.getElementById("CIFreqForm");
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
      if(fd.frequency != "continously") {
        var freqVal = this.doFreqVal(fd.interestRate, fd.term, fd.frequency);
        var res = this.doPVCalculation(fd.futureValue, freqVal);
        this.setState({FV: fd.futureValue});
        this.setState({PV: res});
        var totalInterest = this.doTICaluculation(fd.futureValue, res);
        this.setState({TI: totalInterest});
      } else {
        var continousFreq = this.doCCalculation(fd.interestRate, fd.term);
        var res = this.doPVCalculation(fd.futureValue, continousFreq);
        this.setState({FV: fd.futureValue});
        this.setState({PV: res});
        var totalInterest = this.doTICaluculation(fd.futureValue, res);
        this.setState({TI: totalInterest});
      }
    } else {
      if(fd.presentValue && fd.interestRate && fd.term) {
        if(fd.frequency != "continously") {
          var freqVal = this.doFreqVal(fd.interestRate, fd.term, fd.frequency);
          var res = this.doCICalculation(fd.presentValue, freqVal);
          this.setState({FV: res});
          this.setState({PV: fd.presentValue});
          var totalInterest = this.doTICaluculation(res, fd.presentValue);
          this.setState({TI: totalInterest});
        } else {
          var continousFreq = this.doCCalculation(fd.interestRate, fd.term);
          var res = this.doCICalculation(fd.presentValue, continousFreq);
          this.setState({FV: res});
          this.setState({PV: fd.presentValue});
          var totalInterest = this.doTICaluculation(res, fd.presentValue);
          this.setState({TI: totalInterest});
        }
      }
    }
  },
  doCICalculation(pv, freqVal) {
    var pv = parseFloat(pv);
    var fv = pv * freqVal;
    return fv.toFixed(2);
  },
  doPVCalculation(fv, freqVal) {
    var fv = parseFloat(fv);
    var pv = fv / freqVal;
    return pv.toFixed(2);
  },
  doTICaluculation(fv, pv) {
    var fv = parseFloat(fv);
    var pv = parseFloat(pv);
    var ti = fv - pv;
    return ti.toFixed(2);
  },
  doFreqVal(i, t, f) {
    var ir = 0;
    var tm = 0;
    switch(f) {
      case "annually":
        ir = parseFloat(i);
        tm = parseFloat(t);
        break;
      case "semiannually":
        ir = parseFloat(i) / 2;
        tm = parseFloat(t) * 2;
        break;
      case "quarterly":
        ir = parseFloat(i) / 4;
        tm = parseFloat(t) * 4;
        break;
      case "monthly":
        ir = parseFloat(i) / 12;
        tm = parseFloat(t) * 12;
        break;
      case "biweekly":
        ir = parseFloat(i) / 26;
        tm = parseFloat(t) * 26;
        break;
      case "weekly":
        ir = parseFloat(i) / 52;
        tm = parseFloat(t) * 52;
        break;
      case "daily":
        ir = parseFloat(i) / 365;
        tm = parseFloat(t) * 365;
        break;
      case "dailybankers":
        ir = parseFloat(i) / 360;
        tm = parseFloat(t) * 360;
        break;
      case "continously":
        ir = 0;
        tm = 0;
        break;
      default:
        ir = 0;
        tm = 0;
    }
    var res = Math.pow((1 + ir), tm);
    return res;
  },
  doCCalculation(i, t) {
    var ir = parseFloat(i);
    var tm = parseFloat(t);
    var eVal = Math.E;
    var exponent = ir * tm;
    var ePower = Math.pow(eVal, exponent);
    return ePower;
  },
  render() {
    return (
        <Container id="topDiv">
          <Segment color="teal">
            <Header as="h2">Compounding Frequencies</Header>
            <Divider />
              <Form id="CIFreqForm" onSubmit={this.onFormSubmit}>
              <Form.Group widths="equal">
                <Form.Input label="Future Value" name="futureValue" placeholder="ex. 9500.50" /> =
                <Form.Input label="Present Value" name="presentValue" placeholder="ex. 5000" />
                <Form.Input label="( 1 + Interest Rate )" name="interestRate" placeholder="ex. 0.075" />
                <Form.Input label="to the power of Term" name="term" placeholder="ex. 12" />
                <Form.Select label='Frequency' name='frequency' options={frequencies} placeholder='Frequency' />
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

module.exports = CompoundingFrequencies;
