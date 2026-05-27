/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
//import { NotFoundError } from 'rxjs';

@Injectable()
export class StudentService {
    private students = [
        { id : 1, name : "Rishi", age: 99},
        { id : 2 , name : "Ankit", age: 100},
        { id : 3 , name : "Chintu", age:101},
        { id : 4 , name : "Divyansh", age:102},
    ]

    getAllStudents(){
        return this.students;
    }

    getStudentsById(id: number){
        const student = this.students.find((s) => s.id === id);
        if(!student){
            throw new NotFoundException('Student not found!!')
        }
        return student;
        
    }

    //Post 
    createStudent(data:{name:string; age:number}){
        const newStudent = {
            id : Date.now(),
            ...data
        }
        this.students.push(newStudent);
        return newStudent;
    }

    //put
    updateStudent(id:number,data:{name: string; age:number}){
        const index = this.students.findIndex((s)=> s.id === id);
        if(!index){
            throw new NotFoundException('invalid index');
        }
        this.students[index] = {id, ...data};
        return this.students[index];  
    }

    //patch
    patchStudent(id:number,data:Partial<{name:string; age:number}>){
        const student = this.getStudentsById(id);
        Object.assign(student,data);
        return student;
    }

    //delete
    deleteStudent(id:number){
        const index = this.students.findIndex((s)=> s.id === id);
        if(index === -1) throw new NotFoundException("student not found!!!");

        const deleted = this.students.splice(index,1);
        return {message:'Student Deleted', student: deleted[0]}
    }
}
