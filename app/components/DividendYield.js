var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var DividendYield = React.createClass({
  getDefaultProps() {
    return {
      QR: 0,
      YR: 0,
      MP: 0,
      DY: 0,
      TY: 0
    }
  },
  getInitialState() {
    return {
      formData: {},
      QR: this.props.QR,
      YR: this.props.YR,
      MP: this.props.MP,
      DY: this.props.DY,
      TY: this.props.TY
    }
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doDYieldTest({formData});
  },
  doDYieldTest: function(data) {
    var fd = data.formData;
    var dy = fd.cur_yield == '' ? '' : parseFloat(fd.cur_yield);
    var ty = fd.trail_yield == '' ? '' : parseFloat(fd.trail_yield);
    var qr = fd.quarterly == '' ? '' : parseFloat(fd.quarterly);
    var yr = fd.yearly == '' ? '' : parseFloat(fd.yearly);
    var mp = fd.marketPrice == '' ? '' : parseFloat(fd.marketPrice);
    var res = 0;
    var res2 = 0;

    if(dy == '') {
      res = (((qr * 4) / mp) * 100).toFixed(2);
      res2 = ((yr / mp) * 100).toFixed(2);

      this.setState({
        QR: qr,
        YR: yr,
        MP: mp,
        DY: res,
        TY: res2
      })
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("DYieldForm");
    form.reset();
    this.setState({formData: {}, QR: 0, YR: 0, MP: 0, DY: 0, TY: 0});
    debugger;
  },
  render: function() {
    return (
      <Container className="topDiv">
        <Segment color="green">
          <Header as="h2">Dividend Yield</Header>
          <Divider />
          <Form id="DYieldForm" onSubmit={this.onFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Current Dividend Yield" name="cur_yield" placeholder="ex. 450" /> =
              <Form.Input label="Quarterly Rate" name="quarterly" placeholder="ex. 0.0125" />
              <Form.Input label="Yearly Rate" name="yearly" placeholder="ex. 0.045" />
              <Form.Input label="Market Price" name="marketPrice" placeholder="ex. $24.50" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Current Dividend Yield: <Label.Detail>{this.state.DY}%</Label.Detail></Label>
            <Label size="big">Trailing Dividend Yield: <Label.Detail>{this.state.TY}%</Label.Detail></Label>
            <Label size="big">Quarterly Rate: <Label.Detail>{this.state.QR}</Label.Detail></Label>
            <Label size="big">Yearly Rate: <Label.Detail>{this.state.YR}</Label.Detail></Label>
            <Label size="big">Market Price: <Label.Detail>{this.state.MP}</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = DividendYield;
