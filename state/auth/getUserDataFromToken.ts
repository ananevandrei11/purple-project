import jwt, { JwtPayload } from 'jsonwebtoken';

interface IAccessTokenPayload extends JwtPayload {
  id: string;
}

export function getUserPayloadToken(token: string): IAccessTokenPayload {
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '');
  if (typeof decodedToken === 'string') {
    throw new Error('Invalid token payload');
  }
  return decodedToken as IAccessTokenPayload;
}
