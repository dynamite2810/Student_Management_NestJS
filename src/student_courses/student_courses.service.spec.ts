import { Test, TestingModule } from '@nestjs/testing';
import { Student_CoursesService } from './student_courses.service';

describe('Student_CoursesService', () => {
  let service: Student_CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Student_CoursesService],
    }).compile();

    service = module.get<Student_CoursesService>(Student_CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
