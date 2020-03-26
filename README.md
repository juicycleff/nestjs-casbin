<h1 align="center">
NestJs Casbin Mongodb
</h1>
  
<p align="center">
  NestJS module for Casbin using the MongoDB Adapter
</p>
    <p align="center">
</p>

<p align="center">
<a href="https://www.npmjs.com/package/nestjs-casbin-mongodb" target="_blank"><img src="https://img.shields.io/npm/v/nestjs-casbin-mongodb?style=flat-square" alt="NPM Version"/></a>
<a href="https://img.shields.io/github/license/juicycleff/nestjs-casbin-mongodb?style=flat-square" target="_blank"><img src="https://img.shields.io/github/license/juicycleff/nestjs-casbin-mongodb?style=flat-square" alt="License"/></a>
<a href="https://img.shields.io/github/languages/code-size/juicycleff/nestjs-casbin-mongodb?style=flat-square" target="_blank"><img src="https://img.shields.io/github/languages/code-size/juicycleff/nestjs-casbin-mongodb?style=flat-square" alt="Code Size"/></a>
<a href="https://img.shields.io/github/languages/top/juicycleff/nestjs-casbin-mongodb?style=flat-square" target="_blank"><img src="https://img.shields.io/github/languages/top/juicycleff/nestjs-casbin-mongodb?style=flat-square" alt="Top Language"/></a>
<a href="https://img.shields.io/codacy/grade/81314c5a5cb04baabe3eb5262b859288?style=flat-square" target="_blank"><img src="https://img.shields.io/codacy/grade/dc460840375d4ac995f5647a5ed10179?style=flat-square" alt="Top Language"/></a>
</p>

### Installation

```bash
$ yarn install nestjs-casbin
```

### Setup module

```typescript
import { Module } from '@nestjs/common';
import { NestCasbinModule } from 'nestjs-casbin';
import { join } from 'path';
import { MongoAdapter } from 'casbin-mongodb-adapter';

const adapter = (async () => await MongoAdapter.newAdapter({
        uri: 'mongodb://localhost:27017',
        collectionName: 'casbin',
        databaseName: 'casbindb',
}));


@Module({
  imports: [
    NestCasbinModule.register({
      adapter,
      casbinModelPath: join(__dirname, './rbac_model.conf')
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

```typescript
import { Module, Injectable } from '@nestjs/common';
import { NestCasbinModule } from 'nestjs-casbin';
import { MongoAdapter } from 'casbin-mongodb-adapter';
import { NestCasbinModuleOptions, NestCasbinOptionsFactory } from 'nestjs-casbin-mongodb';
import { InjectConfig, ConsulConfig } from '@nestcloud/config';
import { join } from 'path';

@Injectable()
export class CasbinUserConfigService implements NestCasbinOptionsFactory {
  constructor(
    @InjectConfig() private readonly config: ConsulConfig,
  ) {}

  createCasbinOptions(connectionName?: string): Promise<NestCasbinModuleOptions> | NestCasbinModuleOptions {
    
    const adapter = await MongoAdapter.newAdapter({
       uri: 'mongodb://localhost:27017',
       collectionName: 'casbin',
       databaseName: 'casbindb',
    });

    return {
      adapter,
      casbinModelPath: join(__dirname, './rbac_model.conf')
    };
  }
}

@Module({
  imports: [
    NestCasbinModule.registerAsync({
      useClass: 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Pre 2.0.0
### Installation

```bash
$ yarn install nestjs-casbin-mongodb
```

### Setup module

```typescript
import { Module } from '@nestjs/common';
import { NestCasbinModule } from 'nestjs-casbin-mongodb';
import { join } from 'path';

@Module({
  imports: [
    NestCasbinModule.forRoot({
      uri: 'mongo://localhost:27017',
      casbinModelPath: join(__dirname, './rbac_model.conf'),
      collectionName: 'roles',
      databaseName: 'my-db-name',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


```

## License

  This project is [MIT licensed](LICENSE).
