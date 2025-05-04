import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EntityManager, DataSource } from 'typeorm';

@Injectable()
export class DatabaseService extends EntityManager {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
}
