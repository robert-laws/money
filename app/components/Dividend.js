var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var Dividend = React.createClass({
  getDefaultProps() {
    return {
      TD: 0,
      ID: 0,
      TS: 0,
      IS: 0,
      PS: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      TD: this.props.TD,
      ID: this.props.ID,
      TS: this.props.TS,
      IS: this.props.IS,
      PS: this.props.PS
    }
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doDIVTest({formData});
  },
  doDIVTest: function(data) {
    var fd = data.formData;
    var td = fd.tot_dividend == '' ? '' : parseFloat(fd.tot_dividend);
    var id = fd.ind_dividend == '' ? '' : parseFloat(fd.ind_dividend);
    var ts = fd.tot_shares == '' ? '' : parseFloat(fd.tot_shares);
    var is = fd.ind_shares == '' ? '' : parseFloat(fd.ind_shares);
    var price_share = 0;
    var res = 0;

    if(id == '') {
      price_share = (td / ts).toFixed(2);
      res = (price_share * is).toFixed(2);

      this.setState({
        TD: td,
        ID: res,
        TS: ts,
        IS: is,
        PS: price_share
      })
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("DIVForm");
    form.reset();
    this.setState({formData: {}, TD: 0, ID: 0, TS: 0, IS: 0, PS: 0});
    debugger;
  },
  render: function() {
    return (
      <Container className="topDiv">
        <Segment color="green">
          <Header as="h2">Individual Dividend</Header>
          <Divider />
          <Form id="DIVForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Individual Dividend" name="ind_dividend" placeholder="ex. 450" /> =
              <Form.Input label="Total Dividend" name="tot_dividend" placeholder="ex. 5000" />
              <Form.Input label="Total Shares" name="tot_shares" placeholder="ex. 50000" />
              <Form.Input label="Individual Shares" name="ind_shares" placeholder="ex. 24" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Total Dividend: <Label.Detail>{this.state.TD}</Label.Detail></Label>
            <Label size="big">Individual Dividend: <Label.Detail>{this.state.ID}</Label.Detail></Label>
            <Label size="big">Total Shares: <Label.Detail>{this.state.TS}</Label.Detail></Label>
            <Label size="big">Individual Shares: <Label.Detail>{this.state.IS}</Label.Detail></Label>
            <Label size="big">Price/Share: <Label.Detail>{this.state.PS} per share</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = Dividend;
