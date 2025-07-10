import useVuelidate from '@vuelidate/core'
import { helpers, sameAs, required, url, email, numeric, between } from '@vuelidate/validators'

const requiredHelper = helpers.withMessage(
  'This field is required.',
  required
)

const emailHelper = helpers.withMessage(
  'Invalid email format.',
  email
)

const numericHelper = helpers.withMessage(
  'Please enter a number.',
  numeric
)

const urlHelper = helpers.withMessage(
  'Invalid URL format.',
  url
)

const mobileHelper = helpers.withMessage(
  'Please enter a 10-digit number starting with 09',
  // eslint-disable-next-line
  helpers.regex(/09\d{8}/)
)

const passwordHelper = helpers.withMessage(
  'Password must be 8-16 characters, including at least 1 letter.',
  helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)
)

export {
  useVuelidate,
  helpers, sameAs, requiredHelper, urlHelper, passwordHelper, emailHelper, numericHelper, mobileHelper, between
}
