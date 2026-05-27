import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(data: Partial<Student>): Promise<Student> {
    const newStudent = new this.studentModel(data);
    return newStudent.save();
  }

  async getStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async getStudent(id: string): Promise<Student | null> {
    return this.studentModel.findById(id).exec();
  }

  async patchStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async updateStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    const update = await this.studentModel.findByIdAndUpdate(
      id,
      {
        name: (await data).name ?? null,
        age: (await data).age ?? null,
        email: (await data).email ?? null,
      },
      { overwrite: true, new: true },
    );
    return update;
  }
}

// The Student Service (The Chef)
// This file contains the actual business logic and talks directly to the database.

// @Injectable()

// What it does: Tells NestJS, "I am a Service. Please manage me in your Dependency Injection (DI) system."

// constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

// What it does: This is the most critical line. Remember the MongooseModule.forFeature() from the previous step? Here, you are asking NestJS to hand over that registered model.

// Behind the scenes: @InjectModel(Student.name) tells the DI container to find the specific MongoDB model labeled "Student". It then assigns it to this.studentModel so you can use it throughout this class. The Model<StudentDocument> part gives you the TypeScript autocomplete for Mongoose functions (like .find(), .save()).

// async createStudent(data: Partial<Student>): Promise<Student>

// What it does: An asynchronous function that takes the incoming data and promises to return a saved Student. (Note: Partial<Student> means the data doesn't strictly have to contain every single field right now, though it's better to use a DTO here!).

// const newStudent = new this.studentModel(data);

// Behind the scenes: This creates a brand new document in your server's local memory. It does not save it to the database yet. It simply formats the raw JSON data into a proper Mongoose object (adding the _id and getting it ready).

// return newStudent.save();

// Behind the scenes: This is the actual database call. It takes the object from memory, validates it against your Schema (checking if name and age exist), and officially writes it to your MongoDB cluster.
