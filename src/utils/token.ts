
import { IAccessToken, IRefreshToken } from '../interfaces/Token.interface';
import * as jwt from 'jsonwebtoken';
import { env } from '../env';
import { User } from 'src/users/entities/user.entity';

const createAccessToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '4h',
    },
  );
};

const createRefreshToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '1d',
    },
  );
};

const verifyToken = async (
  token: string,
): Promise<jwt.VerifyErrors | IAccessToken | IRefreshToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.app.jwt_secret as jwt.Secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as IAccessToken | IRefreshToken);
    });
  });
};

export { createAccessToken, createRefreshToken, verifyToken };
