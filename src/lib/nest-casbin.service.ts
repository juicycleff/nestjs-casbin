import { Inject, Injectable } from '@nestjs/common';
import { Enforcer } from 'casbin';
import { CASBIN_ENFORCER } from './nest-casbin.constants';

@Injectable()
export class NestCasbinService {
  constructor(@Inject(CASBIN_ENFORCER) private readonly enforcer: Enforcer) {}

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

  public async getAllRoles(): Promise<string[]> {
    return this.enforcer.getAllRoles();
  }

  public async getAllObjects(): Promise<string[]> {
    return this.enforcer.getAllObjects();
  }

  public async getAllSubjects(): Promise<string[]> {
    return this.enforcer.getAllSubjects();
  }

  public async getUsersForRole(name: string, domain?: string): Promise<string[]> {
    return this.enforcer.getUsersForRole(name, domain);
  }

  public async hasRoleForUser(user: string, role: string, domain?: string): Promise<boolean> {
    return this.enforcer.hasRoleForUser(user, role, domain);
  }

  public async addRoleForUser(user: string, role: string, domain?: string): Promise<boolean> {
    return this.enforcer.addRoleForUser(user, role, domain);
  }

  public async deleteRoleForUser(user: string, role: string, domain?: string): Promise<boolean> {
    return this.enforcer.deleteRoleForUser(user, role, domain);
  }

  public async deleteRolesForUser(user: string, domain?: string): Promise<boolean> {
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

  public async addPermissionForUser(user: string,...permissions: string[]): Promise<boolean> {
    return this.enforcer.addPermissionForUser(user, ...permissions);
  }

  public async deletePermissionForUser(user: string,...permissions: string[]): Promise<boolean> {
    return this.enforcer.deletePermissionForUser(user, ...permissions);
  }

  public async deletePermissionsForUser(user: string): Promise<boolean> {
    return this.enforcer.deletePermissionsForUser(user);
  }

  public async getPermissionsForUser(user: string): Promise<string[][]> {
    return this.enforcer.getPermissionsForUser(user);
  }

  public async hasPermissionForUser(user: string, ...permissions: string[]): Promise<boolean> {
    return await this.enforcer.hasPermissionForUser(user, ...permissions);
  }

  public async getAllActions(): Promise<string[]> {
    return this.enforcer.getAllActions();
  }

  public async hasPolicy(...params: string[]): Promise<boolean> {
    return await this.enforcer.hasPolicy(...params);
  }

  public async hasNamedPolicy(p: string, ...params: string[]): Promise<boolean> {
    return await this.enforcer.hasNamedPolicy(p, ...params);
  }

  // TODO: edit this in adapter to make it query from database
  // the operation will look like `await this.enforcer.getAdapter().enforce()`
  public async checkPermission(...params: any[]) {
    return this.enforcer.enforce(...params);
  }
}
