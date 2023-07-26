import css from './Button.module.css'
import PropTypes from 'prop-types';

export const Button = ({ text, onHandelClick }) => {
    return (
        <button className={css.load} type="button" onClick={onHandelClick}>{text}</button>
    )
}

Button.propTypes = {
 text: PropTypes.string.isRequired,
 onHandelClick: PropTypes.func.isRequired
}