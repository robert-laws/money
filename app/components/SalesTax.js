var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var SalesTax = React.createClass({
  getDefaultProps: function() {
    return {
      TP: 0,
      PR: 0,
      RT: 0,
      TX: 0
    }
  },
  getInitialState: function() {
    return {
      formData: {},
      TP: this.props.TP,
      PR: this.props.PR,
      RT: this.props.RT,
      TX: this.props.TX
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("STaxForm");
    form.reset();
    this.setState({formData: {}, TP: 0, PR: 0, RT: 0, TX: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doSTaxTest({formData});
  },
  doSTaxTest: function(data) {
    var fd = data.formData;
    var tp = fd.totalprice == '' ? '' : parseFloat(fd.totalprice);
    var pr = fd.price == '' ? '' : parseFloat(fd.price);
    var rt = fd.taxrate == '' ? '' : parseFloat(fd.taxrate);

    if(tp == '') {
      var res = (pr * (1 + rt)).toFixed(2);
      var tax = (res - pr).toFixed(2);
      this.setState({
        TP: res,
        PR: pr,
        RT: rt,
        TX: tax
      });
    } else if (pr == '') {
      var res = (tp / (1 + rt)).toFixed(2);
      var tax = (tp - res).toFixed(2);
      this.setState({
        TP: tp,
        PR: res,
        RT: rt,
        TX: tax
      });
    }
  },
  render: function() {
    return (
      <Container className="topDiv">
        <Segment color="yellow">
          <Header as="h2">Sales Tax</Header>
          <Divider />
          <Form id="STaxForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Total Price" name="totalprice" placeholder="ex. 3135" /> =
              <Form.Input label="Price" name="price" placeholder="ex. 3000" /> *
              <Form.Input label="Sales Tax Rate" name="taxrate" placeholder="ex. 0.045" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Total Price: <Label.Detail>{this.state.TP}</Label.Detail></Label>
            <Label size="big">Price: <Label.Detail>{this.state.PR}</Label.Detail></Label>
            <Label size="big">Sales Tax Rate: <Label.Detail>{this.state.RT}</Label.Detail></Label>
            <Label size="big">Sales Tax: <Label.Detail>{this.state.TX}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = SalesTax;
