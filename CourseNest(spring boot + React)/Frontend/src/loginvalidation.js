// loginvalidation.js

const loginvalidation = (values) => {
    let errors = {};

    // User ID (email) validation
    if (!values.userid.trim()) {
        errors.userid = "User ID is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.userid)) {
        errors.userid = "Invalid email format";
    }

    // Password validation
    if (!values.pwd.trim()) {
        errors.pwd = "Password is required";
    } else if (values.pwd.length < 6) {
        errors.pwd = "Password must be at least 6 characters long";
    }

    return errors;
}

export default loginvalidation;

// const loginOGvalidation=(values)=>{
//     let errors={}
//     if(!values.userid){
//         errors.userid="User id is required"
//     }
//     if(!values.pwd){
//         errors.pwd="Password is required"
//     }    
//     return errors;
// }

// export default loginOGvalidation;