import { SetMetadata } from '@nestjs/common';
import RoleId from 'src/enum/user.enum';
// import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'RoleId';
export const Roles = (...RoleId: RoleId[]) => SetMetadata(ROLES_KEY, RoleId);