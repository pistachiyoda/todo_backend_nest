import { User } from '@prisma/client';

// 標準のExpressのリクエストの型に対してUSERというフィールドを追加し、
// このデータ型をカスタムのユーザ型に置き換えている。
declare module 'express-serve-static-core' {
  interface Request {
    user?: Omit<User, 'hashedPassword'>;
  }
}
