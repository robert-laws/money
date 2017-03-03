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
var Chapter4 = require('Chapter4');
var Chapter12 = require('Chapter12');
var Chapter6 = require('Chapter6');
var FindPercentage = require('FindPercentage');
var CompoundInterest = require('CompoundInterest');
var CompoundingFrequencies = require('CompoundingFrequencies');
var SolveRateTime = require('SolveRateTime');
var RuleOf72 = require('RuleOf72');
var EffectiveRate = require('EffectiveRate');
var SimpleInterest = require('SimpleInterest');
var SimpleDiscount = require('SimpleDiscount');
var SimpleDiscountFormula = require('SimpleDiscountFormula');
var ArithmeticSequences = require('ArithmeticSequence');
var GeometricSequences = require('GeometricSequence');
var AnnuityDefinitions = require('AnnuityDefinitions');
var FutureAnnuity = require('FutureAnnuity');
var AnnuityDue = require('AnnuityDue');
var PresentAnnuity = require('PresentAnnuity');
var PresentDue = require('PresentDue');
var SalesTax = require('SalesTax');
var TaxableIncome = require('TaxableIncome');
var Dividend = require('Dividend');
var DividendYield = require('DividendYield');
var CapitalGains = require('CapitalGains');

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
    <Route path="chapter4" component={Chapter4}>
      <Route path="annuity-definitions" component={AnnuityDefinitions} />
      <Route path="future-annuity" component={FutureAnnuity} />
      <Route path="annuity-due" component={AnnuityDue} />
      <Route path="present-annuity" component={PresentAnnuity} />
      <Route path="present-due" component={PresentDue} />
    </Route>
    <Route path="chapter12" component={Chapter12}>
      <Route path="sales-tax" component={SalesTax} />
      <Route path="taxable-income" component={TaxableIncome} />
    </Route>
    <Route path="chapter6" component={Chapter6}>
      <Route path="dividend" component={Dividend} />
      <Route path="dividend-yield" component={DividendYield} />
      <Route path="capital-gains" component={CapitalGains} />
    </Route>
    <Route path="*" component={Page404} />
  </Route>
</Router>,
document.getElementById('app')
);
