var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestCasbinCoreModule_1;
import { Module, Global } from '@nestjs/common';
import { newEnforcer } from 'casbin';
import { v4 as uuid } from 'uuid';
import { NestCasbinService } from './nest-casbin.service';
import { CASBIN_ENFORCER, NEST_CASBIN_MODULE_ID, NEST_CASBIN_OPTION } from './nest-casbin.constants';
export const generateString = () => uuid();
let NestCasbinCoreModule = NestCasbinCoreModule_1 = class NestCasbinCoreModule {
    static register(options) {
        const casbinEnforcerProvider = {
            provide: CASBIN_ENFORCER,
            useFactory: async () => {
                const enforcer = await newEnforcer(options.model, options.adapter);
                await enforcer.loadPolicy();
                return enforcer;
            },
        };
        return {
            exports: [casbinEnforcerProvider, NestCasbinService],
            module: NestCasbinCoreModule_1,
            providers: [casbinEnforcerProvider, NestCasbinService],
        };
    }
    static registerAsync(options) {
        const casbinEnforcerProvider = {
            provide: CASBIN_ENFORCER,
            useFactory: async (casbinOptions) => {
                const enforcer = await newEnforcer(casbinOptions.model, casbinOptions.adapter);
                await enforcer.loadPolicy();
                return enforcer;
            },
            inject: [NEST_CASBIN_OPTION],
        };
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: NestCasbinCoreModule_1,
            imports: options.imports,
            providers: [
                ...asyncProviders,
                casbinEnforcerProvider,
                NestCasbinService,
                {
                    provide: NEST_CASBIN_MODULE_ID,
                    useValue: generateString(),
                },
            ],
            exports: [casbinEnforcerProvider, NestCasbinService],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: NEST_CASBIN_OPTION,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: NEST_CASBIN_OPTION,
            useFactory: async (optionsFactory) => await optionsFactory.createCasbinOptions(),
            inject,
        };
    }
};
NestCasbinCoreModule = NestCasbinCoreModule_1 = __decorate([
    Global(),
    Module({
        providers: [NestCasbinService],
        exports: [NestCasbinService],
    })
], NestCasbinCoreModule);
export { NestCasbinCoreModule };
//# sourceMappingURL=nest-casbin-core.module.js.map