import { z } from 'zod';

// Define the UserName schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is Required' })
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine(
      (value) => {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      { message: '{VALUE} is not in capitalize format!!' },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is Required' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{VALUE} is not valid!',
    }),
});

// Define the Guardian schema
const guardianSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(1, { message: 'Guardian father name is Required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Guardian father occupation is Required' }),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Guardian father contact no is Required' }),
  motherName: z
    .string()
    .trim()
    .min(1, { message: 'Guardian mother name is Required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Guardian mother occupation is Required' }),
  motherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Guardian mother contact no is Required' }),
});

// Define the LocalGuardian schema
const localGuardianSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Local guardian name is Required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation is Required' }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: 'Local guardian contact no is Required' }),
  address: z.string().min(1, { message: 'Local guardian address is Required' }),
});

// Define the Student schema
const studentValidationSchema = z.object({
  id: z.string().trim().min(1, { message: 'ID is required' }),
  password: z.string().max(15),
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message:
        "The gender field can only be one of the following: 'male', 'female', or 'other'.",
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(1, { message: 'User email is Required' }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: 'User contact number is Required' }),
  emergencyContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Emergency contact number is Required' }),
  bloodGroup: z.enum(
    ['A+', 'O+', 'A', 'B', 'AB', 'O', 'O-', 'AB+', 'AB-', 'B+'],
    {
      errorMap: () => ({
        message:
          "The blood group field can only be one of the following: 'A+', 'O+', 'A', 'B', 'AB', 'O', 'O-', 'AB+', 'AB-', 'B+'.",
      }),
    },
  ),
  presentAddress: z.string().min(1, { message: 'Present address is Required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is Required' }),
  guardian: guardianSchema,
  localGurdian: localGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({
        message: '{VALUE} is not valid!',
      }),
    })
    .default('active'),
});

export default studentValidationSchema;
