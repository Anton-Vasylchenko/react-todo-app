import React, { Component } from 'react';
import TrashBasketItem from '../trash-basket-item';

import trashIcon from '../../assets/images/trash.png'

import './trash-basket.css';

export default class TrashBaster extends Component {

  state = {
    toggle: true
  };

  basketToggle = () => {
    this.setState(({ toggle }) => {
      const newToggle = !toggle;
      return ({
        toggle: newToggle
      })
    })
  }

  basketList() {
    const { trashList, onRestoreItem } = this.props;

    const msg = 'empty';

    if (trashList.length === 0) {
      return (
        <div className="empty-msg-baket">
          {msg}
        </div>
      );
    }

    const elements = trashList.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <li key={id} className="list-group-item">
          <TrashBasketItem
            {...itemProps}
            onRestoreItem={() => onRestoreItem(id)}
          />
        </li>
      );
    });
    return elements;
  }

  render() {
    const { trash, onClearBasket } = this.props;
    const { toggle } = this.state;
    let items = this.basketList();

    let classNames = 'trash-basket-list'

    if (toggle) {
      classNames += ' d-none';
    }

    return (
      <div className="trash-basket-wrapper">
        <div className="trash-basket">
          <span className="trash-count"> {trash} </span>
          <div className="trash-icon" onClick={this.basketToggle} >
            <img src={trashIcon} alt="trash" />
          </div>
        </div>
        <div className={classNames} >
          <button
            className="btn btn-outline-danger basket-clear-btn"
            onClick={onClearBasket}
          >
            Delete all
          </button>
          {items}
        </div>
      </div>
    );
  }
}