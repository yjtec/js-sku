import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/alert/style";
import _Alert from "antd/es/alert";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/message/style";
import _message from "antd/es/message";
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

import React, { Component, Fragment } from 'react';
import styles from './style.less';
import uuid from 'uuid';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

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

var formatSku = function formatSku(data) {
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

    _this.columns = [{
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
            return _this.handleSkuChange(e, r);
          },
          name: "price"
        });
      }
    }, _this.getMulEditProps('price')), _objectSpread({
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
            return _this.handleSkuChange(e, r);
          },
          name: "price_origin"
        });
      }
    }, _this.getMulEditProps('price_origin')), _objectSpread({
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
            return _this.handleSkuChange(e, r);
          },
          name: "price_cost"
        });
      }
    }, _this.getMulEditProps('price_cost')), _objectSpread({
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
            return _this.handleSkuChange(e, r);
          },
          name: "sku"
        });
      }
    }, _this.getMulEditProps('sku'))];

    _this.handleAddSpec = function () {
      var specs = _this.state.specs;

      if (specs.length > 2) {
        _message.error(formatMessage({
          id: 'goods.spec.lengthError'
        }));

        return;
      }

      var newSpec = {
        uid: uuid(),
        items: []
      };
      specs.push(newSpec);

      _this.setState({
        specs: specs
      });
    };

    _this.handleRemoveSpec = function (uid) {
      var specs = _this.state.specs;
      var newSpecs = specs.filter(function (item) {
        return item.uid !== uid;
      });

      _this.setState({
        specs: newSpecs,
        sku: formatSku(newSpecs)
      }); //this.setState({specs:specs.map(item => item.uid !== uid)})

    };

    _this.handleAddItem = function (spec) {
      var specs = _this.state.specs; //check length

      if (spec.items.length > 4) {
        _message.error(formatMessage({
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
      var specs = _this.state.specs;
      var newSpecs = specs.map(function (item) {
        if (item.uid == spec.uid) {
          item.items.splice(i, 1);
          return _objectSpread({}, item);
        } else {
          return item;
        }
      });
      console.log(newSpecs);
      return false;

      _this.setState({
        specs: newSpecs,
        sku: formatSku(newSpecs)
      });
    };

    _this.handleItemChange = function (e, spec, i) {
      var specs = _this.state.specs;
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
        sku: formatSku(newSpecs)
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
      return React.createElement("div", null, React.createElement("div", {
        className: styles.spec_title
      }, React.createElement(_Input, {
        placeholder: "\u5C5E\u6027\u540D",
        onBlur: function onBlur(e) {
          return _this.handleSpecNameChange(e, spec);
        },
        defaultValue: spec.name
      })), React.createElement("div", {
        className: styles.spec_list
      }, React.createElement(_Row, null, spec.items.map(function (item, i) {
        return React.createElement(_Col, {
          span: 4,
          key: i
        }, React.createElement(_Input, {
          onBlur: function onBlur(e) {
            return _this.handleItemChange(e, spec, i);
          },
          className: styles.itemInput,
          defaultValue: item,
          placeholder: "\u5C5E\u6027\u503C",
          suffix: React.createElement(_Icon, {
            onClick: function onClick() {
              return _this.handleRemoveItem(spec, i);
            },
            type: "close"
          })
        }));
      }), React.createElement(_Col, {
        span: 4
      }, React.createElement(_Button, {
        type: "circle",
        onClick: function onClick() {
          return _this.handleAddItem(spec);
        },
        icon: "plus"
      })))));
    };

    _this.renderSpec = function () {
      return React.createElement(Fragment, null, _this.state.specs.map(function (item) {
        return React.createElement(_Alert, {
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
    key: "render",
    value: function render() {
      var _this$state = this.state,
          specs = _this$state.specs,
          sku = _this$state.sku;
      return React.createElement("div", null, React.createElement(_Button, {
        onClick: this.handleAddSpec,
        type: "circle",
        icon: "plus"
      }), this.renderSpec(), sku.length > 0 && React.createElement(_Table, {
        pagination: false,
        rowKey: 'spec',
        dataSource: sku,
        columns: this.columns
      }));
    }
  }]);

  return GoodsSpec;
}(Component);

export default GoodsSpec;