import { DynamicModule, Module, Provider, Global, Type } from '@nestjs/common';
import { newEnforcer } from 'casbin';
import { v4 as uuid } from 'uuid';
import { NestCasbinService } from './nest-casbin.service';
import {
  CASBIN_ENFORCER,
  NEST_CASBIN_MODULE_ID,
  NEST_CASBIN_OPTION
} from './nest-casbin.constants';

import {
  NestCasbinModuleAsyncOptions,
  NestCasbinModuleOptions,
  NestCasbinOptionsFactory
} from './interfaces/nest-casbin.interface';

export const generateString = () => uuid();

@Global()
@Module({
  providers: [NestCasbinService],
  exports: [NestCasbinService]
})
export class NestCasbinCoreModule {
  public static register(options: NestCasbinModuleOptions): DynamicModule {
    const casbinEnforcerProvider: Provider = {
      provide: CASBIN_ENFORCER,
      useFactory: async () => {
        const enforcer = await newEnforcer(options.model, options.adapter);
        if (options.watcher) {
          enforcer.setWatcher(options.watcher);
        }
        await enforcer.loadPolicy();
        return enforcer;
      }
    };
    return {
      exports: [casbinEnforcerProvider, NestCasbinService],
      module: NestCasbinCoreModule,
      providers: [casbinEnforcerProvider, NestCasbinService]
    };
  }

  public static registerAsync(
    options: NestCasbinModuleAsyncOptions
  ): DynamicModule {
    const casbinEnforcerProvider: Provider = {
      provide: CASBIN_ENFORCER,
      useFactory: async (casbinOptions: NestCasbinModuleOptions) => {
        const enforcer = await newEnforcer(
          casbinOptions.model,
          casbinOptions.adapter
        );
        if (casbinOptions.watcher) {
          enforcer.setWatcher(casbinOptions.watcher);
        }
        await enforcer.loadPolicy();
        return enforcer;
      },
      inject: [NEST_CASBIN_OPTION]
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: NestCasbinCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        casbinEnforcerProvider,
        NestCasbinService,
        {
          provide: NEST_CASBIN_MODULE_ID,
          useValue: generateString()
        }
      ],
      exports: [casbinEnforcerProvider, NestCasbinService]
    };
  }

  private static createAsyncProviders(
    options: NestCasbinModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<NestCasbinOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: NestCasbinModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_CASBIN_OPTION,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<
        NestCasbinOptionsFactory
      >
    ];
    return {
      provide: NEST_CASBIN_OPTION,
      useFactory: async (optionsFactory: NestCasbinOptionsFactory) =>
        await optionsFactory.createCasbinOptions(),
      inject
    };
  }
}
