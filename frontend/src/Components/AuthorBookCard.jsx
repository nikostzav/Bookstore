import Stars from "../Components/Stars"
import authorStyles from '../Pages/authorStyle.css';
const AuthorBookCard = (props) => {
    
    return(
        <div className="card m-3 customDiv authorCard" style={{}}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.category}</h6>
                <p className="card-text"><Stars reviews={props.review}/></p>
                {/* <button className="btn btn-primary">Details</button> */}
            </div>
        </div>
        
  )
}

export default AuthorBookCard