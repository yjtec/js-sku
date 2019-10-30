import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/icon/style";
import _Icon from "antd/es/icon";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './style.less';

var SpecTableList =
/*#__PURE__*/
function (_Component) {
  _inherits(SpecTableList, _Component);

  function SpecTableList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SpecTableList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpecTableList)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      sku: []
    };

    _this.handleMulEdit = function (key, value, confirm, setSelectedKeys) {
      var sku = _this.state.sku.map(function (item, i) {
        var tmpvalue = value;

        if (key === 'sku') {
          tmpvalue = value + '0000' + (i + 1);
        }

        return _objectSpread({}, item, _defineProperty({}, key, tmpvalue));
      });

      _this.setState({
        sku: sku
      });

      setSelectedKeys([]);
      confirm();
    };

    _this.getMulEditProps = function (dataIndex) {
      return {
        filterDropdown: function filterDropdown(_ref) {
          var setSelectedKeys = _ref.setSelectedKeys,
              selectedKeys = _ref.selectedKeys,
              confirm = _ref.confirm,
              clearFilters = _ref.clearFilters;
          return React.createElement("div", null, React.createElement(_Input, {
            value: selectedKeys[0],
            addonAfter: React.createElement(_Icon, {
              type: "check",
              onClick: function onClick() {
                return _this.handleMulEdit(dataIndex, selectedKeys[0], confirm, setSelectedKeys);
              }
            }),
            onChange: function onChange(e) {
              return setSelectedKeys(e.target.value ? [e.target.value] : []);
            }
          }));
        },
        filterIcon: function filterIcon(filtered) {
          return React.createElement(_Icon, {
            type: "edit"
          });
        }
      };
    };

    return _this;
  }

  _createClass(SpecTableList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var sku = this.props.sku;
      this.setState({
        sku: sku
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var columns = [{
        title: formatMessage({
          id: 'goods.spec.spec'
        }),
        dataIndex: 'spec',
        key: 'spec',
        width: 100
      }, _objectSpread({
        title: formatMessage({
          id: 'goods.price.label'
        }),
        dataIndex: 'price',
        key: 'price',
        width: 120,
        render: function render(v, r) {
          return React.createElement(_Input, {
            value: v,
            onChange: function onChange(e) {
              return _this2.handleSkuChange(e, r);
            },
            name: "price"
          });
        }
      }, this.getMulEditProps('price')), _objectSpread({
        title: formatMessage({
          id: 'goods.price_origin.label'
        }),
        dataIndex: 'price_origin',
        width: 120,
        key: 'price_origin',
        render: function render(v, r) {
          return React.createElement(_Input, {
            value: v,
            onChange: function onChange(e) {
              return _this2.handleSkuChange(e, r);
            },
            name: "price_origin"
          });
        }
      }, this.getMulEditProps('price_origin')), _objectSpread({
        title: formatMessage({
          id: 'goods.price_cost.label'
        }),
        dataIndex: 'price_cost',
        width: 120,
        key: 'price_cost',
        render: function render(v, r) {
          return React.createElement(_Input, {
            value: v,
            onChange: function onChange(e) {
              return _this2.handleSkuChange(e, r);
            },
            name: "price_cost"
          });
        }
      }, this.getMulEditProps('price_cost')), _objectSpread({
        title: formatMessage({
          id: 'goods.sku.label'
        }),
        dataIndex: 'sku',
        width: 120,
        key: 'sku',
        render: function render(v, r) {
          return React.createElement(_Input, {
            value: v,
            onChange: function onChange(e) {
              return _this2.handleSkuChange(e, r);
            },
            name: "sku"
          });
        }
      }, this.getMulEditProps('sku'))];
      var sku = this.state.sku;

      if (sku.length > 0) {
        return React.createElement(_Table, {
          pagination: false,
          rowKey: 'spec',
          dataSource: sku,
          columns: columns
        });
      }

      return '';
    }
  }]);

  return SpecTableList;
}(Component);

export default SpecTableList;