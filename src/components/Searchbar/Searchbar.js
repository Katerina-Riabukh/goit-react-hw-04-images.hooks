import css from './Serchbar.module.css'
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {

    const formSubmit = (e) => {
        e.preventDefault()
        const value = e.target.elements.input.value.toLowerCase();
        if (value.trim() === '') {
            alert('Please make shure that the request is entered correctly')
            return
        }
        onSubmit(value);
    };

    return (<header className={css.searchbar}>
        <form className={css.form} onSubmit={formSubmit}>

            <input
                className={css.input}
                type="text"
                autoComplete="off"
                name='input'
                autoFocus
                placeholder="Search images and photos"
            />

            <button type="submit" className={css.button}>
                <span className="button-label">Search</span>
            </button>
        </form>
    </header>

    )
};

Searchbar.prototype={
    onSubmit: PropTypes.func.isRequired
}