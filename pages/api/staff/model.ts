import  mongoose,{Schema} from 'mongoose';
import {isEmail} from 'validator'
import argon2 from 'argon2'


import {staff as staffValue } from '../../staff/signup'

const staffSchema = new Schema<staffValue>({
  staffID: {
    type:String,
    required:[ true, 'Please enter staff ID'],
    unique: true,
  },
  firstName: {
    type:String,
    // required:[ true, 'Please enter firstname'],
  },
  lastName: {
    type:String,
    // required:[ true, 'Please enter lastName'],
  },
  middleName: {
    type:String,
    // required:[ true, 'Please enter middleName'],
  },
  age: {
    type:Number,
    // required:[ true, 'Please enter age'],
  },
  dateOfBirth: {
    type:String,
    // required:[ true, 'Please enter date of birth']
  },
  level: {
    type:String,
    // required:[ true, 'Please enter level'],
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
staffSchema.pre('save', async function (next){
    this.password = await argon2.hash(this.password);
    next()
})

//static method to login user
// userSchema.statics.login = async function(email,password){
//     const user = await this.findOne({email})
//     if(user){
//         const auth = await argon2.verify(user.password,password)
//         if(auth){
//             return user
//         }

//         throw Error('incorrect password')
//     }
//     throw Error('incorrect email')
// }


export const staff = mongoose.models.staff|| mongoose.model('staff',staffSchema);