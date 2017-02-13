var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var GeometricSequences = React.createClass({
  getDefaultProps() {
    return {
      CR: 0,
      FT: 0,
      ST: 0,
      NT: 0,
      NV: 0,
      SM: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      CR: this.props.CR,
      FT: this.props.FT,
      ST: this.props.ST,
      NT: this.props.NT,
      NV: this.props.NV,
      SM: this.props.SM
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("GSForm");
    form.reset();
    this.setState({formData: {}, CR: 0, FT: 0, NT: 0, NV: 0, SM: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doASTest({formData});
  },
  doASTest: function(data) {
    var fd = data.formData;
    if(fd.firstTerm && fd.secondTerm && fd.nthTerm) {
      var ratio = parseFloat(fd.secondTerm) / parseFloat(fd.firstTerm);
      var n = fd.nthTerm - 1;
      var nv = parseFloat(fd.firstTerm) * Math.pow(ratio, n);
      var sm = parseFloat(fd.firstTerm) * ((1 - Math.pow(ratio, fd.nthTerm)) / (1 - ratio));
      this.setState({NT: fd.nthTerm});
      this.setState({NV: nv.toFixed(2)});
      this.setState({SM: sm.toFixed(2)});
    } else if(fd.firstTerm && fd.commonRatio && fd.nthTerm) {
      debugger;
      var ratio = parseFloat(fd.commonRatio);
      var n = fd.nthTerm - 1;
      var nv = parseFloat(fd.firstTerm) * Math.pow(ratio, n);
      var sm = parseFloat(fd.firstTerm) * ((1 - Math.pow(ratio, fd.nthTerm)) / (1 - ratio));
      this.setState({NT: fd.nthTerm});
      this.setState({NV: nv.toFixed(2)});
      this.setState({SM: sm.toFixed(2)});
    }
  },
  render() {
    return (
      <Container id="topDiv">
        <Segment color="red">
          <Header as="h2">Geometric Sequence</Header>
          <Divider />
          <Form id="GSForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="First Term" name="firstTerm" placeholder="ex. 5" />
              <Form.Input label="Second Term" name="secondTerm" placeholder="ex. 10" />
              <Form.Input label="Nth Term" name="nthTerm" placeholder="ex. 12" />
              <Form.Input label="Common Ratio" name="commonRatio" placeholder="ex. 7" />
              <Form.Input label="Nth Value" name="nthValue" placeholder="ex. 120" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Nth Term: <Label.Detail>{this.state.NT}</Label.Detail></Label>
            <Label size="big">Nth Value: <Label.Detail>{this.state.NV}</Label.Detail></Label>
            <Label size="big">Sum of Values: <Label.Detail>{this.state.SM}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = GeometricSequences;
