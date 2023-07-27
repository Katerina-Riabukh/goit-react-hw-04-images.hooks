import css from './Modal.module.css'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({ closeModal, imageSrc }) => {

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.code === 'Escape') {
                closeModal()
            }
        }
        window.addEventListener('keydown', onKeyDown)

        return () => {

            window.removeEventListener('keydown', onKeyDown)
        }
    }, [closeModal])

    const onBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    };

    return createPortal(<div onClick={onBackdropClick} className={css.overlay}>
        <div className={css.modal}>
            <img src={imageSrc} alt='' />
        </div>
    </div>, modalRoot
    );

};