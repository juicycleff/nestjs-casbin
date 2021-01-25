"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestCasbinModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nest_casbin_core_module_1 = require("./nest-casbin-core.module");
let NestCasbinModule = NestCasbinModule_1 = class NestCasbinModule {
    static register(options) {
        return {
            module: NestCasbinModule_1,
            imports: [nest_casbin_core_module_1.NestCasbinCoreModule.register(options)],
        };
    }
    static registerAsync(options) {
        return {
            module: NestCasbinModule_1,
            imports: [nest_casbin_core_module_1.NestCasbinCoreModule.registerAsync(options)],
        };
    }
};
NestCasbinModule = NestCasbinModule_1 = __decorate([
    common_1.Module({})
], NestCasbinModule);
exports.NestCasbinModule = NestCasbinModule;
//# sourceMappingURL=nest-casbin.module.js.map