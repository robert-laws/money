var React = require('react');
var { Container, Segment, Divider, Grid, Header, Message } = require('semantic-ui-react');

const itemsOne = [
  'interest rate = 8; n ~ 72 / 8 = 9 years (for one doubling)',
  'It takes 3 doublings for $1000 to equal $8000 -> $1000 * 2 to 3rd power',
  'Multiply 9 by 3 = 27 years'
]

const itemsTwo = [
  'term = 25; n ~ 72 / 25 = 2.88% (for one doubling)',
  'It takes 3 doublings for $1500 to equal $6000 -> $1500 * 2 to 2nd power',
  'Multiply 2.88% by 3 = 8.64%'
]

var RuleOf72 = (props) => {
  return (
    <Container id="topDiv">
      <Segment color="teal">
        <Header as="h2">Rule of 72</Header>
        <Divider />
        <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Message>
                  <Message.Header>Find Time<br/><br/>I have $1,000 in an account which pays 8% annually compound interest.  Approximately how long will it take for my account to grow to $8,000?</Message.Header>
                  <Divider />
                  <Message.List items={itemsOne} />
                </Message>
              </Grid.Column>
              <Grid.Column>
                <Message>
                  <Message.Header>Find Interest Rate<br/><br/>If Dan’s account balance grew from $1,500 to $12,000 in 25 years, and interest was compounded annually, approximately what interest rate did the account earn?</Message.Header>
                  <Divider />
                  <Message.List items={itemsTwo} />
                </Message>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Segment>
    </Container>
  )
}

module.exports = RuleOf72;
