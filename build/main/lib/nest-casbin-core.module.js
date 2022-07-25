"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestCasbinCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestCasbinCoreModule = exports.generateString = void 0;
const common_1 = require("@nestjs/common");
const casbin_1 = require("casbin");
const uuid_1 = require("uuid");
const nest_casbin_service_1 = require("./nest-casbin.service");
const nest_casbin_constants_1 = require("./nest-casbin.constants");
const generateString = () => (0, uuid_1.v4)();
exports.generateString = generateString;
let NestCasbinCoreModule = NestCasbinCoreModule_1 = class NestCasbinCoreModule {
    static register(options) {
        const casbinEnforcerProvider = {
            provide: nest_casbin_constants_1.CASBIN_ENFORCER,
            useFactory: async () => {
                const enforcer = await (0, casbin_1.newEnforcer)(options.model, options.adapter);
                if (options.watcher) {
                    enforcer.setWatcher(options.watcher);
                }
                await enforcer.loadPolicy();
                return enforcer;
            }
        };
        return {
            exports: [casbinEnforcerProvider, nest_casbin_service_1.NestCasbinService],
            module: NestCasbinCoreModule_1,
            providers: [casbinEnforcerProvider, nest_casbin_service_1.NestCasbinService]
        };
    }
    static registerAsync(options) {
        const casbinEnforcerProvider = {
            provide: nest_casbin_constants_1.CASBIN_ENFORCER,
            useFactory: async (casbinOptions) => {
                const enforcer = await (0, casbin_1.newEnforcer)(casbinOptions.model, casbinOptions.adapter);
                if (casbinOptions.watcher) {
                    enforcer.setWatcher(casbinOptions.watcher);
                }
                await enforcer.loadPolicy();
                return enforcer;
            },
            inject: [nest_casbin_constants_1.NEST_CASBIN_OPTION]
        };
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: NestCasbinCoreModule_1,
            imports: options.imports,
            providers: [
                ...asyncProviders,
                casbinEnforcerProvider,
                nest_casbin_service_1.NestCasbinService,
                {
                    provide: nest_casbin_constants_1.NEST_CASBIN_MODULE_ID,
                    useValue: (0, exports.generateString)()
                }
            ],
            exports: [casbinEnforcerProvider, nest_casbin_service_1.NestCasbinService]
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
                useClass
            }
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: nest_casbin_constants_1.NEST_CASBIN_OPTION,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        const inject = [
            (options.useClass || options.useExisting)
        ];
        return {
            provide: nest_casbin_constants_1.NEST_CASBIN_OPTION,
            useFactory: async (optionsFactory) => await optionsFactory.createCasbinOptions(),
            inject
        };
    }
};
NestCasbinCoreModule = NestCasbinCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [nest_casbin_service_1.NestCasbinService],
        exports: [nest_casbin_service_1.NestCasbinService]
    })
], NestCasbinCoreModule);
exports.NestCasbinCoreModule = NestCasbinCoreModule;
//# sourceMappingURL=nest-casbin-core.module.js.map