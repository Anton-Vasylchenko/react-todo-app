import React, { Component } from 'react';
import './add-item.css';


class AddItem extends Component {

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    });
  }

  render() {
    return (
      <form className="d-flex add-item-form"
        onSubmit={this.onSubmit}
        >
        <input type="text"
          className="form-control"
          placeholder="What needs to be done?"
          onChange={ this.onLabelChange }
          value={this.state.label}
          />
        <button
            className="btn btn-outline-secondary btn-new-item"
          >
          Add new item
        </button>
      </form>
    );
  }
}

export default AddItem;
