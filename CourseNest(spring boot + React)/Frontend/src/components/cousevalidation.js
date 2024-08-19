const coursevalidation=(values)=>{
    let errors={}
    if(!values.coursename){
        errors.coursename="course Name is required"
    }
    if(!values.price){
        errors.price="Price is required"
    } 
    if(!values.coursecat){
        errors.coursecat="Category is required"
    }   
    return errors;
}

export default coursevalidation;