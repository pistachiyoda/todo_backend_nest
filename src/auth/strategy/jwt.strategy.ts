import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      // requestのどこにjwtが格納されているか
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
      ignoreExpireation: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  // payload
  // auth.serviceのgenerateJwt関数でJWTを生成するために使用されたもの
  // const payload = { sub: userId, email};
  // JWTはこのペイロードとシークレットキーをあるアルゴリズムにかけることで生成している
  // JWTトークンとシークレットキーがわかればペイロードを復元できる
  // 復元されたペイロードがvalidateメソッドに渡ってくる
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hashedPassword;
    // ログイン中のユーザーオブジェクトを返す
    return user;
  }
}
