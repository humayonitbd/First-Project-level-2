import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentService = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentService = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentService = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentService,
  getAllStudentService,
  getSingleStudentService,
};
