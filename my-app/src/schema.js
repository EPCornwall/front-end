import * as yup from 'yup'

export default yup.object().shape({
    name: yup.string()
        .required('Name field is Required')
        .min(2, 'Name must be 2 characters or longer'),

    email: yup.string()
        .required('E-mail field is Required'),

    password: yup.string()
        .required('Password field is Required')
        .min(8, 'Password must be 8 characters or longer'),

    cbx: yup.boolean()
        .required('You have to agree to the Terms of Service')
    
})







