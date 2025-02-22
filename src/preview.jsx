/**
  * <Preview />
  */

import React from 'react';
import update from 'immutability-helper';
import store from './stores/store';
import FormElementsEdit from './form-elements-edit';
import SortableFormElements from './sortable-form-elements';

const { PlaceHolder } = SortableFormElements;

export default class Preview extends React.Component {
  constructor(props) {
    super(props);

    const { onLoad, onPost } = props;
    store.setExternalHandler(onLoad, onPost);

    this.editForm = React.createRef();
    this.state = {
      data: [],
      answer_data: {},
    };

    const onUpdate = this._onChange.bind(this);
    store.subscribe(state => onUpdate(state.data));

    this.moveCard = this.moveCard.bind(this);
    this.insertCard = this.insertCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      store.dispatch('updateOrder', nextProps.data);
    }
  }

  componentDidMount() {
    const { data, url, saveUrl } = this.props;
    store.dispatch('load', { loadUrl: url, saveUrl, data: data || [] });
    document.addEventListener('mousedown', this.editModeOff);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.editModeOff);
  }

  editModeOff = (e) => {
    if (this.editForm.current && !this.editForm.current.contains(e.target)) {
      this.manualEditModeOff();
    }
  }

  manualEditModeOff = () => {
    const { editElement } = this.props;
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      this.updateElement(editElement);
    }
    this.props.manualEditModeOff();
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement(element) {
    const { data } = this.state;
    let found = false;

    for (let i = 0, len = data.length; i < len; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      store.dispatch('updateOrder', data);
    }
  }

  _onChange(data) {
    const answer_data = {};

    data.forEach((item) => {
      if (item && item.readOnly && this.props.variables[item.variableKey]) {
        answer_data[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    this.setState({
      data,
      answer_data,
    });
  }

  _onDestroy(item) {
    store.dispatch('delete', item);
  }

  insertCard(item, hoverIndex) {
    const { data } = this.state;
    data.splice(hoverIndex, 0, item);
    this.saveData(item, hoverIndex, hoverIndex);
  }

  moveCard(dragIndex, hoverIndex) {
    const { data } = this.state;
    const dragCard = data[dragIndex];
    this.saveData(dragCard, dragIndex, hoverIndex);
  }

  // eslint-disable-next-line no-unused-vars
  cardPlaceHolder(dragIndex, hoverIndex) {
    // Dummy
  }

  saveData(dragCard, dragIndex, hoverIndex) {
    const newData = update(this.state, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    });
    this.setState(newData);
    store.dispatch('updateOrder', newData.data);
  }

  getElement(item, index) {
    const SortableFormElement = SortableFormElements[item.element];
    return <SortableFormElement id={item.id} index={index} moveCard={this.moveCard} insertCard={this.insertCard} mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) { classes += ' is-editing'; }
    const data = this.state.data.filter(x => !!x);
    const items = data.map((item, index) => this.getElement(item, index));
    
    let borderColor = '';
    if (this.props.borderColor) {
      let { r, g, b, a } = this.props.borderColor;
      borderColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    
    let formColor = '';
    if (this.props.formColor) {
      let { r, g, b, a } = this.props.formColor;
      formColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    const style = {
      borderWidth: this.props.borderWidth,
      borderColor,
      borderStyle: this.props.borderType,
    };

    if (this.props.background_image_url.length > 0) {
      style['background'] = `url("${this.props.background_image_url}")`;
      style['background-repeat'] = 'repeat';
    } else {
      style['backgroundColor'] = formColor;
    }
    
    /**
     * color: 'white',
		background: 'red',
		size: 30,
		alignment: 'center',
		borderRadius: 10,
		bold: false,
		italic: false,
		underline: false
     */

    const {color, background, borderRadius} = this.props.submitButton;
    
    const toolbarStyle = {display: 'flex', padding: '0 20px'};

    const submitStyle = {
      color,
      background,
      borderRadius,
      fontSize: this.props.submitButton.size
    }

    if (this.props.submitButton.alignment === "left") {
      submitStyle.marginRight = 'auto';
    } else if (this.props.submitButton.alignment === "right") {
      submitStyle.marginLeft = 'auto';
    } else {
      submitStyle.margin = '15px auto 0 auto';
    }

    if (this.props.submitButton.bold) {
      submitStyle.fontWeight = 'bold';
    }
    
    if (this.props.submitButton.italic) {
      submitStyle.fontStyle = 'italic';
    }
    
    if (this.props.submitButton.underline) {
      submitStyle.textDecoration = 'underline';
    }

    return (
      <div className={classes} style={style}>
        <div className="edit-form" ref={this.editForm}>
          { this.props.editElement !== null &&
            <FormElementsEdit lists={this.props.lists} customAttributes={this.props.customAttributes} showCorrectColumn={this.props.showCorrectColumn} files={this.props.files} manualEditModeOff={this.manualEditModeOff} preview={this} element={this.props.editElement} updateElement={this.updateElement} />
          }
        </div>
        <div className="Sortable">{items}</div>
         <PlaceHolder id="form-place-holder" show={items.length === 0} index={items.length} moveCard={this.cardPlaceHolder} insertCard={this.insertCard}/>
         <div style={toolbarStyle}>
          <input type='submit' style={submitStyle} className='btn btn-school btn-big btn-agree' />
         </div>
      </div>
    );
  }
}
Preview.defaultProps = {
  showCorrectColumn: false, files: [], editMode: false, editElement: null, className: 'react-form-builder-preview pull-left',
};
