import React, { Component } from 'react';

import Masonry from 'react-masonry-component';

import Item from './Item';

class ItemGrid extends Component {
    constructor(props) {
        super(props);

        this.saveComic = this.saveComic.bind(this);
    }

    saveComic(item) {
        console.log("Showing dialog to save this comic with options: ", item);
    }

    render() {
        let masonryOptions = {
            transitionDuration: '1.0s',
            columnWidth: 100,
            gutter: 10
        };

        let GridItems = this.props.comics
            .filter( comic => (
                comic.thumbnail.path.toLowerCase().indexOf("image_not_available".toLowerCase()) === -1))
            .map( comic => {
                return <Item item={comic} saveItem={this.saveComic} key={comic.id} className="image-element-class" />
            });

        console.log("ItemGird is here looking for comics: ", this.props.comics);

        return (
            <div>
                <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'div'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} >
                    {GridItems}
                </Masonry>

                <div className="modal fade container-fluid saveModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <h2>Delete Expense</h2>
                            <form id="deleteExpenseForm">
                                Will add to current or new board
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ItemGrid;