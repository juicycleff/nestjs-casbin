import { DynamicModule } from '@nestjs/common';
import { NestCasbinModuleAsyncOptions, NestCasbinModuleOptions } from './interfaces/nest-casbin.interface';
export declare const generateString: () => any;
export declare class NestCasbinCoreModule {
    static register(options: NestCasbinModuleOptions): DynamicModule;
    static registerAsync(options: NestCasbinModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
