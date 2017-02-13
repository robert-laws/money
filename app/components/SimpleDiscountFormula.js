var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var frequencies = [
  { key: '0', text: 'Years', value: 'years' },
  { key: '1', text: 'Months', value: 'months' },
  { key: '2', text: 'Weeks', value: 'weeks' },
  { key: '3', text: 'Days', value: 'days' }
]

var SimpleDiscountFormula = React.createClass({
  getDefaultProps() {
    return {
      DS: 0,
      MV: 0,
      DR: 0,
      TM: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      DS: this.props.DS,
      MV: this.props.MV,
      DR: this.props.DR,
      TM: this.props.TM
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("SDFForm");
    form.reset();
    this.setState({formData: {}, DS: 0, MV: 0, DR: 0, TM: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doSDFTest({formData});
  },
  doSDFTest: function(data) {
    var fd = data.formData;
    debugger;
    if(fd.discount && fd.maturityValue && fd.discountRate) {
      var tm = fd.discount / (fd.maturityValue * fd.discountRate);
      this.setState({DS: fd.discount});
      this.setState({MV: fd.maturityValue});
      this.setState({DR: fd.discountRate});
      this.setState({TM: tm});
    } else if(fd.discount && fd.maturityValue && fd.term) {
      var freqVal = this.doFreqVal(fd.term, fd.frequency);
      var dr = fd.discount / (fd.maturityValue * freqVal);
      this.setState({DS: fd.discount});
      this.setState({MV: fd.maturityValue});
      this.setState({DR: dr.toFixed(4)});
      this.setState({TM: fd.term});
    } else if(fd.discount && fd.discountRate && fd.term) {
      var freqVal = this.doFreqVal(fd.term, fd.frequency);
      var mv = fd.discount / (fd.discountRate * freqVal);
      this.setState({DS: fd.discount});
      this.setState({MV: mv.toFixed(2)});
      this.setState({DR: fd.discountRate});
      this.setState({TM: fd.term});
    } else if(fd.maturityValue && fd.discountRate && fd.term) {
      var freqVal = this.doFreqVal(fd.term, fd.frequency);
      var ds = fd.maturityValue * fd.discountRate * freqVal;
      this.setState({DS: ds.toFixed(2)});
      this.setState({MV: fd.maturityValue});
      this.setState({DR: fd.discountRate});
      this.setState({TM: fd.term});
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
  render() {
    return (
      <Container id="topDiv">
        <Segment color="olive">
          <Header as="h2">Simple Discount Formula</Header>
          <Divider />
          <Form id="SDFForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Discount" name="discount" placeholder="ex. 500" /> =
              <Form.Input label="Maturity Value" name="maturityValue" placeholder="ex. 5000" />
              <Form.Input label="Discount Rate" name="discountRate" placeholder="ex. 4500" />
              <Form.Input label="Term" name="term" placeholder="ex. 12" />
              <Form.Select label='Frequency' name='frequency' options={frequencies} placeholder='Frequency' />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Discount: <Label.Detail>{this.state.DS}</Label.Detail></Label>
            <Label size="big">Maturity Value: <Label.Detail>{this.state.MV}</Label.Detail></Label>
            <Label size="big">Discount Rate<Label.Detail>{this.state.DR}</Label.Detail></Label>
            <Label size="big">Term<Label.Detail>{this.state.TM}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = SimpleDiscountFormula;
