import { Body, Controller,Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService : StudentService){}

    @Post()
    async addStudent(@Body() data: Partial<Student>){
        return this.studentService.createStudent(data);
    }
}

// This file's only job is to receive HTTP requests from a client (like Postman or a React frontend) and pass the data to the Service.

// @Controller('student')

// What it does: Tells NestJS that any incoming HTTP request where the URL starts with /student (e.g., http://localhost:3000/student) should be sent to this class.

// constructor(private readonly studentService: StudentService) {}

// What it does: Dependency Injection in action! You are asking NestJS to provide an instance of the StudentService so the Controller can use it.

// @Post()

// What it does: A method decorator. It specifies that the addStudent function should only run if the client makes an HTTP POST request.

// async addStudent(@Body() data: Partial<Student>)

// Behind the scenes: When the client sends JSON data (e.g., {"name": "Rahul", "age": 21}), the @Body() decorator catches that raw JSON payload and assigns it to the data variable.

// return this.studentService.createStudent(data);

// What it does: The Controller acts as a middleman. It takes the data it just caught and passes it to the createStudent function inside the Service. Whatever the Service returns (the successfully saved student with an ID and timestamp), the Controller automatically sends back to the client as an HTTP response.
