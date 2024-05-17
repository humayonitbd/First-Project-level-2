import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .required()
    .messages({
      'string.base': 'First name should be a type of text',
      'string.empty': 'First name is required',
      'string.max': 'First name can not be more than 20 characters',
      'string.pattern.name': '{#value} is not capitalize format!!',
    }),
  middleName: Joi.string().allow(''),
  lastName: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/, 'alpha')
    .required()
    .messages({
      'string.base': 'Last name should be a type of text',
      'string.empty': 'Last name is required',
      'string.pattern.name': '{#value} is not valid!',
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Guardian father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Guardian father occupation is required',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Guardian father contact no is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'Guardian mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Guardian mother occupation is required',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Guardian mother contact no is required',
  }),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian contact no is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local guardian address is required',
  }),
});

const studentSchemaJoi = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'ID is required',
  }),
  name: userNameSchema.required().messages({
    'object.base': 'User name is required',
  }),
  gender: Joi.string()
    .trim()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only':
        "The gender field can only be one of the following: 'male', 'female', or 'other'.",
      'string.empty': 'Gender is required',
    }),
  dateOfBirth: Joi.string().allow(''),
  email: Joi.string().trim().email().required().messages({
    'string.email': '{#value} is not a valid email type!',
    'string.empty': 'User email is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'User contact number is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'O+', 'A', 'B', 'AB', 'O', 'O-', 'AB+', 'AB-', 'B+')
    .messages({
      'any.only':
        "The blood group field can only be one of the following: 'A+', 'O+', 'A', 'B', 'AB', 'O', 'O-', 'AB+', 'AB-', 'B+'.",
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianSchema.required().messages({
    'object.base': 'Guardian address is required',
  }),
  localGurdian: localGuardianSchema.required().messages({
    'object.base': 'Local guardian address is required',
  }),
  profileImg: Joi.string().allow(''),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not valid!',
  }),
});

export default studentSchemaJoi;
