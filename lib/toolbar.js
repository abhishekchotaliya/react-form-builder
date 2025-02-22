"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _toolbarDraggableItem = _interopRequireDefault(require("./toolbar-draggable-item"));

var _UUID = _interopRequireDefault(require("./UUID"));

var _store = _interopRequireDefault(require("./stores/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Toolbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    var _this;

    _classCallCheck(this, Toolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toolbar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "create", function (item) {
      var elementOptions = {
        id: _UUID["default"].uuid(),
        element: item.key,
        text: item.name,
        "static": item["static"],
        required: false
      };

      if (item["static"]) {
        elementOptions.bold = false;
        elementOptions.italic = false;
      }

      if (item.canHaveAnswer) {
        elementOptions.canHaveAnswer = item.canHaveAnswer;
      }

      if (item.canReadOnly) {
        elementOptions.readOnly = false;
      }

      if (item.canDefaultToday) {
        elementOptions.defaultToday = false;
      }

      if (item.content) {
        elementOptions.content = item.content;
      }

      if (item.href) {
        elementOptions.href = item.href;
      } // elementOptions.canHavePageBreakBefore = item.canHavePageBreakBefore !== false;


      elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
      elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
      elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
      elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;

      if (item.key === 'Image') {
        elementOptions.src = item.src;
      }

      if (item.key === 'DatePicker') {
        elementOptions.dateFormat = item.dateFormat;
        elementOptions.timeFormat = item.timeFormat;
        elementOptions.showTimeSelect = item.showTimeSelect;
        elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
      }

      if (item.key === 'Download') {
        elementOptions._href = item._href;
        elementOptions.file_path = item.file_path;
      }

      if (item.key === 'Range') {
        elementOptions.step = item.step;
        elementOptions.default_value = item.default_value;
        elementOptions.min_value = item.min_value;
        elementOptions.max_value = item.max_value;
        elementOptions.min_label = item.min_label;
        elementOptions.max_label = item.max_label;
      }

      if (item.key === "List" && _this.props.lists) {
        elementOptions.lists = _this.props.lists;
        elementOptions.selected_lists = [];
        elementOptions.options = [];
      }

      if (item.key === 'Attributes' && _this.props.attributes) {
        elementOptions.attributes = _this.props.attributes;
        elementOptions.options = [];
      }

      if (item.defaultValue) {
        elementOptions.defaultValue = item.defaultValue;
      }

      if (item.field_name) {
        elementOptions.field_name = item.field_name + _UUID["default"].uuid();
      }

      if (item.label) {
        elementOptions.label = item.label;
      }

      if (item.options) {
        elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element);
      } // console.log(elementOptions);


      return elementOptions;
    });

    var items = _this.props.items ? _this.props.items : _this._defaultItems();
    _this.state = {
      items: items
    };

    _store["default"].subscribe(function (state) {
      return _this.setState({
        store: state
      });
    });

    return _this;
  }

  _createClass(Toolbar, [{
    key: "_defaultItems",
    value: function _defaultItems() {
      return [{
        key: 'List',
        canHaveAnswer: true,
        name: 'list',
        label: 'List Selection',
        icon: 'fa fa-address-card-o',
        field_name: 'list_input_',
        selected_lists: []
      }, {
        key: 'Attributes',
        canHaveAnswer: true,
        name: 'Attribute',
        label: 'Custom Attribute',
        icon: 'fa fa-address-card-o',
        field_name: 'attribute_input_',
        selected_attribute: ''
      }, {
        key: 'Header',
        name: 'Heading',
        icon: 'fa fa-header',
        "static": true,
        content: 'Placeholder Text...'
      }, {
        key: 'Label',
        name: 'Text',
        "static": true,
        icon: 'fa fa-font',
        content: 'Placeholder Text...'
      }, {
        key: 'Paragraph',
        name: 'Paragraph',
        "static": true,
        icon: 'fa fa-paragraph',
        content: 'Placeholder Text...'
      }, {
        key: 'LineBreak',
        name: 'Line Break',
        "static": true,
        icon: 'fa fa-arrows-h'
      }, // {
      //   key: 'Dropdown',
      //   canHaveAnswer: true,
      //   name: 'Dropdown',
      //   icon: 'fa fa-caret-square-o-down',
      //   label: 'Placeholder Label',
      //   field_name: 'dropdown_',
      //   options: [],
      // },
      // {
      //   key: 'Tags',
      //   canHaveAnswer: true,
      //   name: 'Tags',
      //   icon: 'fa fa-tags',
      //   label: 'Placeholder Label',
      //   field_name: 'tags_',
      //   options: [],
      // },
      // {
      //   key: 'Checkboxes',
      //   canHaveAnswer: true,
      //   name: 'Checkboxes',
      //   icon: 'fa fa-check-square-o',
      //   label: 'Placeholder Label',
      //   field_name: 'checkboxes_',
      //   options: [],
      // },
      // {
      //   key: 'RadioButtons',
      //   canHaveAnswer: true,
      //   name: 'Multiple Choice',
      //   icon: 'fa fa-dot-circle-o',
      //   label: 'Placeholder Label',
      //   field_name: 'radiobuttons_',
      //   options: [],
      // },
      // {
      //   key: 'TextInput',
      //   canHaveAnswer: true,
      //   name: 'Text Input',
      //   label: 'Placeholder Label',
      //   icon: 'fa fa-font',
      //   field_name: 'text_input_',
      // },
      // {
      //   key: 'NumberInput',
      //   canHaveAnswer: true,
      //   name: 'Number Input',
      //   label: 'Placeholder Label',
      //   icon: 'fa fa-plus',
      //   field_name: 'number_input_',
      // },
      // {
      //   key: 'TextArea',
      //   canHaveAnswer: true,
      //   name: 'Multi-line Input',
      //   label: 'Placeholder Label',
      //   icon: 'fa fa-text-height',
      //   field_name: 'text_area_',
      // },
      {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'fa fa-photo',
        field_name: 'image_',
        src: ''
      }, // {
      //   key: 'Rating',
      //   canHaveAnswer: true,
      //   name: 'Rating',
      //   label: 'Placeholder Label',
      //   icon: 'fa fa-star',
      //   field_name: 'rating_',
      // },
      // {
      //   key: 'DatePicker',
      //   canDefaultToday: true,
      //   canReadOnly: true,
      //   dateFormat: 'MM/dd/yyyy',
      //   timeFormat: 'hh:mm aa',
      //   showTimeSelect: false,
      //   showTimeSelectOnly: false,
      //   name: 'Date',
      //   icon: 'fa fa-calendar',
      //   label: 'Placeholder Label',
      //   field_name: 'date_picker_',
      // },
      // {
      //   key: 'Signature',
      //   canReadOnly: true,
      //   name: 'Signature',
      //   icon: 'fa fa-pencil-square-o',
      //   label: 'Signature',
      //   field_name: 'signature_',
      // },
      {
        key: 'HyperLink',
        name: 'URL',
        icon: 'fa fa-link',
        "static": true,
        content: 'Placeholder Web site link ...',
        href: 'http://www.example.com'
      } // {
      //   key: 'Download',
      //   name: 'File Attachment',
      //   icon: 'fa fa-file',
      //   static: true,
      //   content: 'Placeholder file name ...',
      //   field_name: 'download_',
      //   file_path: '',
      //   _href: '',
      // },
      // {
      //   key: 'Range',
      //   name: 'Range',
      //   icon: 'fa fa-sliders',
      //   label: 'Placeholder Label',
      //   field_name: 'range_',
      //   step: 1,
      //   default_value: 3,
      //   min_value: 1,
      //   max_value: 5,
      //   min_label: 'Easy',
      //   max_label: 'Difficult',
      // },
      // {
      //   key: 'Camera',
      //   name: 'Camera',
      //   icon: 'fa fa-camera',
      //   label: 'Placeholder Label',
      //   field_name: 'camera_',
      // },
      ];
    }
  }, {
    key: "_onClick",
    value: function _onClick(item) {
      // ElementActions.createElement(this.create(item));
      _store["default"].dispatch('create', this.create(item));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        className: "react-form-builder-toolbar pull-right"
      }, _react["default"].createElement("ul", null, this.state.items.map(function (item) {
        return _react["default"].createElement(_toolbarDraggableItem["default"], {
          data: item,
          key: item.key,
          onCreate: _this2.create
        });
      })));
    }
  }], [{
    key: "_defaultItemOptions",
    value: function _defaultItemOptions(element) {
      switch (element) {
        case 'Dropdown':
          return [{
            value: 'place_holder_option_1',
            text: 'Place holder option 1',
            key: "dropdown_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_2',
            text: 'Place holder option 2',
            key: "dropdown_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_3',
            text: 'Place holder option 3',
            key: "dropdown_option_".concat(_UUID["default"].uuid())
          }];

        case 'Tags':
          return [{
            value: 'place_holder_tag_1',
            text: 'Place holder tag 1',
            key: "tags_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_tag_2',
            text: 'Place holder tag 2',
            key: "tags_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_tag_3',
            text: 'Place holder tag 3',
            key: "tags_option_".concat(_UUID["default"].uuid())
          }];

        case 'Checkboxes':
          return [{
            value: 'place_holder_option_1',
            text: 'Place holder option 1',
            key: "checkboxes_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_2',
            text: 'Place holder option 2',
            key: "checkboxes_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_3',
            text: 'Place holder option 3',
            key: "checkboxes_option_".concat(_UUID["default"].uuid())
          }];

        case 'RadioButtons':
          return [{
            value: 'place_holder_option_1',
            text: 'Place holder option 1',
            key: "radiobuttons_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_2',
            text: 'Place holder option 2',
            key: "radiobuttons_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_3',
            text: 'Place holder option 3',
            key: "radiobuttons_option_".concat(_UUID["default"].uuid())
          }];

        default:
          return [];
      }
    }
  }]);

  return Toolbar;
}(_react["default"].Component);

exports["default"] = Toolbar;