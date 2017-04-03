'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.default = ProductTable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProductTable() {
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

