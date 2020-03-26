import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';
import { Adapter, Model } from 'casbin';

export interface NestCasbinModuleOptions {
  adapter: Type<Adapter> | any,
  model: string | Model,
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
