var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var SimpleDiscount = React.createClass({
  getDefaultProps() {
    return {
      MV: 0,
      DS: 0,
      PR: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      MV: this.props.MV,
      DS: this.props.DS,
      PR: this.props.PR
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("SDForm");
    form.reset();
    this.setState({formData: {}, MV: 0, DS: 0, PR: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doSDTest({formData});
  },
  doSDTest: function(data) {
    var fd = data.formData;
    if(fd.maturityValue && fd.proceeds) {
      var ds = fd.maturityValue - fd.proceeds;
      this.setState({MV: fd.maturityValue});
      this.setState({DS: ds.toFixed(2)});
      this.setState({PR: fd.proceeds});
    } else if(fd.maturityValue && fd.discount) {
      var pr = fd.maturityValue - fd.discount;
      this.setState({MV: fd.maturityValue});
      this.setState({DS: fd.discount});
      this.setState({PR: pr.toFixed(2)});
    } else if(fd.proceeds && fd.discount) {
      debugger;
      var mv = parseFloat(fd.proceeds) + parseFloat(fd.discount);
      this.setState({MV: mv.toFixed(2)});
      this.setState({DS: fd.discount});
      this.setState({PR: fd.proceeds});
    }
  },
  render() {
    return (
      <Container id="topDiv">
        <Segment color="olive">
          <Header as="h2">Simple Discount</Header>
          <Divider />
          <Form id="SDForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Maturity Value" name="maturityValue" placeholder="ex. 5000" /> =
              <Form.Input label="Proceeds" name="proceeds" placeholder="ex. 4500" />
              <Form.Input label="Discount" name="discount" placeholder="ex. 500" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Maturity Value: <Label.Detail>{this.state.MV}</Label.Detail></Label>
            <Label size="big">Proceeds: <Label.Detail>{this.state.PR}</Label.Detail></Label>
            <Label size="big">Discount: <Label.Detail>{this.state.DS}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = SimpleDiscount;
