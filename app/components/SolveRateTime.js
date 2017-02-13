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

var SolveRateTime = React.createClass({
  getDefaultProps() {
    return {
      FV: 0,
      PV: 0,
      TI: 0,
      IR: 0,
      TM: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      FV: this.props.FV,
      PV: this.props.PV,
      TI: this.props.TI,
      IR: this.props.IR,
      TM: this.props.TM
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("SRTForm");
    form.reset();
    this.setState({formData: {}, FV: 0, PV: 0, TI: 0, IR: 0, TM: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doCITest({formData});
  },
  doCITest: function(data) {
    var fd = data.formData;
    if(fd.interestRate) {
      var res = this.doForTimeCalc(fd.futureValue, fd.presentValue, fd.interestRate, fd.frequency);
      var ir = parseFloat(fd.interestRate) * 100;
      this.setState({IR: ir});
      this.setState({TM: res});
    } else {
      if(fd.futureValue && fd.presentValue && fd.term) {
        var res = this.doForRateCalc(fd.futureValue, fd.presentValue, fd.term, fd.frequency);
        this.setState({IR: res});
        this.setState({TM: fd.term});
      }
    }
  },
  doForRateCalc(f, p, t, freq) {
    debugger;
    var finalVal = 0;
    var fv = parseFloat(f);
    var pv = parseFloat(p);
    var tm = parseFloat(t);
    var freqVal = this.doFreqVal(freq);
    tm = tm * freqVal;
    var leftSide = fv / pv;
    var newPower = 1 / tm;
    var res = Math.pow(leftSide, newPower) - 1;
    if(freqVal > 1) {
      finalVal = ((res * freqVal) * 100).toFixed(2);
    } else {
      finalVal = (res  * 100).toFixed(2);
    }
    return finalVal;
  },
  doForTimeCalc(f, p, i, freq) {
    debugger;
    var finalVal = 0;
    var fv = parseFloat(f);
    var pv = parseFloat(p);
    var ir = parseFloat(i);
    var freqVal = this.doFreqVal(freq);
    var top = Math.log(fv / pv);
    var bottom = Math.log(1 + (ir / freqVal));
    finalVal = (top / bottom) / freqVal;
    return finalVal.toFixed(2);
  },
  doTICaluculation(fv, pv) {
    var fv = parseFloat(fv);
    var pv = parseFloat(pv);
    var ti = fv - pv;
    return ti.toFixed(2);
  },
  doFreqVal(f) {
    var res = 0;
    switch(f) {
      case "annually":
        res = 1;
        break;
      case "semiannually":
        res = 2;
        break;
      case "quarterly":
        res = 4;
        break;
      case "monthly":
        res = 12;
        break;
      case "biweekly":
        res = 26;
        break;
      case "weekly":
        res = 52;
        break;
      case "daily":
        res = 365;
        break;
      case "dailybankers":
        res = 360;
        break;
      case "continously":
        res = 0
        break;
      default:
        res = 0;
    }
    return res;
  },
  render() {
    return (
        <Container id="topDiv">
          <Segment color="teal">
            <Header as="h2">Solve for Rate and Time</Header>
            <Divider />
            <Form id="SRTForm" onSubmit={this.onFormSubmit}>
              <Form.Group widths="equal">
                <Form.Input label="Future Value" name="futureValue" placeholder="ex. 9500.50" /> =
                <Form.Input label="Present Value" name="presentValue" placeholder="ex. 5000" />
                <Form.Input label="( 1 + Interest Rate )" name="interestRate" placeholder="ex. 0.075" />
                <Form.Input label="to the power of Term" name="term" placeholder="ex. 12" />
                <Form.Select label='Frequency' name='frequency' options={frequencies} placeholder='Frequency' />
              </Form.Group>
              <Button primary type="submit" size="big">Submit</Button>
              <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Interest Rate Value: <Label.Detail>{this.state.IR}%</Label.Detail></Label>
              <Label size="big">Term Value: <Label.Detail>{this.state.TM}</Label.Detail></Label>
            </Form>
          </Segment>
        </Container>
      )
    }
  });

module.exports = SolveRateTime;
