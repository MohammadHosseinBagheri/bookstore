import * as Yup from 'yup';
export const SIGNIN_VALIDATION = Yup.object({
  // email: Yup.string().required('required').email('invalid email'),
  phone: Yup.string()
    .required('required')
    .matches(/^\d+$/, 'invalid phone')
    .length(11, 'phone number is 11 characters'),
  password: Yup.string().required('required').min(6, 'at least 6 charachters'),
});
export const REGISTRATION_VALIDATION = Yup.object({
  email: Yup.string().required('required').email('invalid email'),
  password: Yup.string().required('required').min(6, 'at least 6 charachters'),
  name: Yup.string().required('required'),
  phone: Yup.string()
    .required('required')
    .matches(/^\d+$/, 'invalid phone')
    .length(10, 'phone number is 10 characters'),
});
