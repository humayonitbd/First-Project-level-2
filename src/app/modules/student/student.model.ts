import { Schema, model } from 'mongoose';
import { Guardian, LocalGurdian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

//Create main Schema...
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  deteOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'O+', 'A', 'B', 'AB', 'O', 'O-', 'AB+', 'AB-', 'B+'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGurdian: localGurdianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

//Create  model..
export const StudentModel = model<Student>('Student', studentSchema);
