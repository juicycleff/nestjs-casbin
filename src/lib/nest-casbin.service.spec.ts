import { Test, TestingModule } from '@nestjs/testing';
import { NestCasbinService } from './nest-casbin.service';
import { Provider } from '@nestjs/common';
import { CASBIN_ENFORCER } from './nest-casbin.constants';
import { newEnforcer } from 'casbin';
import * as path from 'path';
import { MongoAdapter } from 'casbin-mongodb-adapter';

describe('NestCasbinService', () => {
  let service: NestCasbinService;
  let module: TestingModule;
  let adapter: MongoAdapter

  const casbinEnforcerProvider: Provider = {
    provide: CASBIN_ENFORCER,
    useFactory: async () => {
      const model = path.resolve(__dirname, '../rbac_model.conf');
      adapter = await MongoAdapter.newAdapter({
        uri: 'mongodb://localhost:27017',
        collectionName: 'casbin',
        databaseName: 'casbindb',
      });
      const e = await newEnforcer(model, adapter);
      await e.loadPolicy();
      return e;
    },
  };
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [casbinEnforcerProvider, NestCasbinService],
      exports: [NestCasbinService],
    }).compile();

    service = module.get<NestCasbinService>(NestCasbinService);
  });

  afterAll(async() => {
    await module.close()
    await adapter.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
