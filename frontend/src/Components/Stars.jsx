const Stars = (props) => { 
    function renderStars(reviews){
        if(reviews>0 && reviews<1){
            return (
                <div>
                    {reviews}
                    <i class="bi bi-star-half"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i> 
                </div>
            )
        }else if(reviews==1){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
            )
        }
        
        else if(reviews>1 && reviews<2){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i> 
                </div>
            )
        }else if(reviews>=2 && reviews<3){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
            )
        }
        else if(reviews>3 && reviews<4){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                    <i class="bi bi-star"></i> 
                </div>
            )
        }
        else if(reviews>4 && reviews<5){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i> 
                </div>
            )
        }else if(reviews==5){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
            )
        }
        else if(reviews==2 ) {
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
            )
        }
        else if(reviews==3){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
            )
        }
        else if(reviews==4){
            return(
                <div>
                    {reviews}
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star"></i>
                </div>
            )
        }
    }

    return(
        <div className="m-2 text-warning">
            {renderStars(props.reviews)} 
        </div>
    )

}

export default Stars