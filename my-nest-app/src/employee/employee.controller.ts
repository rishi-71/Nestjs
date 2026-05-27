import { Controller, Get } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {

  @Get()
  getEmployee() {
    return 'Employee data fetch successfully!!';
  }
}
