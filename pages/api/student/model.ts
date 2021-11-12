import  mongoose,{Schema} from 'mongoose';
import {isEmail} from 'validator'
import argon2 from 'argon2'


import {student as studentValues} from '../../student/signup'

const studentSchema = new Schema<studentValues>({
  admissionNo: {
    type:String,
    required:[ true, 'Please enter admission number'],
    unique: true,
  },
  firstName: {
    type:String,
    required:[ true, 'Please enter firstname'],
  },
  lastName: {
    type:String,
    required:[ true, 'Please enter lastName'],
  },
  middleName: {
    type:String,
    // required:[ true, 'Please enter middleName'],
  },
  fullName: {
    type:String,
    required:[ true, 'Please enter middleName'],
  },
  age: {
    type:Number,
    required:[ true, 'Please enter age'],
  },
  dateOfBirth: {
    type:String,
    // required:[ true, 'Please enter date of birth']
  },
  class: {
    type:String,
    required:[ true, 'Please enter class'],
  },
  house: {
    type:String,
    // required:[ true, 'Please enter house'],
  },
state: {
  type:String,
  // required:[ true, 'Please enter state'],
  },  
LGA: {
  type:String,
  // required:[ true, 'Please enter LGA'],
  },  
  email: {
    type: String,
    required:[ true, 'Please enter an email address'],
    unique: true,
    validate:[isEmail, 'please enter a valid email']
  },
  password: {
    type:String,
    required: [ true, 'Please enter a valid password'],
  },
});


//fire a function before doc saved to db
studentSchema.pre('save', async function (next){
    this.password = await argon2.hash(this.password);
    next()
})



export const student = mongoose.models.students || mongoose.model('students', studentSchema);