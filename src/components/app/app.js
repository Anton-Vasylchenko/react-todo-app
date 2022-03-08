import React, { Component } from "react";

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';
import TrashBasket from '../trash-basket';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        trashData: [],
        term: '',
        filter: 'all' // all, active, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData, trashData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const delItem = todoData.filter((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            delItem[0].idx = idx;

            const delArray = [
                ...trashData,
                ...delItem,
            ];

            return {
                todoData: newArray,
                trashData: delArray
            };
        });
    };

    addItem = (text) => {

        if (text.length === 0) {
            return;
        }

        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            };
        });

    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onRestoreItem = (id) => {
        this.setState(({ todoData, trashData }) => {
            const returnIdx = trashData.findIndex((el) => el.id === id);
            const returnItem = { ...trashData[returnIdx] };
            const idx = returnItem.idx;
            delete returnItem.idx;

            const newTodoArray = [
                ...todoData.slice(0, idx),
                returnItem,
                ...todoData.slice(idx)
            ];

            const newTrashData = [
                ...trashData.slice(0, returnIdx),
                ...trashData.slice(returnIdx + 1)
            ];

            return {
                todoData: newTodoArray,
                trashData: newTrashData
            }

        });
    };

    onClearBasket = () => {
        this.setState(({ trashData }) => {
            return {
                trashData: []
            }
        });
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onSearchChange = (term) => {
        this.setState({ term })
    }

    onFilterChange = (filter) => {
        this.setState({ filter })
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }


    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((el) => !el.done)
            case 'done':
                return items.filter((el) => el.done)
            default:
                return items;
        }
    }

    render() {
        const { todoData, term, filter, trashData } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const trashCount = trashData.length;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                    filter={filter}
                />

                <AddItem onItemAdded={this.addItem} />
                <TrashBasket
                    trash={trashCount}
                    trashList={trashData}
                    onRestoreItem={this.onRestoreItem}
                    onClearBasket={this.onClearBasket}
                />
            </div>
        );
    }
};
