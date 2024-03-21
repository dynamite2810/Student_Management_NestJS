import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CoursesService {
 constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  
  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOneById(id: number): Promise<any> {
    return await this.courseRepository.find({where: {id: id}});
  }

  async findByCondition(object: Object): Promise<Course> {
    return this.courseRepository.findOne(object)
  }
  
  async findAllByCondition(object: Object): Promise<Course[]> {
    return this.courseRepository.find(object)
  }

 async update(id: number, data: any): Promise<any> {
    const payload = await this.courseRepository.findOne({
      where: {id: id}
    })
    return this.courseRepository.save({...payload, ...data});
  }

  async create(object: CourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(object);
    return this.courseRepository.save(newCourse)
  }

  async delete(id: number): Promise<any> {
    return this.courseRepository.delete(id);
  }
}
