import { DynamicModule, Module } from '@nestjs/common';
import { NestCasbinCoreModule } from './nest-casbin-core.module';
import { NestCasbinModuleAsyncOptions, NestCasbinModuleOptions } from './interfaces/nest-casbin.interface';

@Module({})
export class NestCasbinModule {
  public static register(options: NestCasbinModuleOptions): DynamicModule {
    return {
      module: NestCasbinModule,
      imports: [NestCasbinCoreModule.register(options)],
    };
  }

  public static registerAsync(options: NestCasbinModuleAsyncOptions): DynamicModule {
    return {
      module: NestCasbinModule,
      imports: [NestCasbinCoreModule.registerAsync(options)],
    };
  }
}
