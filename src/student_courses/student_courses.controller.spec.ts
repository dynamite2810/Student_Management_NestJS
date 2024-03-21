import { Test, TestingModule } from '@nestjs/testing';
import { Student_CoursesController } from './student_courses.controller';
import { Student_CoursesService } from './student_courses.service';
// import { StudentCoursesController } from './student_courses.controller';
// import { StudentCoursesService } from './student_courses.service';

describe('StudentCoursesController', () => {
  let controller: Student_CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Student_CoursesController],
      providers: [Student_CoursesService],
    }).compile();

    controller = module.get<Student_CoursesController>(Student_CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
