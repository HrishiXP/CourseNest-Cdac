
function Course(props){
    const {x,showModal}=props

    return (
        <div className="col-sm-3" key={x.courseid}>
            <div className="card text-center text-white mb-3  bg-dark" style={{boxShadow:"0 0 1px 1px black"}}>
                <div className="card-header p-1 border-bottom border-dark">
                    <h5>{x.coursename}</h5>
                </div>
                <div className="card-body py-1">
                <img style={{width:"90%",height:"250px",marginBottom:"10px"}} src={"http://localhost:8080/"+x.photo} className="img-thumnail" />
                
                <h6 className="float-right">Price: &#8377; {x.price}</h6>                           
                </div>
                <div className="card-footer p-1 border-top border-dark m-2">
                    <button type="button" class="btn  buynow " onClick={e=>showModal(x)}>Buy Now</button>
                    {/* btn-outline-warning */}
                </div>
            </div>
        </div>
    )
}

export default Course;