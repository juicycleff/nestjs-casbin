import { DynamicModule } from '@nestjs/common';
import { NestCasbinModuleAsyncOptions, NestCasbinModuleOptions } from './interfaces/nest-casbin.interface';
export declare class NestCasbinModule {
    static register(options: NestCasbinModuleOptions): DynamicModule;
    static registerAsync(options: NestCasbinModuleAsyncOptions): DynamicModule;
}
