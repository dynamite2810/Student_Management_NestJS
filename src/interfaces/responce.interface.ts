
import { Request } from "express";
import { User } from "src/users/entities/user.entity";

export interface ApiResponse {
  status: boolean
  code: number
  data: any
  message: string,
}

export interface AuthRequest extends Request {
  user: User;
}