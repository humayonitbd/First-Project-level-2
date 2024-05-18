import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGurdian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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

const localGurdianSchema = new Schema<TLocalGurdian>({
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
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, trim: true, required: true, unique: true },
    password: {
      type: String,
      trim: true,
      required: true,
      maxlength: [15, 'Password more then 15 charecter...'],
    },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//mongoose virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`;
});

//pre save middleware hook : will work on create function
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save an data!');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solt_rounds),
  );
  next();
});

//post save middleware hook
studentSchema.post('save', function (doc, next) {
  doc.password = ' ';
  // console.log(this, 'post hook : we saved our data!');
  next();
});

// Query middleware implement..

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// creating a custom static method..

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// create custom method call here...
// studentSchema.methods.isUserExits = async function(id:string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

//Create  model..
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
