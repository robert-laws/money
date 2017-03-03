var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var CapitalGains = React.createClass({
  getDefaultProps() {
    return {
      GR: 0,
      FV: 0,
      PV: 0,
      TM: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      GR: this.props.GR,
      FV: this.props.FV,
      PV: this.props.PV,
      TM: this.props.TM
    }
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doCapGTest({formData});
  },
  doCapGTest: function(data) {
    var fd = data.formData;
    var gr = fd.growthRate == '' ? '' : parseFloat(fd.growthRate);
    var fv = fd.futureValue == '' ? '' : parseFloat(fd.futureValue);
    var pv = fd.presentValue == '' ? '' : parseFloat(fd.presentValue);
    var tm = fd.term == '' ? '' : parseFloat(fd.term);
    var res = 0;
    var n = 0;

    if(gr == '') {
      n = 1 / tm;
      res = ((Math.pow((fv / pv), n) - 1) * 100).toFixed(2);

      this.setState({
        GR: res,
        FV: fv,
        PV: pv,
        TM: tm
      })
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("CapGForm");
    form.reset();
    this.setState({formData: {}, GR: 0, FV: 0, PV: 0, TM: 0});
    debugger;
  },
  render: function() {
    return (
      <Container className="topDiv">
        <Segment color="green">
          <Header as="h2">Capital Gains</Header>
          <Divider />
          <Form id="CapGForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Compound Growth Rate" name="growthRate" placeholder="ex. 23.63" /> =
              <Form.Input label="Future Value" name="futureValue" placeholder="ex. 54.23" />
              <Form.Input label="Present Value" name="presentValue" placeholder="ex. 34.60" />
              <Form.Input label="Term" name="term" placeholder="ex. 5" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Compound Growth Rate: <Label.Detail>{this.state.GR}%</Label.Detail></Label>
            <Label size="big">Future Value: <Label.Detail>{this.state.FV}</Label.Detail></Label>
            <Label size="big">Present Value: <Label.Detail>{this.state.PV}</Label.Detail></Label>
            <Label size="big">Term: <Label.Detail>{this.state.TM}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = CapitalGains;
