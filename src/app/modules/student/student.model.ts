import { Schema, model } from 'mongoose';
import { Guardian, LocalGurdian, Student, UserName } from './student.interface';
import validator from 'validator';
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is Required'],
    trim: true,
    maxlength: [20, 'First name can not be more then 20 charecters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize formate!!',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is Required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid!',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Guardian father name is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Guardian father occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Guardian father contact no is Required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Guardian mothers name is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Guardian mother occupation is Require'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Guardian mother contact no is Required'],
  },
});

const localGurdianSchema = new Schema<LocalGurdian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'local gurdian name is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'local gurdian occupation is Required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'local gurdian contact No is Required'],
  },
  address: {
    type: String,
    required: [true, 'local gurdian address is Required'],
  },
});

//Create main Schema...
const studentSchema = new Schema<Student>({
  id: { type: String, trim: true, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'User Name is Required'],
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "The gender field can only be one of the following: 'male','female', or 'other'.",
    },
    required: true,
  },
  deteOfBirth: { type: String },
  email: {
    type: String,
    trim: true,
    required: [true, 'User email is Required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type!',
    },
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'User contact number is Required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is Required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'O+', 'A', 'B', 'AB', 'O', 'O-', 'AB+', 'AB-', 'B+'],
      message:
        "The blood group field can only be one of the following:'A+', 'O+', 'A', 'B', 'AB', 'O', 'O-', 'AB+', 'AB-', 'B+'.",
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is Required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permament address is Required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardin address is Required'],
  },
  localGurdian: {
    type: localGurdianSchema,
    required: [true, 'local address is Required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not valid!',
    },
    default: 'active',
  },
});

//Create  model..
export const StudentModel = model<Student>('Student', studentSchema);
