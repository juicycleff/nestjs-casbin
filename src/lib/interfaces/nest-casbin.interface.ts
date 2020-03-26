import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';
import { Adapter } from 'casbin';

export interface NestCasbinModuleOptions {
  adapter: Adapter | any,
  casbinModelPath: string,
}

export interface NestCasbinOptionsFactory {
  createCasbinOptions(): Promise<NestCasbinModuleOptions> | NestCasbinModuleOptions;
}

export interface NestCasbinModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<NestCasbinOptionsFactory>;
  useClass?: Type<NestCasbinOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestCasbinModuleOptions> | NestCasbinModuleOptions;
  inject?: any[];
}
