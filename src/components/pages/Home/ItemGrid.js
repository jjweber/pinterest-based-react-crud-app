import React, { Component } from 'react';
import $ from 'jquery';
import Masonry from 'react-masonry-component';

import Item from './Item';
import Modal from '../modal';

class ItemGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            currentItemBeingSaved: null,
            currentImageBeingSaved: ""
        };

        this.saveComic = this.saveComic.bind(this);
    }

    saveComic(item) {
        console.log("Showing dialog to save this comic with options: ", item);
        this.setState({currentItemBeingSaved: item});

        let imageUrl = item.thumbnail.path + "." + item.thumbnail.extension;
        this.setState({currentImageBeingSaved: imageUrl});

        //$('#saveModal').modal();

        //$(this.refs.modal.getDOMNode()).modal();

        this.openModal();
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }

    render() {
        let masonryOptions = {
            transitionDuration: '1.0s',
            fitWidth: true,
            columnWidth: 60,
            gutter: 5
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

                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <div className="modal-header"><h1>Save To Board</h1></div>
                    <div className="modal-content">
                        <p><img src={this.state.currentImageBeingSaved} className="grid-photo" /></p>
                        <p>This is a description of the comic selected.</p>
                        <button onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default ItemGrid;
