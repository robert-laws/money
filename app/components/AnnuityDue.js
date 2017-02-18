var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var frequencies = [
  { key: '0', text: 'Annually', value: 'annually' },
  { key: '1', text: 'Semiannually', value: 'semiannually' },
  { key: '2', text: 'Quarterly', value: 'quarterly' },
  { key: '3', text: 'Monthly', value: 'monthly' },
  { key: '4', text: 'Bimonthly', value: 'bimonthly' },
  { key: '5', text: 'Biweekly', value: 'biweekly' },
  { key: '6', text: 'Weekly', value: 'weekly' },
  { key: '7', text: 'Daily', value: 'daily' },
  { key: '8', text: 'Daily (Bankers)', value: 'dailybankers' },
  { key: '9', text: 'Continously', value: 'continously' }
]

var AnnuityDue = React.createClass({
  getDefaultProps: function() {
    return {
      FV: 0,
      PV: 0,
      IR: 0,
      TM: 0,
      TI: 0,
      CT: 0,
      FVAF: 0
    }
  },
  getInitialState: function() {
    return {
      formData: {},
      FV: this.props.FV,
      PV: this.props.PV,
      IR: this.props.IR,
      TM: this.props.TM,
      TI: this.props.TI,
      CT: this.props.CT,
      FVAF: this.props.FVAF
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("AnnuityD");
    form.reset();
    this.setState({formData: {}, FV: 0, PV: 0, IR: 0, TM: 0, TI: 0, CT: 0, FVAF: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doAnnuityD({formData});
  },
  doAnnuityD: function(data) {
    var fd = data.formData;
    var fv = fd.futureValue == '' ? '' : parseFloat(fd.futureValue);
    var pv = fd.presentValue == '' ? '' : parseFloat(fd.presentValue);
    var ir = fd.interestRate == '' ? '' : parseFloat(fd.interestRate);
    var freqVal = this.doFreqVal(fd.frequency);
    var snigh = this.getSnigh(ir, fd.term, freqVal);
    var res = 0;
    var contributions = 0;
    var totalInterest = 0;

    if(fv == '') {
      res = (pv * snigh * (1 + ir)).toFixed(2);
      contributions = (pv * freqVal * fd.term).toFixed(2)
      totalInterest = (res - contributions).toFixed(2);
      this.setState({FV: res});
      this.setState({PV: pv});
      this.setState({TI: totalInterest});
      this.setState({CT: contributions});
      this.setState({FVAF: snigh});
    } else if (pv == '') {
      res = ((fv / snigh) * (1 + ir)).toFixed(2);
      contributions = (res * freqVal * fd.term).toFixed(2)
      totalInterest = (fv - contributions).toFixed(2);
      this.setState({FV: fv});
      this.setState({PV: res});
      this.setState({TI: totalInterest});
      this.setState({CT: contributions});
      this.setState({FVAF: snigh});
    }
  },
  doFreqVal(f) {
    var freq = 0;
    switch(f) {
      case "annually":
        freq = 1;
        break;
      case "semiannually":
        freq = 2;
        break;
      case "quarterly":
        freq = 4;
        break;
      case "monthly":
        freq = 12;
        break;
      case "bimonthly":
        freq = 24;
        break;
      case "biweekly":
        freq = 26;
        break;
      case "weekly":
        freq = 52;
        break;
      case "daily":
        freq = 365;
        break;
      case "dailybankers":
        freq = 360;
        break;
      case "continously":
        freq = 1;
        break;
      default:
        freq = 1;
    }
    return freq;
  },
  getSnigh(i, t, f) {
    var snigh = 0;
    var nd = 0;
    var ir = 0;
    nd = parseFloat(t) * f
    ir = parseFloat(i) / f;
    snigh = (Math.pow((1 + ir), nd) - 1) / ir;
    return snigh;
  },
  render: function() {
    return (
      <Container className="topDiv">
        <Segment color="purple">
          <Header as="h2">Future Annuity of Annuity Due</Header>
          <Divider />
          <Form id="AnnuityD" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Future Value" name="futureValue" placeholder="ex. 7000.00" /> =
              <Form.Input label="Present Value" name="presentValue" placeholder="ex. 1200.00" />
              <Form.Input label="Interest Rate" name="interestRate" placeholder="ex. 0.072" />
              <Form.Input label="Term" name="term" placeholder="ex. 10" />
              <Form.Select label="Frequency" name="frequency" options={frequencies} placeholder="Frequency" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Future Value: <Label.Detail>{this.state.FV}</Label.Detail></Label>
            <Label size="big">Present Value: <Label.Detail>{this.state.PV}</Label.Detail></Label>
            <Label size="big">Contributions: <Label.Detail>{this.state.CT}</Label.Detail></Label>
            <Label size="big">Total Interest: <Label.Detail>{this.state.TI}</Label.Detail></Label>
            <Label size="big">Future Value Annuity Factor: <Label.Detail>{this.state.FVAF}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    );
  }
});

module.exports = AnnuityDue;
