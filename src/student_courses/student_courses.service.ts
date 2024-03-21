import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student_Course } from "./entities/student_course.entity";
import { Student_CourseDto } from "./dto/student_courses.dto";

@Injectable()
export class Student_CoursesService{
  constructor(
    @InjectRepository(Student_Course)
    private readonly student_courseRepository: Repository<Student_Course>,
  ) {}
  // Add CRUD operations you intend to use here
  async findAll(): Promise<Student_Course[]> {
    return await this.student_courseRepository.find();
  }

  async findOneById(id: number): Promise<any> {
    return await this.student_courseRepository.find({where: {id: id}});
  }

  async findByCondition(object: Object): Promise<Student_Course> {
    return this.student_courseRepository.findOne(object)
  }
  
  async findAllByCondition(object: Object): Promise<Student_Course[]> {
    return this.student_courseRepository.find(object)
  }

  async update(id: number, data: any): Promise<any> {
    const payload = await this.student_courseRepository.findOne({
      where: {id: id}
    })
    return this.student_courseRepository.save({...payload, ...data});
  }

  async create(object: Student_CourseDto): Promise<Student_Course> {
    const data = await this.student_courseRepository.create(object);
    return this.student_courseRepository.save(data)
  }

  async delete(id: number): Promise<any> {
    return this.student_courseRepository.delete(id);
  }

  async count(object: Object): Promise<any> {
    return this.student_courseRepository.count(object)
  }
}