import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema, Student } from './student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
})
export class StudentModule {}

// Line-by-Line Breakdown
// 1. @Module({ ... })

// What it does: This is the standard NestJS decorator that defines a Feature Module (a box that holds everything related to Students: controllers, services, etc.).

// 2. imports: [ ... ]

// What it does: It brings external capabilities into our StudentModule box. We are saying, "To make the Student feature work, we need some tools from the outside."

// 3. MongooseModule

// What it does: This is the official NestJS package that bridges our app with MongoDB.

// 4. .forFeature(...)

// What it does: This is the magic word! Earlier in your AppModule, you likely used MongooseModule.forRoot() to establish the main connection to the database. .forFeature() is different—it doesn't connect to the database; instead, it registers a specific table/collection for this specific module.

// 5. [{ name: Student.name, schema: StudentSchema }]

// What it does: We pass an array containing our model definitions.

// name: Student.name: In JavaScript, calling .name on a class just returns its name as a string (so this is literally just "Student"). This acts as the unique ID/Token for this model.

// schema: StudentSchema: This is the compiled Mongoose schema we created in the last step using SchemaFactory.

// Behind the Scenes (Kyu kara yeh step?)
// To understand why we must do this, you have to remember NestJS's superpower: Dependency Injection (DI).

// Imagine you are about to write your StudentService, and you want to save a new student. To do that, you need the actual Mongoose Model. But you can't just type new Model() yourself. You have to ask NestJS's DI Container (the Manager) to give it to you.

// If you don't write this forFeature code, NestJS will say: "I have no idea what a 'Student' model is, you never registered it with me!"

// What happens when this code runs:

// NestJS reads this forFeature array.

// It takes your StudentSchema and asks Mongoose to compile it into a fully functional MongoDB Model.

// NestJS stores this compiled Model in its internal memory under the label "Student" (which is what Student.name provided).

// Now, the model is officially "alive" inside the StudentModule.
