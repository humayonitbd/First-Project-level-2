import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentService = async (studentData: TStudent) => {
  // static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User is exists!');
  }

  const result = await Student.create(studentData); // build in static method

  // const student = new Student(studentData); // create an instance

  // if(await student.isUserExits(studentData.id)){
  //   throw new Error('User already exists!!');
  // }

  // const result = student.save(); //build in instance method
  return result;
};

const getAllStudentService = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentService = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentService,
  getAllStudentService,
  getSingleStudentService,
};
