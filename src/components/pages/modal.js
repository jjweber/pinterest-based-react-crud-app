import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    close(e) {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render() {
        if (this.props.isOpen === false)
            return null

        let modalStyle = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff',
            padding: '1rem'
        }

        let backdropStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.7)'
        }

        return (
            <div>
                <div style={modalStyle}>{this.props.children}</div>
                <div style={backdropStyle} onClick={e => this.close(e)}/>}
            </div>
        )
    }

}

export default Modal;
