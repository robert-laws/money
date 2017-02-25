var React = require('react');
var { Container, Segment, Header, Divider, Label, Form, Input, Button } = require('semantic-ui-react');

var years = [
  { key: '0', text: '2011', value: '2011' },
  { key: '1', text: '2013', value: '2013' }
]

var status = [
  { key: '0', text: 'married', value: 'married' },
  { key: '1', text: 'single', value: 'single' }
]

var TaxableIncome = React.createClass({
  getDefaultProps: function() {
    return {
      IC: 0,
      TEX: 0,
      TID: 0,
      TI: 0,
      TAX: 0,
      PTC: 0,
      PAC: 0
    }
  },
  getInitialState: function() {
    return {
      formData: {},
      IC: this.props.IC,
      TEX: this.props.TEX,
      TID: this.props.TID,
      TI: this.props.TI,
      TAX: this.props.TAX,
      PTC: this.props.PTC,
      PAC: this.props.PAC
    }
  },
  onClearValues: function(e) {
    e.preventDefault();
    var form = document.getElementById("TIncomeForm");
    form.reset();
    this.setState({formData: {}, IC: 0, TEX: 0, TID: 0, TI: 0, TAX: 0, PTC: 0, PAC: 0});
  },
  onFormSubmit: function(e, {formData}) {
    e.preventDefault();
    this.setState({formData});
    this.doTIncomeTest({formData});
  },
  doTIncomeTest: function(data) {
    var fd = data.formData;
    var year = fd.year == '' ? 0 : parseFloat(fd.year);
    var ti = fd.taxableincome == '' ? 0 : parseFloat(fd.taxableincome);
    var ic = fd.income == '' ? 0 : parseFloat(fd.income);
    var ex = fd.exemptions == '' ? 0 : parseFloat(fd.exemptions);
    var ms = fd.marititalstatus == '' ? '' : fd.marititalstatus;
    var id1 = fd.deductions1 == '' ? 0 : parseFloat(fd.deductions1);
    var id2 = fd.deductions2 == '' ? 0 : parseFloat(fd.deductions2);
    var id3 = fd.deductions3 == '' ? 0 : parseFloat(fd.deductions3);
    var totalExemptions = 0;
    var deductions = 0;
    var totalDeductions = 0;
    var taxIncome = 0;
    var taxDue = 0;
    var percentTaxableIncome = 0;
    var percentActualIncome = 0;

    if(year == 2011) {
      if(ti == 0) {
        totalExemptions = ex * 3700;
        deductions = id1 + id2 + id3;

        if(ms == 'single') {
          if(deductions >= 5800) {
            totalDeductions = deductions;
          } else {
            totalDeductions = 5800;
          }
        } else if (ms == 'married') {
          if(deductions >= 11600) {
            totalDeductions = deductions;
          } else {
            totalDeductions = 11600;
          }
        }
        taxIncome = ic - totalExemptions - totalDeductions;

        if(ms == 'single') {
          if(taxIncome <= 8500) {
            taxDue = 0;
          } else if(taxIncome > 8500 && taxIncome <= 34500) {
            taxDue = (850 + (0.15 * (taxIncome - 8500))).toFixed(2);
          } else if(taxIncome > 34500 && taxIncome <= 83600) {
            taxDue = (4750 + (0.25 * (taxIncome - 34500))).toFixed(2);
          } else if(taxIncome > 83600 && taxIncome <= 174400) {
            taxDue = (17025 + (0.28 * (taxIncome - 83600))).toFixed(2);
          } else if(taxIncome > 174400 && taxIncome <= 379150) {
            taxDue = (42449 + (0.33 * (taxIncome - 174400))).toFixed(2);
          } else if(taxIncome > 379150) {
            taxDue = (102574 + (0.35 * (taxIncome - 379150))).toFixed(2);
          }
        } else if(ms == 'married') {
          if(taxIncome <= 17000) {
            taxDue = 0;
          } else if(taxIncome > 17000 && taxIncome <= 69000) {
            taxDue = (1700 + (0.15 * (taxIncome - 17000))).toFixed(2);
          } else if(taxIncome > 69000 && taxIncome <= 139350) {
            taxDue = (9500 + (0.25 * (taxIncome - 69000))).toFixed(2);
          } else if(taxIncome > 139350 && taxIncome <= 212300) {
            taxDue = (27087.50 + (0.28 * (taxIncome - 139350))).toFixed(2);
          } else if(taxIncome > 212300 && taxIncome <= 379150) {
            taxDue = (47513.50 + (0.33 * (taxIncome - 212300))).toFixed(2);
          } else if(taxIncome > 379150) {
            taxDue = (102574 + (0.35 * (taxIncome - 379150))).toFixed(2);
          }
        }

        percentTaxableIncome = ((taxDue / taxIncome) * 100).toFixed(2);
        percentActualIncome = ((taxDue / ic) * 100).toFixed(2);

        this.setState({
          TI: taxIncome,
          IC: ic,
          TEX: totalExemptions,
          TID: totalDeductions,
          TAX: taxDue,
          PTC: percentTaxableIncome,
          PAC: percentActualIncome
        });
      } else if (ti != 0) {
        taxIncome = ti;

        if(ms == 'single') {
          if(taxIncome <= 8500) {
            taxDue = (taxIncome * 0.1).toFixed(2);
          } else if(taxIncome > 8500 && taxIncome <= 34500) {
            taxDue = (850 + (0.15 * (taxIncome - 8500))).toFixed(2);
          } else if(taxIncome > 34500 && taxIncome <= 83600) {
            taxDue = (4750 + (0.25 * (taxIncome - 34500))).toFixed(2);
          } else if(taxIncome > 83600 && taxIncome <= 174400) {
            taxDue = (17025 + (0.28 * (taxIncome - 83600))).toFixed(2);
          } else if(taxIncome > 174400 && taxIncome <= 379150) {
            taxDue = (42449 + (0.33 * (taxIncome - 174400))).toFixed(2);
          } else if(taxIncome > 379150) {
            taxDue = (102574 + (0.35 * (taxIncome - 379150))).toFixed(2);
          }
        } else if(ms == 'married') {
          if(taxIncome <= 17000) {
            taxDue = (taxIncome * 0.1).toFixed(2);
          } else if(taxIncome > 17000 && taxIncome <= 69000) {
            taxDue = (1700 + (0.15 * (taxIncome - 17000))).toFixed(2);
          } else if(taxIncome > 69000 && taxIncome <= 139350) {
            taxDue = (9500 + (0.25 * (taxIncome - 69000))).toFixed(2);
          } else if(taxIncome > 139350 && taxIncome <= 212300) {
            taxDue = (27087.50 + (0.28 * (taxIncome - 139350))).toFixed(2);
          } else if(taxIncome > 212300 && taxIncome <= 379150) {
            taxDue = (47513.50 + (0.33 * (taxIncome - 212300))).toFixed(2);
          } else if(taxIncome > 379150) {
            taxDue = (102574 + (0.35 * (taxIncome - 379150))).toFixed(2);
          }
        }

        percentTaxableIncome = ((taxDue / ti) * 100).toFixed(2);

        this.setState({
          TI: ti,
          IC: 'N/A',
          TEX: 'N/A',
          TID: 'N/A',
          TAX: taxDue,
          PTC: percentTaxableIncome,
          PAC: 'N/A'
        })
      }
    } else if (year == 2013) {
      if(ti == 0) {
        totalExemptions = ex * 3900;
        deductions = id1 + id2 + id3;

        if(ms == 'single') {
          if(deductions >= 6100) {
            totalDeductions = deductions;
          } else {
            totalDeductions = 6100;
          }
        } else if (ms == 'married') {
          if(deductions >= 12200) {
            totalDeductions = deductions;
          } else {
            totalDeductions = 12200;
          }
        }
        taxIncome = ic - totalExemptions - totalDeductions;

        if(ms == 'single') {
          if(taxIncome <= 8925) {
            taxDue = (taxIncome * 0.1).toFixed(2);
          } else if(taxIncome > 8925 && taxIncome <= 36250) {
            taxDue = (892.5 + (0.15 * (taxIncome - 8925))).toFixed(2);
          } else if(taxIncome > 36250 && taxIncome <= 87850) {
            taxDue = (4991.25 + (0.25 * (taxIncome - 36250))).toFixed(2);
          } else if(taxIncome > 87850 && taxIncome <= 183250) {
            taxDue = (17891.25 + (0.28 * (taxIncome - 87850))).toFixed(2);
          } else if(taxIncome > 183250 && taxIncome <= 398350) {
            taxDue = (44603.25 + (0.33 * (taxIncome - 183250))).toFixed(2);
          } else if(taxIncome > 398350 && taxIncome <= 400000) {
            taxDue = (115586.25 + (0.35 * (taxIncome - 398350))).toFixed(2);
          } else if(taxIncome > 400000) {
            taxDue = (116163.75 + (0.396 * (taxIncome - 400000))).toFixed(2);
          }
        } else if(ms == 'married') {
          if(taxIncome <= 17850) {
            taxDue = (taxIncome * 0.1).toFixed(2);
          } else if(taxIncome > 17850 && taxIncome <= 72500) {
            taxDue = (1785 + (0.15 * (taxIncome - 17850))).toFixed(2);
          } else if(taxIncome > 72500 && taxIncome <= 146400) {
            taxDue = (9982.5 + (0.25 * (taxIncome - 72500))).toFixed(2);
          } else if(taxIncome > 146400 && taxIncome <= 223050) {
            taxDue = (28457.5 + (0.28 * (taxIncome - 146400))).toFixed(2);
          } else if(taxIncome > 223050 && taxIncome <= 398350) {
            taxDue = (49919.5 + (0.33 * (taxIncome - 223050))).toFixed(2);
          } else if(taxIncome > 398350 && taxIncome <= 450000) {
            taxDue = (107768.5 + (0.35 * (taxIncome - 398350))).toFixed(2);
          } else if(taxIncome > 450000) {
            taxDue = (125846 + (0.395 * (taxIncome - 450000))).toFixed(2);
          }
        }

        percentTaxableIncome = ((taxDue / taxIncome) * 100).toFixed(2);
        percentActualIncome = ((taxDue / ic) * 100).toFixed(2);

        this.setState({
          TI: taxIncome,
          IC: ic,
          TEX: totalExemptions,
          TID: totalDeductions,
          TAX: taxDue,
          PTC: percentTaxableIncome,
          PAC: percentActualIncome
        });
      } else if (ti != 0) {
        taxIncome = ti;

        if(ms == 'single') {
          if(taxIncome <= 8925) {
            taxDue = (taxIncome * 0.1).toFixed(2);
          } else if(taxIncome > 8925 && taxIncome <= 36250) {
            taxDue = (892.5 + (0.15 * (taxIncome - 8925))).toFixed(2);
          } else if(taxIncome > 36250 && taxIncome <= 87850) {
            taxDue = (4991.25 + (0.25 * (taxIncome - 36250))).toFixed(2);
          } else if(taxIncome > 87850 && taxIncome <= 183250) {
            taxDue = (17891.25 + (0.28 * (taxIncome - 87850))).toFixed(2);
          } else if(taxIncome > 183250 && taxIncome <= 398350) {
            taxDue = (44603.25 + (0.33 * (taxIncome - 183250))).toFixed(2);
          } else if(taxIncome > 398350 && taxIncome <= 400000) {
            taxDue = (115586.25 + (0.35 * (taxIncome - 398350))).toFixed(2);
          } else if(taxIncome > 400000) {
            taxDue = (116163.75 + (0.396 * (taxIncome - 400000))).toFixed(2);
          }
        } else if(ms == 'married') {
          if(taxIncome <= 17850) {
            taxDue = (taxIncome * 0.1).toFixed(2);
          } else if(taxIncome > 17850 && taxIncome <= 72500) {
            taxDue = (1785 + (0.15 * (taxIncome - 17850))).toFixed(2);
          } else if(taxIncome > 72500 && taxIncome <= 146400) {
            taxDue = (9982.5 + (0.25 * (taxIncome - 72500))).toFixed(2);
          } else if(taxIncome > 146400 && taxIncome <= 223050) {
            taxDue = (28457.5 + (0.28 * (taxIncome - 146400))).toFixed(2);
          } else if(taxIncome > 223050 && taxIncome <= 398350) {
            taxDue = (49919.5 + (0.33 * (taxIncome - 223050))).toFixed(2);
          } else if(taxIncome > 398350 && taxIncome <= 450000) {
            taxDue = (107768.5 + (0.35 * (taxIncome - 398350))).toFixed(2);
          } else if(taxIncome > 450000) {
            taxDue = (125846 + (0.395 * (taxIncome - 450000))).toFixed(2);
          }
        }

        percentTaxableIncome = ((taxDue / ti) * 100).toFixed(2);

        this.setState({
          TI: ti,
          IC: 'N/A',
          TEX: 'N/A',
          TID: 'N/A',
          TAX: taxDue,
          PTC: percentTaxableIncome,
          PAC: 'N/A'
        })
      }
    }
  },
  render: function() {
    return (
      <Container className="topDiv">
        <Segment color="yellow">
          <Header as="h2">Income and Payroll Taxes</Header>
          <Divider />
          <Form id="TIncomeForm" onSubmit={this.onFormSubmit}>
            <Form.Group>
              <Form.Input label="TaxableIncome" name="taxableincome" placeholder="ex. 67200" width="2" /> =
              <Form.Input label="Income" name="income" placeholder="ex. 82200" width="2" />
              <Form.Input label="Exempt" name="exemptions" placeholder="ex. 3" width="1" />
              <Form.Input label="Deduction #1" name="deduction1" placeholder="ex. 3400" width="2" />
              <Form.Input label="Deduction #2" name="deduction2" placeholder="ex. 3400" width="2" />
              <Form.Input label="Deduction #3" name="deduction3" placeholder="ex. 3400" width="2" />
              <Form.Select label="Maritial Status" name="marititalstatus" options={status} placeholder="Maritial Status" width="3" />
              <Form.Select label="Year" name="year" options={years} placeholder="Tax Year" width="3" />
            </Form.Group>
            <Button primary type="submit" size="big">Submit</Button>
            <Button secondary onClick={this.onClearValues} size="big">Clear Values</Button>
            <Label size="big">Taxable Income: <Label.Detail>{this.state.TI}</Label.Detail></Label>
            <Label size="big">Income: <Label.Detail>{this.state.IC}</Label.Detail></Label>
            <Label size="big">Total Exemptions: <Label.Detail>{this.state.TEX}</Label.Detail></Label>
            <Label size="big">Total Deductions: <Label.Detail>{this.state.TID}</Label.Detail></Label>
            <Label size="big">Tax Due: <Label.Detail>{this.state.TAX}</Label.Detail></Label>
            <Label size="big">Percent Taxable Income Paid: <Label.Detail>{this.state.PTC}%</Label.Detail></Label>
            <Label size="big">Percent Actual Income Paid: <Label.Detail>{this.state.PAC}%</Label.Detail></Label>
          </Form>
        </Segment>
      </Container>
    )
  }
});

module.exports = TaxableIncome;
