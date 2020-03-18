import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';
import { MongoClientOptions } from 'mongodb';

export interface NestCasbinModuleOptions {
  uri: string,
  casbinModelPath: string,
  databaseName: string,
  collectionName: string,
  clientOptions?: MongoClientOptions,
}

export interface NestCasbinOptionsFactory {
  createCasbinOptions(
    connectionName?: string,
  ): Promise<NestCasbinModuleOptions> | NestCasbinModuleOptions;
}

export interface NestCasbinModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<NestCasbinOptionsFactory>;
  useClass?: Type<NestCasbinOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestCasbinModuleOptions> | NestCasbinModuleOptions;
  inject?: any[];
}
