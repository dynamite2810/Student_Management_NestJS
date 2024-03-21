import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { createAccessToken, createRefreshToken } from 'src/utils/token';
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, protected usersService: UsersService) {}
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  // // @HttpCode(HttpStatus.OK)
  // @Post('/login')
  // // signIn(@Body() body: any) {
  // //   return this.authService.signIn(body.email, body.password);
  // // }
  // async login(@Body() body: any) {
  //   try {
  //     if(!body.email || !body.password) {
  //       // return this.setData('').setMessage('Missing username or password')
  //       // .responseErrors(res);
  //       return {
  //         message: 'Missing username or password'
  //       }
  //     }
  //     const findUserByEmail = await this.usersService.findByCondition({
  //       where: {email: body.email}
  //     })
  //     if(!findUserByEmail) {
  //       return {
  //         message: 'Username is incorrect'
  //       }
  //     }
  //     if(!bcrypt.compareSync(body.password, findUserByEmail.password)) {
  //       // return this.setData('').setMessage('Password is incorrect')
  //       // .responseErrors(res);
  //       return {
  //         message: 'Username is incorrect'
  //       }
  //     }
      
  //     const accessToken = createAccessToken(findUserByEmail);
  //     const refreshToken = createRefreshToken(findUserByEmail);
  //   //   setCacheExpire(`auth_refresh_email_${body.email}`, refreshToken, REFRESH_TTL);
      
  //     // return this.setData({accessToken, refreshToken}).setCode(200).setMessage('Success').responseSuccess(res);
  //      return {
  //         message: 'Success',
  //         data: {accessToken, refreshToken}
  //       }
  //   } catch (error) {
  //     console.log(error);
  //     // return this.setCode(error.code || 500)
  //     //   .setMessage(error.message || 'Internal Server Error')
  //     //   // .setMessage(error.message || 'clgt')

  //     //   .responseErrors(res);
  //     return {
  //       message: 'Internal Server Error',
  //     }
  //   }
  // }
}
