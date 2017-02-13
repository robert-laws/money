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

var EffectiveRate = React.createClass({
  getDefaultProps() {
    return {
      ER: 0,
      IR: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      ER: this.props.ER,
      IR: this.props.IR
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("SRTForm");
    form.reset();
    this.setState({formData: {}, ER: 0, IR: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doCITest({formData});
  },
  doCITest: function(data) {
    var fd = data.formData;
    if(fd.interestRate) {
      var res = this.doForERCalc(fd.interestRate, fd.frequency);
      this.setState({ER: res});
    }
  },
  doForERCalc(i, freq) {
    debugger;
    var finalVal = 0;
    var ir = parseFloat(i) / 100;
    var freqVal = this.doFreqVal(freq);
    var first = (ir / freqVal) + 1;
    var second = Math.pow(first, freqVal) - 1
    var finalVal = second * 100;
    return finalVal.toFixed(2);
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
            <Header as="h2">Effective Rate</Header>
            <Divider />
            <Form id="SRTForm" onSubmit={this.onFormSubmit}>
              <Form.Group widths="equal">
                <Form.Input label="Interest Rate" name="interestRate" placeholder="ex. 0.075" />
                <Form.Select label='Frequency' name='frequency' options={frequencies} placeholder='Frequency' />
              </Form.Group>
              <Button primary type="submit" size="big">Submit</Button>
              <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Effective Rate: <Label.Detail>{this.state.ER}%</Label.Detail></Label>
            </Form>
          </Segment>
        </Container>
      )
    }
  });

module.exports = EffectiveRate;
