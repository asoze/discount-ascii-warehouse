'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ProductTable = require('./ProductTable.jsx');

var _ProductTable2 = _interopRequireDefault(_ProductTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Base(props) {
  return _react2.default.createElement(_ProductTable2.default, null);
}

var element = _react2.default.createElement(Base, null);

_reactDom2.default.render(element, document.getElementById('productTable'));

