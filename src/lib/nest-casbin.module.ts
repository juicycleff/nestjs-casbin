import { DynamicModule, Module, Provider, Global } from '@nestjs/common';
import { NestCasbinCoreModule } from './nest-casbin-core.module';
import { NestCasbinModuleAsyncOptions, NestCasbinModuleOptions } from './interfaces/nest-casbin.interface';

@Module({})
export class NestCasbinModule {
  public static forRoot(options: NestCasbinModuleOptions): DynamicModule {
    return {
      module: NestCasbinModule,
      imports: [NestCasbinCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: NestCasbinModuleAsyncOptions): DynamicModule {
    return {
      module: NestCasbinModule,
      imports: [NestCasbinCoreModule.forRootAsync(options)],
    };
  }
}
