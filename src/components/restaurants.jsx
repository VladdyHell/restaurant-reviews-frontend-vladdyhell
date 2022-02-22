import React, { useState, useEffect } from 'react';
import RestaurantDataService from '../services/restaurants';
import { Link, useParams } from 'react-router-dom';

function Restaurant({ user }) {
    const restId = useParams().id;

    const initialRestaurantState = {
        id: null,
        name: '',
        address: {},
        cuisine: '',
        reviews: [],
    };

    const [restaurant, setRestaurant] = useState(initialRestaurantState);

    useEffect(() => {
        getRestaurant(restId);
        console.log(user);
    }, [restId]);

    const getRestaurant = (id) => {
        RestaurantDataService.get(id)
            .then((res) => {
                console.log(res.data);
                setRestaurant(res.data);
            })
            .catch(console.log);
    };

    const deleteReview = (reviewId, i) => {
        RestaurantDataService.deleteReview(reviewId, user.id)
            .then((res) => {
                setRestaurant((prevState) => {
                    prevState.reviews.splice(i, 1);
                    return { ...prevState };
                });
            })
            .catch(console.log);
    };

    return (
        <>
            {restaurant.id !== null ? (
                <div>
                    <h5>{restaurant.name}</h5>
                    <p>
                        <strong>Cuisine: </strong>
                        {restaurant.cuisine}
                        <br />
                        <strong>Address: </strong>
                        {restaurant.address.building}{' '}
                        {restaurant.address.street},{' '}
                        {restaurant.address.zipcode}
                    </p>
                    <Link
                        to={`/restaurants/${restId}/review`}
                        className="btn btn-primary"
                    >
                        Add Review
                    </Link>
                    <h4> Reviews </h4>
                    <div className="row">
                        {restaurant.reviews.length > 0 ? (
                            restaurant.reviews.map((review, index) => {
                                return (
                                    <div className="col-lg-4 pb-1" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {review.text}
                                                    <br />
                                                    <strong>User: </strong>
                                                    {review.name} <br />
                                                    <strong>UserID: </strong>
                                                    {review.user_id}
                                                    <br />
                                                    <strong>Date: </strong>
                                                    {review.date}
                                                </p>
                                                {user &&
                                                    user.id ===
                                                        review.user_id && (
                                                        <div className="row">
                                                            <btn
                                                                onClick={() =>
                                                                    deleteReview(
                                                                        review._id,
                                                                        index
                                                                    )
                                                                }
                                                                className="btn btn-primary col-lg-5 mx-1 mb-1"
                                                            >
                                                                Delete
                                                            </btn>
                                                            <Link
                                                                to={`/restaurants/${restId}/review`}
                                                                state={{
                                                                    currentReview:
                                                                        review,
                                                                }}
                                                                className="btn btn-primary col-lg-5 mx-1 mb-1"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-sm-4">
                                <p>No reviews yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <br />
                    <p>No restaurant selected.</p>
                </div>
            )}
        </>
    );
}

export default Restaurant;
