const API_KEY = '36945687-a4e7966ed6349b63eadd861cc';
const URL = 'https://pixabay.com/api/';

export const ServiseRequest = (query, page) => {

    const data = fetch(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&page=${page}`)
    return data;
}