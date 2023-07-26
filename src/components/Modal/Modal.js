import css from './Modal.module.css'
import { Component } from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    };

    onKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.closeModal()
        }
    };

    onBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.closeModal()
        }
    };


    render() {

        return createPortal(<div onClick={this.onBackdropClick} className={css.overlay}>
            <div className={css.modal}>
             {this.props.children}
            </div>
            </div>, modalRoot
        );
    };


};