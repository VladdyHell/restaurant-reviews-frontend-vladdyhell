import React, { useState } from 'react';
import RestaurantDataService from '../services/restaurants';
import { Link, useLocation, useParams } from 'react-router-dom';

function AddReview(props) {
    let initialReviewState = '';

    let editing = false;

    let location = useLocation();
    let restId = useParams().id;

    if (location.state && location.state.currentReview) {
        editing = true;
        initialReviewState = location.state.currentReview.text;
    }

    const [review, setReview] = useState(initialReviewState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setReview(e.target.value);
    };

    const saveReview = () => {
        const data = {
            text: review,
            name: props.user.name,
            user_id: props.user.id,
            restaurant_id: restId,
        };

        if (editing) {
            data.review_id = location.state.currentReview._id;
            RestaurantDataService.updateReview(data)
                .then((res) => {
                    setIsSubmitted(true);
                    console.log(res.data);
                })
                .catch(console.log);
        } else {
            RestaurantDataService.createReview(data)
                .then((res) => {
                    setIsSubmitted(true);
                    console.log(res.data);
                })
                .catch(console.log);
        }
    };

    return (
        <>
            {props.user ? (
                <div className="submit-form">
                    {isSubmitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <Link
                                to={'/restaurants/' + restId}
                                className="btn btn-success"
                            >
                                Back to Restaurant
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">
                                    {editing ? 'Edit' : 'Create'} Review
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    required
                                    value={review}
                                    onChange={handleInputChange}
                                    name="text"
                                />
                            </div>
                            <button
                                onClick={saveReview}
                                className="btn btn-success"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>Please log in.</div>
            )}
        </>
    );
}

export default AddReview;
