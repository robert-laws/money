var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var frequencies = [
  { key: '0', text: 'Years', value: 'years' },
  { key: '1', text: 'Months', value: 'months' },
  { key: '2', text: 'Weeks', value: 'weeks' },
  { key: '3', text: 'Days', value: 'days' }
]

var SimpleInterest = React.createClass({
  getDefaultProps() {
    return {
      SI: 0,
      PR: 0,
      IR: 0,
      TR: 0,
      TI: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      SI: this.props.SI,
      PR: this.props.PR,
      IR: this.props.IR,
      TI: this.props.TI
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("SIForm");
    form.reset();
    this.setState({formData: {}, SI: 0, PR: 0, IR: 0, TR: 0, TI: 0});
    debugger;
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doSITest({formData});
  },
  doSITest: function(data) {
    var fd = data.formData;
    if(fd.simpleInterest && fd.interestRate && fd.term && fd.frequency) {
      var freqVal = this.doFreqVal(fd.term, fd.frequency);
      var res = fd.simpleInterest / (fd.interestRate * freqVal);
      this.setState({SI: fd.simpleInterest});
      this.setState({PR: res.toFixed(2)});
      this.setState({IR: fd.interestRate});
      var totalInterest = this.doTICaluculation(fd.simpleInterest, res);
      this.setState({TI: totalInterest});
    } else if(fd.principal && fd.interestRate && fd.term && fd.frequency) {
      var freqVal = this.doFreqVal(fd.term, fd.frequency);
      var res = fd.principal * fd.interestRate * freqVal;
      this.setState({SI: res.toFixed(2)});
      this.setState({PR: fd.principal});
      this.setState({IR: fd.interestRate});
      var totalInterest = this.doTICaluculation(res, fd.principal);
      this.setState({TI: totalInterest});
    } else if(fd.simpleInterest && fd.principal && fd.term && fd.frequency) {
      var freqVal = this.doFreqVal(fd.term, fd.frequency);
      var ir = fd.simpleInterest / (fd.principal * freqVal);
      this.setState({SI: fd.simpleInterest});
      this.setState({PR: fd.principal});
      this.setState({IR: ir.toFixed(4)});
      var totalInterest = this.doTICaluculation(fd.simpleInterest, fd.principal);
      this.setState({TI: totalInterest});
    }
  },
  doFreqVal(t, f) {
    var tm = 0;
    switch(f) {
      case "years":
        tm = parseFloat(t);
        break;
      case "months":
        tm = parseFloat(t) / 12;
        break;
      case "weeks":
        tm = parseFloat(t) / 52;
        break;
      case "days":
        tm = parseFloat(t) / 365;
        break;
      default:
        tm = t;
    }
    return tm;
  },
  doTICaluculation(si, pr) {
    var si = parseFloat(si);
    var pr = parseFloat(pr);
    var ti = si + pr;
    return ti.toFixed(2);
  },
  render() {
    return (
      <Container id="topDiv">
        <Segment color="orange">
          <Header as="h2">Simple Interest</Header>
          <Divider />
          <Form id="SIForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Simple Interest" name="simpleInterest" placeholder="ex. 7000" /> =
              <Form.Input label="Principal" name="principal" placeholder="ex. 5000" />
              <Form.Input label="Interest Rate (as a decimal)" name="interestRate" placeholder="ex. 0.075" />
              <Form.Input label="Term" name="term" placeholder="ex. 12" />
              <Form.Select label='Frequency' name='frequency' options={frequencies} placeholder='Frequency' />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Simple Interest: <Label.Detail>{this.state.SI}</Label.Detail></Label>
            <Label size="big">Principal: <Label.Detail>{this.state.PR}</Label.Detail></Label>
            <Label size="big">Interest Rate: <Label.Detail>{this.state.IR}</Label.Detail></Label>
            <Label size="big">Interest & Principal Total: <Label.Detail>{this.state.TI}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = SimpleInterest;
