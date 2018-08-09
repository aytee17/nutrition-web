import React, { Component } from "react";
import style from "./SearchBar.scss";
import { keys } from "../../Utility";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.wait = null;
    }

    onInputChange = event => {
        const value = event.target.value;
        this.search(value);
        /**
		clearTimeout(this.wait);
		this.wait = setTimeout(() => {
			this.search(value);
		}, 250);
		**/
    };

    search(searchTerm) {
        this.props.updateSearchTerm(searchTerm);
        this.props.runSearch(searchTerm);
    }

    onKeyDown = event => {
        const keyPressed = event.keyCode;
        if (keyPressed == keys.UP || keyPressed == keys.DOWN) {
            event.preventDefault();
            this.cycleItems(keyPressed);
        } else if (keyPressed == keys.ENTER && this.props.activeItem) {
            this.props.addActiveItem();
        }
    };

    cycleItems(keyPressed) {
        const {
            order,
            setActiveItem,
            activeItem,
            clearActiveItem
        } = this.props;

        if (!activeItem) {
            const id =
                keyPressed === keys.UP ? order[order.length - 1] : order[0];
            setActiveItem(id);
        } else {
            const activeIndex = order.findIndex(itemId => {
                return itemId === activeItem;
            });

            let nextIndex =
                keyPressed === keys.UP ? activeIndex - 1 : activeIndex + 1;

            if (nextIndex >= order.length || nextIndex < 0) {
                clearActiveItem();
            } else {
                setActiveItem(order[nextIndex]);
            }
        }
    }

    render() {
        return (
            <input
                className={style["search-box"]}
                placeholder="Search for an ingredient"
                value={this.props.searchTerm}
                onChange={this.onInputChange}
                onKeyDown={this.onKeyDown}
                ref={this.props.forwardedRef}
            />
        );
    }
}

export default React.forwardRef((props, ref) => {
    return <SearchBar {...props} forwardedRef={ref} />;
});
