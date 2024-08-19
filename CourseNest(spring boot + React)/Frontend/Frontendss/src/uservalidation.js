const uservalidation = (values) => {
    let errors = {};

    // Name validation
    if (!values.name.trim()) {
        errors.name = "Name is required";
    }

    // City validation
   // if (!values.qualification.trim()) {
     //   errors.qualification = "City is required";
    //}

    //if (!values.city.trim()) {
      //  errors.city = "City is required";
    //}

    // Email validation
    if (!values.userid.trim()) {
        errors.userid = "Email id is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.userid)) {
        errors.userid = "Invalid email format";
    }

    // Phone validation
    if (!values.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Invalid phone number";
    }

    // Password validation
    if (!values.pwd.trim()) {
        errors.pwd = "Password is required";
    } else if (values.pwd.length < 6) {
        errors.pwd = "Password must be at least 6 characters long";
    }

    // Confirm Password validation
    if (!values.cpwd.trim()) {
        errors.cpwd = "Confirm password is required";
    } else if (values.cpwd !== values.pwd) {
        errors.cpwd = "Passwords do not match";
    }

    return errors;
}

export default uservalidation;
