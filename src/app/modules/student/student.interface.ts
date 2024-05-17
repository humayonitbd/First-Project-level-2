// import { Schema, model, connect } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
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
  guardian: Guardian;
  localGurdian: LocalGurdian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
