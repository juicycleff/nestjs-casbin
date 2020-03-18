import { DynamicModule, Module, Provider, Global } from '@nestjs/common';
import { NestCasbinCoreModule } from './nest-casbin-core.module';
import { NestCasbinModuleAsyncOptions } from './interfaces/nest-casbin.interface';

@Module({})
export class NestCasbinModule {
  public static forRootAsync(options: NestCasbinModuleAsyncOptions): DynamicModule {
    return {
      module: NestCasbinModule,
      imports: [NestCasbinCoreModule.forRootAsync(options)],
    };
  }
}
