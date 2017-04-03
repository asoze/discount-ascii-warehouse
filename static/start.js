'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Base(props) {
		return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
						'h1',
						null,
						'Available Products'
				),
				_react2.default.createElement(
						'table',
						null,
						_react2.default.createElement(
								'tr',
								null,
								_react2.default.createElement(
										'td',
										null,
										'1'
								),
								_react2.default.createElement(
										'td',
										null,
										'5'
								)
						),
						_react2.default.createElement(
								'tr',
								null,
								_react2.default.createElement(
										'td',
										null,
										'2'
								),
								_react2.default.createElement(
										'td',
										null,
										'6'
								)
						),
						_react2.default.createElement(
								'tr',
								null,
								_react2.default.createElement(
										'td',
										null,
										'3'
								),
								_react2.default.createElement(
										'td',
										null,
										'7'
								)
						),
						_react2.default.createElement(
								'tr',
								null,
								_react2.default.createElement(
										'td',
										null,
										'4'
								),
								_react2.default.createElement(
										'td',
										null,
										'8'
								)
						)
				)
		);
}

var element = _react2.default.createElement(Base, { name: 'Sara' });

_reactDom2.default.render(element, document.getElementById('products'));

