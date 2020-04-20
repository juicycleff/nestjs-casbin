import { Inject, Injectable } from '@nestjs/common';
import { Enforcer } from 'casbin';
import { CASBIN_ENFORCER } from './nest-casbin.constants';
import { Filter, Watcher } from 'casbin/lib/persist';
import { Effector } from 'casbin/lib/effect';

@Injectable()
export class NestCasbinService {
  constructor(@Inject(CASBIN_ENFORCER) public readonly enforcer: Enforcer) {}

  public async reloadPolicy() {
    await this.enforcer.loadPolicy();
  }

  public async addPolicy(...params: string[]) {
    const added = await this.enforcer.addPolicy(...params);
    if (added) {
      await this.enforcer.savePolicy();
    }
  }

  public async removePolicy(...params: string[]) {
    const removed = await this.enforcer.removePolicy(...params);
    if (removed) {
      await this.enforcer.savePolicy();
    }
  }

  public async getPolicy(): Promise<string[][]> {
    return this.enforcer.getPolicy();
  }

  public async enforce(...params: string[]): Promise<boolean> {
    return this.enforcer.enforce(...params);
  }

  public async getAllRoles(): Promise<string[]> {
    return this.enforcer.getAllRoles();
  }

  public async getAllObjects(): Promise<string[]> {
    return this.enforcer.getAllObjects();
  }

  public async getAllSubjects(): Promise<string[]> {
    return this.enforcer.getAllSubjects();
  }

  public async getUsersForRole(
    name: string,
    domain?: string
  ): Promise<string[]> {
    return this.enforcer.getUsersForRole(name, domain);
  }

  public async hasRoleForUser(
    user: string,
    role: string,
    domain?: string
  ): Promise<boolean> {
    return this.enforcer.hasRoleForUser(user, role, domain);
  }

  public async addRoleForUser(
    user: string,
    role: string,
    domain?: string
  ): Promise<boolean> {
    return this.enforcer.addRoleForUser(user, role, domain);
  }

  public async deleteRoleForUser(
    user: string,
    role: string,
    domain?: string
  ): Promise<boolean> {
    return this.enforcer.deleteRoleForUser(user, role, domain);
  }

  public async deleteRolesForUser(
    user: string,
    domain?: string
  ): Promise<boolean> {
    return this.enforcer.deleteRolesForUser(user, domain);
  }

  public async deleteUser(user: string): Promise<boolean> {
    return this.enforcer.deleteUser(user);
  }

  public async deleteRole(role: string): Promise<boolean> {
    return this.enforcer.deleteRole(role);
  }

  public async deletePermission(...permissions: string[]): Promise<boolean> {
    return this.enforcer.deletePermission(...permissions);
  }

  public async addPermissionForUser(
    user: string,
    ...permissions: string[]
  ): Promise<boolean> {
    return this.enforcer.addPermissionForUser(user, ...permissions);
  }

  public async deletePermissionForUser(
    user: string,
    ...permissions: string[]
  ): Promise<boolean> {
    return this.enforcer.deletePermissionForUser(user, ...permissions);
  }

  public async deletePermissionsForUser(user: string): Promise<boolean> {
    return this.enforcer.deletePermissionsForUser(user);
  }

  public async getPermissionsForUser(user: string): Promise<string[][]> {
    return this.enforcer.getPermissionsForUser(user);
  }

  public async hasPermissionForUser(
    user: string,
    ...permissions: string[]
  ): Promise<boolean> {
    return await this.enforcer.hasPermissionForUser(user, ...permissions);
  }

  public async getAllActions(): Promise<string[]> {
    return this.enforcer.getAllActions();
  }

  public async hasPolicy(...params: string[]): Promise<boolean> {
    return await this.enforcer.hasPolicy(...params);
  }

  public async hasNamedPolicy(
    p: string,
    ...params: string[]
  ): Promise<boolean> {
    return await this.enforcer.hasNamedPolicy(p, ...params);
  }

  public async getRolesForUser(
    name: string,
    domain?: string
  ): Promise<string[]> {
    return await this.enforcer.getRolesForUser(name, domain);
  }

  public async getImplicitPermissionsForUser(
    name: string,
    ...domain: string[]
  ): Promise<string[][]> {
    return await this.enforcer.getImplicitPermissionsForUser(name, ...domain);
  }

  public async getImplicitRolesForUser(
    name: string,
    ...domain: string[]
  ): Promise<string[]> {
    return await this.enforcer.getImplicitRolesForUser(name, ...domain);
  }

  public async getNamedPolicy(name: string): Promise<string[][]> {
    return await this.enforcer.getNamedPolicy(name);
  }

  public async addFunction(name: string, fn: any): Promise<void> {
    return await this.enforcer.addFunction(name, fn);
  }

  public async loadFilteredPolicy(filter: Filter): Promise<boolean> {
    return await this.enforcer.loadFilteredPolicy(filter);
  }

  enableAutoBuildRoleLinks(autoBuildRoleLinks: boolean): void {
    return this.enforcer.enableAutoBuildRoleLinks(autoBuildRoleLinks);
  }

  isFiltered(): boolean {
    return this.enforcer.isFiltered();
  }

  enableAutoSave(autoSave: boolean): void {
    return this.enforcer.enableAutoSave(autoSave);
  }

  setWatcher(watcher: Watcher): void {
    return this.enforcer.setWatcher(watcher);
  }

  enableLog(enable: boolean): void {
    return this.enforcer.enableLog(enable);
  }

  enableEnforce(enable: boolean): void {
    return this.enforcer.enableEnforce(enable);
  }

  setEffector(eft: Effector): void {
    return this.enforcer.setEffector(eft);
  }

  clearPolicy(): void {
    return this.enforcer.clearPolicy();
  }

  addGroupingPolicy(): Promise<boolean> {
    return this.enforcer.addGroupingPolicy();
  }

  // TODO: edit this in adapter to make it query from database
  // the operation will look like `await this.enforcer.getAdapter().enforce()`
  public async checkPermission(...params: any[]) {
    return this.enforcer.enforce(...params);
  }
}
