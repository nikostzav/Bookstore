import axios from 'axios'
import { useState,useEffect } from 'react';
import Stars from './Stars';

const Reviews = (props) => {

    const [reviews,setReviews] = useState([]);

    // const getReviews = async () => { 
    // await axios.get(`http://localhost:8000/api/getReviews/${props.id}`)
    // .then(response => {
    //     console.log(allReviews)
    //     const allReviews = response.data;
    //     setReviews(allReviews);
    // })
    //  .catch(err => console.log(err))
    // }

    // useEffect( () => {
    //     getReviews()
    // },[])

    //  const getReviews =  async () => {
    //     try {
    //         const response =  await axios.get(`http://localhost:8000/api/getReviews/${props.id}`);
    //         const allReviews = response.data;
    //         console.log(allReviews);
    //         setReviews(allReviews);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     getReviews();
    // }, [props.id]);


    const getReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getReviews/${props.id}`);
            const allReviews = response.data;
            setReviews(allReviews);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        if (props.id) {
            getReviews();
        }
    }, [props.id]);


    console.log("Reviews for book with id: " + props.id );
    console.log(reviews);

    const numReviews = "(" + reviews.length + ")"
   
    return(
         <div className='container bg-white'>
            <h1 className='m-5'>Reviews</h1>
            
            {/* {reviews.map(review => (
                <div className='row row-cols-2 border rounded' key={review.review_id}>
                    <div className='col-4 border text-start bg-white'>
                        <h2>{review.user_name}</h2>
                        <p><Stars reviews={review.rating}/></p>
                        <p>{review.review_date}</p>
                    </div>
                    <div className='col-8 justify-content-center my-5 '>
                        <p>{review.review_text}</p>
                    </div>
                </div>
            ))} */}
            <div className='row row-cols-1 row-cols-lg-2 '>
                {reviews.map(review => (
                
                    <div className='col'>
                    <div class="card m-3" style={{boxShadow: "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px"}}>
                        <div class="card-header">
                            <h2>{review.user_name}</h2>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title m-0"><Stars reviews={review.rating}/></h5>
                            <p class="card-text mt-3 lead">{review.review_text}</p>
                            <p className='lead mt-4'>{review.review_date}</p>
                        </div>
                    </div>
                    </div>
                
            ))}
            </div>

        </div>
    )

}

export default Reviews