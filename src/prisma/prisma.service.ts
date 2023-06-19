import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Injectable()
// PrismaサービスでPrismaClientの機能を使用するため、PrismaClientを継承した
// PrismaServiceクラスを作成する
export class PrismaService extends PrismaClient {
  // Prismaサービスの中でConfigServiceを使用する
  constructor(private readonly config: ConfigService) {
    // 継承したクラスはsupuer()を使用して親クラスのコンストラクタを呼び出す必要がある
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
