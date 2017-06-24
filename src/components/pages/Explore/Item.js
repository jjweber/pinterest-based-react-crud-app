import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);

        // saveItem
        this.state = {
            item: this.props.item
        };

        this.triggerSaveDialog = this.triggerSaveDialog.bind(this);
    }

    triggerSaveDialog() {
        this.props.saveItem(this.state.item);
    }

    render() {
        let imageUrl = this.state.item.thumbnail.path + "." + this.state.item.thumbnail.extension;

        return (
            <div className="item-wrapper">
                <div onClick={this.triggerSaveDialog} className="save-item">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Save
                </div>
                <div className="item-img">
                    <img src={imageUrl} className="grid-photo" />
                </div>
            </div>
        )
    }
}

export default Item;