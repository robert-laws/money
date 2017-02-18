var React = require('react');
var { Container, Segment, Divider, Grid, Header, Message } = require('semantic-ui-react');

const itemsOne = ['Car loan', 'Student loan', 'Mortgage', 'Paycheck (salary)', 'Rent', 'Pension or Social Security'];
const itemsTwo = ['Monthly credit card payments', 'Utility bills'];
const itemsThree = ['The sum of money accumulated at the end of the payments and interest of an annuity is called the future value of the annuity - usually associated with investments', 'The sum of money paid at the beginning of the annuity is called the present value of the annuity - usually associated with loans'];
const itemsFour = ['An ordinary annuity is an annuity whose payments are made at the end of each time period (ex. end of cycle, etc.)', 'An annuity due is an annuity whose payments are made at the beginning of each time period (ex. beginning of cycle, etc.)'];

var AnnuityDefinitions = (props) => {
  return (
    <Container className="topDiv">
      <Segment color="purple">
        <Header as="h2">Annuity - Definitions</Header>
        <Divider />
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Message>
                <Message.Header>Examples that are annuities</Message.Header>
                <Divider />
                <Message.List items={itemsOne} />
              </Message>
            </Grid.Column>
            <Grid.Column>
              <Message>
                <Message.Header>Examples that are NOT annuities</Message.Header>
                <Divider />
                <Message.List items={itemsTwo} />
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Message>
          <Message.Header>Future and present value</Message.Header>
          <Divider />
          <Message.List items={itemsThree} />
        </Message>
        <Message>
          <Message.Header>Ordinary annuity and annuity due</Message.Header>
          <Divider />
          <Message.List items={itemsFour} />
        </Message>
      </Segment>
    </Container>
  )
}

module.exports = AnnuityDefinitions;
