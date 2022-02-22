import axios from 'axios';

export default axios.create({
    baseURL:
        'https://restaurant-reviews-vladdyhell.herokuapp.com/api/v1/restaurants',
    withCredentials: true,
    header: {
        'Content-type': 'aplication/json',
    },
});
