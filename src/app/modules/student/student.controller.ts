import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentSchemaJoi from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const { error } = studentSchemaJoi.validate(studentData);
    // console.log(error,value)
    const result = await StudentServices.createStudentService(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentService();

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentService(studentId);

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
