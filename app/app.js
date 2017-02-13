var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

var Main = require('Main');
var Home = require('Home');
var Page404 = require('Page404');
// extra
var Chapter1 = require('Chapter1');
var Chapter2 = require('Chapter2');
var Chapter3 = require('Chapter3');
var FindPercentage = require('FindPercentage');
var CompoundInterest = require('CompoundInterest');
var CompoundingFrequencies = require('CompoundingFrequencies');
var SolveRateTime = require('SolveRateTime');
var RuleOf72 = require('RuleOf72');
var EffectiveRate = require('EffectiveRate');
var SimpleInterest = require('SimpleInterest');
var SimpleDiscount = require('SimpleDiscount');
var SimpleDiscountFormula = require('SimpleDiscountFormula');
var ArithmeticSequences = require('ArithmeticSequences');
var GeometricSequences = require('ArithmeticSequences');

ReactDOM.render(
<Router history={hashHistory}>
  <Route path="/" component={Main}>
    <IndexRoute to="/home" component={Home} />
    <Route path="home" component={Home} />
    <Route path="chapter1" component={Chapter1}>
      <Route path="simple-interest" component={SimpleInterest} />
      <Route path="find-percentage" component={FindPercentage} />
    </Route>
    <Route path="chapter2" component={Chapter2}>
      <Route path="simple-discount" component={SimpleDiscount} />
      <Route path="simple-discount-formula" component={SimpleDiscountFormula} />
      <Route path="arithmetic-sequences" component={ArithmeticSequences} />
      <Route path="find-percentage" component={FindPercentage} />
    </Route>
    <Route path="chapter3" component={Chapter3}>
      <Route path="compound-interest" component={CompoundInterest} />
      <Route path="compounding-frequencies" component={CompoundingFrequencies} />
      <Route path="solve-rate-time" component={SolveRateTime} />
      <Route path="rule-of-72" component={RuleOf72} />
      <Route path="effective-rate" component={EffectiveRate} />
      <Route path="geometric-sequences" component={GeometricSequences} />
    </Route>
    <Route path="*" component={Page404} />
  </Route>
</Router>,
document.getElementById('app')
);
