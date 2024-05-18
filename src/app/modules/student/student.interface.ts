// import { Schema, model, connect } from 'mongoose';

import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  deteOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?:
    | 'A+'
    | 'O+'
    | 'A'
    | 'B'
    | 'AB'
    | 'O'
    | 'O-'
    | 'AB+'
    | 'AB-'
    | 'B+';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGurdian: TLocalGurdian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};

// for crating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for createing instance method

// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
