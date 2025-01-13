import Stars from "../Components/Stars"

const ReviewCard = (props) => {
    return(
        <div className="card mt-4 rounded h-100" style={{width:'600px', boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"}}>
            <div className="card-title h2 mt-4">{props.title}</div>
            <div className="card-subtitle h5"><Stars reviews={props.review} /></div>
            <div className="card-body my-3">{props.text}</div>
            <div className="card-footer">{props.date}</div>
        </div>
    )
}

export default ReviewCard