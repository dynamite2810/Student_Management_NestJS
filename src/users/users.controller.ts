import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Authorized, Req, Res, UseBefore } from 'routing-controllers';
import { AuthRequest } from 'src/interfaces/Responce.interface';
import { NextFunction } from 'express';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AdminAuthGuard } from 'src/auth/guard/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/guard/user-auth.guard';
import dataSource from 'db/data-source';
import { User } from './entities/user.entity';

@Controller()
  export class UsersController { 
    constructor(protected userService: UsersService) {
  }

  // @UseGuards(UserAuthGuard)
  @Get('/users')
  async getUser(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction): Promise<any> {
    try {
      const findAllUsersData = await this.userService.findAll()
      // const user = await dataSource.manager
      // .createQueryBuilder(User, "user")
      // .where("user.id = :id", { id: 1 })
      // .getOne();
    const user = await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne()
    
    console.log(user)
      return {
        message: 'Success',
        data: findAllUsersData
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed',
      }
    }
  }

  @UseGuards(UserAuthGuard)
  @Get('/user/:id')
  async getUserById(@Param('id') id: number) {
    try {
      const findUserById = await this.userService.findByCondition({
        where: {id: id}
      });
      if(!findUserById) {
        return {
          message: 'User not found',
        }
      }
      return {
        message: 'Success',
        data: findUserById
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed',
      }
    }
  }

  @UseGuards(AdminAuthGuard)  
  @Post('/create-user')
  async createUser(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction, @Body() body: UserDto) {
    try {
      const data = body;
      const hashPassword = bcrypt.hashSync(data.password, 10);
      const userExistedByEmail = await this.userService.findByCondition({
        where: {email: data.email}
      });
      const userExistedById = await this.userService.findByCondition({
        where: {userId: data.userId}
      })
      if(userExistedByEmail || userExistedById) {
        return {
          message: 'Failed',
        }
      }
      const userCreated = {
        fullName: data.fullName,
        userId: data.userId,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: hashPassword,
        roleId: data.roleId,
        gender: data.gender,
      }
      await this.userService.create(userCreated)
      return {
        message: 'Success',
        data: userCreated
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed',
      }
    }
  }

  @UseGuards(AdminAuthGuard)  
  @Delete('/user/:id')
  async deleteUserById(@Param('id') id: number) {
    try {
      const findUserById = await this.userService.findByCondition({
        where: {id: id}
      });
      if(!findUserById) {
        return {
          message: 'User not found',
        }
      }
      await this.userService.delete(id);
      return {
        message: 'Success',
        data: findUserById
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed',
      }
    }
  }

  @UseGuards(AdminAuthGuard)
  @Post('/edit-user/:id')
  async editUserById(@Param('id') id: number, @Body() body: any) {
    try {
      const findUserById = await this.userService.findByCondition({
        where: {id: id}
      });
      if(!findUserById) {
        return {
          message: 'User not found',
        }
      }
      await this.userService.update(id, body);
      return {
        message: 'Success',
        data: body
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed',
      }
    }
  }

  // @Post('/login')
  // async login(@Body() body: any) {
  //   try {
  //     if(!body.email || !body.password) {
  //       return {
  //         message: 'Missing username or password'
  //       }
  //     }
  //     const findUserByEmail = await this.userService.findByCondition({
  //       where: {email: body.email}
  //     })
  //     if(!findUserByEmail) {
  //       return {
  //         message: 'Username is incorrect'
  //       }
  //     }
  //     if(!bcrypt.compareSync(body.password, findUserByEmail.password)) {
  //       return {
  //         message: 'Password is incorrect'
  //       }
  //     }
      
  //     const accessToken = createAccessToken(findUserByEmail);
  //     const refreshToken = createRefreshToken(findUserByEmail);
  //      return {
  //         message: 'Success',
  //         data: {accessToken, refreshToken}
  //       }
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       message: 'Internal Server Error',
  //     }
  //   }
  // }
}
