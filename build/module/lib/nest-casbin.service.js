var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { Enforcer } from 'casbin';
import { CASBIN_ENFORCER } from './nest-casbin.constants';
let NestCasbinService = class NestCasbinService {
    constructor(enforcer) {
        this.enforcer = enforcer;
    }
    async reloadPolicy() {
        await this.enforcer.loadPolicy();
    }
    async addPolicy(...params) {
        return this.enforcer.addPolicy(...params);
    }
    async removePolicy(...params) {
        return this.enforcer.removePolicy(...params);
    }
    async getPolicy() {
        return this.enforcer.getPolicy();
    }
    async enforce(...params) {
        return this.enforcer.enforce(params);
    }
    async getAllRoles() {
        return this.enforcer.getAllRoles();
    }
    async getAllObjects() {
        return this.enforcer.getAllObjects();
    }
    async getAllSubjects() {
        return this.enforcer.getAllSubjects();
    }
    async getUsersForRole(name, domain) {
        return this.enforcer.getUsersForRole(name, domain);
    }
    async hasRoleForUser(user, role, domain) {
        return this.enforcer.hasRoleForUser(user, role, domain);
    }
    async addRoleForUser(user, role, domain) {
        return this.enforcer.addRoleForUser(user, role, domain);
    }
    async deleteRoleForUser(user, role, domain) {
        return this.enforcer.deleteRoleForUser(user, role, domain);
    }
    async deleteRolesForUser(user, domain) {
        return this.enforcer.deleteRolesForUser(user, domain);
    }
    async deleteUser(user) {
        return this.enforcer.deleteUser(user);
    }
    async deleteRole(role) {
        return this.enforcer.deleteRole(role);
    }
    async deletePermission(...permissions) {
        return this.enforcer.deletePermission(...permissions);
    }
    async addPermissionForUser(user, ...permissions) {
        return this.enforcer.addPermissionForUser(user, ...permissions);
    }
    async deletePermissionForUser(user, ...permissions) {
        return this.enforcer.deletePermissionForUser(user, ...permissions);
    }
    async deletePermissionsForUser(user) {
        return this.enforcer.deletePermissionsForUser(user);
    }
    async getPermissionsForUser(user) {
        return this.enforcer.getPermissionsForUser(user);
    }
    async hasPermissionForUser(user, ...permissions) {
        return await this.enforcer.hasPermissionForUser(user, ...permissions);
    }
    async getAllActions() {
        return this.enforcer.getAllActions();
    }
    async hasPolicy(...params) {
        return await this.enforcer.hasPolicy(...params);
    }
    async hasNamedPolicy(p, ...params) {
        return await this.enforcer.hasNamedPolicy(p, ...params);
    }
    async getRolesForUser(name, domain) {
        return await this.enforcer.getRolesForUser(name, domain);
    }
    async getImplicitPermissionsForUser(name, ...domain) {
        return await this.enforcer.getImplicitPermissionsForUser(name, ...domain);
    }
    async getImplicitRolesForUser(name, ...domain) {
        return await this.enforcer.getImplicitRolesForUser(name, ...domain);
    }
    async getNamedPolicy(name) {
        return await this.enforcer.getNamedPolicy(name);
    }
    async addFunction(name, fn) {
        return await this.enforcer.addFunction(name, fn);
    }
    async loadFilteredPolicy(filter) {
        return await this.enforcer.loadFilteredPolicy(filter);
    }
    enableAutoBuildRoleLinks(autoBuildRoleLinks) {
        return this.enforcer.enableAutoBuildRoleLinks(autoBuildRoleLinks);
    }
    isFiltered() {
        return this.enforcer.isFiltered();
    }
    enableAutoSave(autoSave) {
        return this.enforcer.enableAutoSave(autoSave);
    }
    setWatcher(watcher) {
        return this.enforcer.setWatcher(watcher);
    }
    enableLog(enable) {
        return this.enforcer.enableLog(enable);
    }
    enableEnforce(enable) {
        return this.enforcer.enableEnforce(enable);
    }
    setEffector(eft) {
        return this.enforcer.setEffector(eft);
    }
    clearPolicy() {
        return this.enforcer.clearPolicy();
    }
    addGroupingPolicy() {
        return this.enforcer.addGroupingPolicy();
    }
    async checkPermission(...params) {
        return this.enforcer.enforce(...params);
    }
};
NestCasbinService = __decorate([
    Injectable(),
    __param(0, Inject(CASBIN_ENFORCER)),
    __metadata("design:paramtypes", [Enforcer])
], NestCasbinService);
export { NestCasbinService };
//# sourceMappingURL=nest-casbin.service.js.map