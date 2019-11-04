"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/alert/style");

var _alert = _interopRequireDefault(require("antd/es/alert"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _react = _interopRequireWildcard(require("react"));

var _style9 = _interopRequireDefault(require("./style.less"));

var _uuid = _interopRequireDefault(require("uuid"));

var _locale = require("umi-plugin-react/locale");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calcDescartes(array) {
  if (array.length < 2) return array[0] || [];
  return [].reduce.call(array, function (col, set) {
    var res = [];
    col.forEach(function (c) {
      set.forEach(function (s) {
        var t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      });
    });
    return res;
  });
}

var formatSku = function formatSku(data, sku) {
  var result = [];
  data.map(function (item) {
    if (item.items.length) {
      result.push(item.items.filter(function (i) {
        return i;
      }));
    }
  });
  return calcDescartes(result).map(function (item) {
    return Array.isArray(item) ? {
      spec: item.join('*'),
      attr: item
    } : {
      spec: item,
      attr: [item]
    };
  }).map(function (item) {
    var currentSku = sku.find(function (s) {
      return s.spec === item.spec;
    }) || {};
    return _objectSpread({}, item, {}, currentSku);
  });
};

var GoodsSpec =
/*#__PURE__*/
function (_Component) {
  _inherits(GoodsSpec, _Component);

  function GoodsSpec(props) {
    var _this;

    _classCallCheck(this, GoodsSpec);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GoodsSpec).call(this, props));

    _this.handleSkuChange = function (e, sku) {
      var key = e.target.name;
      var value = e.target.value;
      sku[key] = value;

      var newsku = _this.state.sku.map(function (item) {
        return item.spec === sku.spec ? sku : item;
      });

      _this.setState({
        sku: newsku
      }, function () {
        _this.props.onChange(_this.state);
      });
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
      }, function () {
        _this.props.onChange(_this.state);
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
          return _react.default.createElement("div", null, _react.default.createElement(_input.default, {
            value: selectedKeys[0],
            addonAfter: _react.default.createElement(_icon.default, {
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
          return _react.default.createElement(_icon.default, {
            type: "edit"
          });
        }
      };
    };

    _this.columns = [{
      title: (0, _locale.formatMessage)({
        id: 'goods.spec.spec'
      }),
      dataIndex: 'spec',
      key: 'spec',
      width: 100
    }, _objectSpread({
      title: (0, _locale.formatMessage)({
        id: 'goods.price.label'
      }),
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: function render(v, r) {
        return _react.default.createElement(_input.default, {
          value: v,
          onChange: function onChange(e) {
            return _this.handleSkuChange(e, r);
          },
          name: "price"
        });
      }
    }, _this.getMulEditProps('price')), _objectSpread({
      title: (0, _locale.formatMessage)({
        id: 'goods.price_origin.label'
      }),
      dataIndex: 'price_origin',
      width: 120,
      key: 'price_origin',
      render: function render(v, r) {
        return _react.default.createElement(_input.default, {
          value: v,
          onChange: function onChange(e) {
            return _this.handleSkuChange(e, r);
          },
          name: "price_origin"
        });
      }
    }, _this.getMulEditProps('price_origin')), _objectSpread({
      title: (0, _locale.formatMessage)({
        id: 'goods.price_cost.label'
      }),
      dataIndex: 'price_cost',
      width: 120,
      key: 'price_cost',
      render: function render(v, r) {
        return _react.default.createElement(_input.default, {
          value: v,
          onChange: function onChange(e) {
            return _this.handleSkuChange(e, r);
          },
          name: "price_cost"
        });
      }
    }, _this.getMulEditProps('price_cost')), _objectSpread({
      title: (0, _locale.formatMessage)({
        id: 'goods.sku.label'
      }),
      dataIndex: 'sku',
      width: 120,
      key: 'sku',
      render: function render(v, r) {
        return _react.default.createElement(_input.default, {
          value: v,
          onChange: function onChange(e) {
            return _this.handleSkuChange(e, r);
          },
          name: "sku"
        });
      }
    }, _this.getMulEditProps('sku'))];

    _this.handleAddSpec = function () {
      var specs = _this.state.specs;

      if (specs.length > 2) {
        _message2.default.error((0, _locale.formatMessage)({
          id: 'goods.spec.lengthError'
        }));

        return;
      }

      var newSpec = {
        uid: (0, _uuid.default)(),
        items: []
      };
      specs.push(newSpec);

      _this.setState({
        specs: specs
      });
    };

    _this.handleRemoveSpec = function (uid) {
      var _this$state = _this.state,
          specs = _this$state.specs,
          sku = _this$state.sku;
      var newSpecs = specs.filter(function (item) {
        return item.uid !== uid;
      });

      _this.setState({
        specs: newSpecs,
        sku: formatSku(newSpecs, sku)
      }, function () {
        _this.props.onChange(_this.state);
      }); //this.setState({specs:specs.map(item => item.uid !== uid)})

    };

    _this.handleAddItem = function (spec) {
      var specs = _this.state.specs; //check length

      if (spec.items.length > 4) {
        _message2.default.error((0, _locale.formatMessage)({
          id: 'goods.spec.items.lengthError'
        }));

        return;
      } //check name repeat


      var newSpecs = specs.map(function (item) {
        if (item.uid == spec.uid) {
          item.items.push('');
          return _objectSpread({}, item);
        } else {
          return item;
        }
      });

      _this.setState({
        specs: newSpecs
      });
    };

    _this.handleRemoveItem = function (spec, i) {
      var _this$state2 = _this.state,
          specs = _this$state2.specs,
          sku = _this$state2.sku;
      var newSpecs = specs.map(function (item) {
        if (item.uid == spec.uid) {
          item.items.splice(i, 1);
          return _objectSpread({}, item);
        } else {
          return item;
        }
      });

      _this.setState({
        specs: newSpecs,
        sku: formatSku(newSpecs, sku)
      }, function () {
        _this.props.onChange(_this.state);
      });
    };

    _this.handleItemChange = function (e, spec, i) {
      var _this$state3 = _this.state,
          specs = _this$state3.specs,
          sku = _this$state3.sku;
      var newSpecs = specs.map(function (item) {
        if (item.uid == spec.uid) {
          item.items[i] = e.target.value;
          return _objectSpread({}, item);
        } else {
          return item;
        }
      });

      _this.setState({
        specs: newSpecs,
        sku: formatSku(newSpecs, sku)
      }, function () {
        _this.props.onChange(_this.state);
      });
    };

    _this.handleSpecNameChange = function (e, spec) {
      spec.name = e.target.value;

      var specs = _this.state.specs.map(function (item) {
        return item.uid == spec.uid ? spec : item;
      });

      _this.setState({
        specs: specs
      }, function () {
        _this.props.onChange(_this.state);
      });
    };

    _this.renderItem = function (spec) {
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: _style9.default.spec_title
      }, _react.default.createElement(_input.default, {
        placeholder: "\u5C5E\u6027\u540D",
        onBlur: function onBlur(e) {
          return _this.handleSpecNameChange(e, spec);
        },
        defaultValue: spec.name
      })), _react.default.createElement("div", {
        className: _style9.default.spec_list
      }, _react.default.createElement(_row.default, null, spec.items.map(function (item, i) {
        return _react.default.createElement(_col.default, {
          span: 4,
          key: i
        }, _react.default.createElement(_input.default, {
          onBlur: function onBlur(e) {
            return _this.handleItemChange(e, spec, i);
          },
          className: _style9.default.itemInput,
          defaultValue: item,
          placeholder: "\u5C5E\u6027\u503C",
          suffix: _react.default.createElement(_icon.default, {
            onClick: function onClick() {
              return _this.handleRemoveItem(spec, i);
            },
            type: "close"
          })
        }));
      }), _react.default.createElement(_col.default, {
        span: 4
      }, _react.default.createElement(_button.default, {
        type: "circle",
        onClick: function onClick() {
          return _this.handleAddItem(spec);
        },
        icon: "plus"
      })))));
    };

    _this.renderSpec = function () {
      return _react.default.createElement(_react.Fragment, null, _this.state.specs.map(function (item) {
        return _react.default.createElement(_alert.default, {
          style: {
            margin: '10px 0'
          },
          key: item.uid,
          closable: true,
          message: _this.renderItem(item),
          onClose: function onClose() {
            return _this.handleRemoveSpec(item.uid);
          }
        });
      }));
    };

    _this.state = {
      specs: [],
      sku: []
    };
    return _this;
  }

  _createClass(GoodsSpec, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var value = this.props.value;
      this.setState(_objectSpread({}, value, {
        sku: value.sku && value.sku.length > 0 ? value.sku.map(function (item) {
          return _objectSpread({}, item, {
            spec: item.spec.join('*')
          });
        }) : []
      }), function () {
        _this2.props.onChange(_this2.state);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
          specs = _this$state4.specs,
          sku = _this$state4.sku;
      return _react.default.createElement("div", null, _react.default.createElement(_button.default, {
        onClick: this.handleAddSpec,
        type: "circle",
        icon: "plus"
      }), this.renderSpec(), sku.length > 0 && _react.default.createElement(_table.default, {
        pagination: false,
        rowKey: 'spec',
        dataSource: sku,
        columns: this.columns
      }));
    }
  }]);

  return GoodsSpec;
}(_react.Component);

var _default = GoodsSpec;
exports.default = _default;