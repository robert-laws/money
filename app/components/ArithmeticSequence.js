var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var ArithmeticSequences = React.createClass({
  getDefaultProps() {
    return {
      CD: 0,
      FT: 0,
      NT: 0,
      NV: 0,
      SM: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      CD: this.props.CD,
      FT: this.props.FT,
      NT: this.props.NT,
      NV: this.props.NV,
      SM: this.props.SM
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("ASForm");
    form.reset();
    this.setState({formData: {}, CD: 0, FT: 0, NT: 0, NV: 0, SM: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doASTest({formData});
  },
  doASTest: function(data) {
    var fd = data.formData;
    if(fd.commonDifference && fd.firstTerm && fd.nthTerm) {
      var nv = parseFloat(fd.firstTerm) + parseFloat(((fd.nthTerm - 1) * fd.commonDifference));
      var sm = (fd.nthTerm / 2) * (parseFloat(fd.firstTerm) + nv);
      this.setState({NT: fd.nthTerm});
      this.setState({NV: nv.toFixed(2)});
      this.setState({SM: sm.toFixed(2)});
    } else if(fd.commonDifference && fd.firstTerm && fd.nthValue) {
      var nt = parseFloat(((fd.nthValue - fd.firstTerm) / fd.commonDifference)) + 1;
      var sm = (nt / 2) * (parseFloat(fd.firstTerm) + parseFloat(fd.nthValue));
      this.setState({NT: nt});
      this.setState({NV: fd.nthValue});
      this.setState({SM: sm.toFixed(2)});
    }
  },
  render() {
    return (
      <Container id="topDiv">
        <Segment color="red">
          <Header as="h2">Arithmetic Sequence</Header>
          <Divider />
          <Form id="ASForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="First Term" name="firstTerm" placeholder="ex. 5" />
              <Form.Input label="Nth Term" name="nthTerm" placeholder="ex. 12" />
              <Form.Input label="Common Difference" name="commonDifference" placeholder="ex. 7" />
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

module.exports = ArithmeticSequences;
