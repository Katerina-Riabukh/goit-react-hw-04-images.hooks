import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';


export const ImageGallaryItem = ({ array, openModal, handelFillModal }) => {

    return array.map((item) => {
        const { id, webformatURL, tags, largeImageURL } = item;
        const onClickItem = (e) => {
            openModal()
            handelFillModal(id, largeImageURL)

        }

        return (<li onClick={onClickItem} className={css.galleryItem} key={id}>
            <img src={webformatURL} alt={tags} />
        </li>)

    });
};

ImageGallaryItem.propType = {

    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    handelFillModal: PropTypes.func.isRequired
}

