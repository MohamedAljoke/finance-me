import jwt from 'jsonwebtoken';

export class JwtUtils {
  static generateToken(
    payload: any,
    secret: string,
    expiresIn: string
  ): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static verifyToken(token: string, secret: string): any {
    try {
      const decoded = jwt.verify(token, secret);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (error) {
      return {
        valid: false,
        expired: error.message === 'jwt expired',
        decoded: null,
      };
    }
  }
}
