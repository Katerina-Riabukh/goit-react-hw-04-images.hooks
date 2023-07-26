import { ImageGallaryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types';

export const ImageGallery = ({ array, openModal, handelFillModal}) => {
    return (<ul className={css.gallary}>
        <ImageGallaryItem array={array} openModal={openModal} handelFillModal={handelFillModal} />
    </ul>
    )

}

ImageGallaryItem.propType = {

    array: PropTypes.arrayOf(PropTypes.object.isRequired),
    openModal: PropTypes.func.isRequired,
    handelFillModal: PropTypes.func.isRequired
}



