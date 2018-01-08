/* eslint-disable no-unused-vars */
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

const chai = global.chai = require('chai')
const expect = global.expect = chai.expect
const should = global.should = chai.should()
const chaiEnzyme = require('chai-enzyme')
// var Promise = require('es6-promise').Promise
// global.Promise = Promise

// var chaiAsPromised = require('chai-as-promised')
// chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

// https://github.com/airbnb/enzyme/issues/942#issuecomment-314715229
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
var win = document.defaultView;
global.document = document;
global.navigator = win.navigator;
