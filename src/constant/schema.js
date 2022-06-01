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
    .length(11, 'phone number is 11 characters'),
});

export const REGISTR_UNIVERSITY_VALIDATION = Yup.object({
  name: Yup.string().required('نام اجباری است!'),
  province: Yup.string().required('استان اجباری است!'),
  city: Yup.string().required('شهر اجباری است!'),
});
