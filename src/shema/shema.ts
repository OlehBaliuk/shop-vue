import * as yup from 'yup';
import i18n from '../i18n';

const UserProfileSchema = yup.object().shape({
  contactType: yup.string().required('one contact must be required'),
  // @ts-ignore
  first: yup.string().required(i18n.t('profile.first')).max(25, 'max length 25 characters'),

  last: yup.string().required('Last name is required').max(25, 'max length 25 characters'),

  phone: yup.string().when('contactType', {
    is: (value: string) => value === 'phone',
    then: yup.string().required('Phone is required').length(17, 'incorrect phone number'),
  }),

  email: yup
    .string()
    .email()
    .when('contactType', {
      is: (value: string) => value === 'email',
      then: yup.string().required('Must enter email address'),
    }),

  city: yup
    .string()
    .nullable()
    .when('contactType', {
      is: (value: string) => value === 'country and city',
      then: yup.string().required('Country is required').nullable(),
    }),

  country: yup
    .string()
    .nullable()
    .when('contactType', {
      is: (value: string) => value === 'country and city',
      then: yup.string().required('City is required').nullable(),
    }),
});

export default UserProfileSchema;
