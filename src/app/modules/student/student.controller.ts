import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validationSchema';
// import studentSchemaJoi from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // create a schema validation using zod..

    const { student: studentData } = req.body;
    const zodparseData = studentValidationSchema.parse(studentData);

    //joi validation here
    // const { error, value } = studentSchemaJoi.validate(studentData);
    // console.log({error},{value})
    const result = await StudentServices.createStudentService(zodparseData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (error: unknown) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Something went wrong!';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentService(studentId);

    res.status(200).json({
      success: true,
      message: 'Student are deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};
const updateSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const bodyData = req.body;
    const result = await StudentServices.updateSingleStudentService(studentId, bodyData);

    res.status(200).json({
      success: true,
      message: 'Student are updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
