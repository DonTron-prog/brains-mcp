import { DynamoStorageService } from './dynamoStorage';
import { StorageService } from '../storageTypes';

export function getStorageService(storageType: 'user' | 'system'): StorageService {
  const tableName = storageType === 'user' ?
    process.env.USER_DATA_TABLE_NAME || "" :
    process.env.SYSTEM_DATA_TABLE_NAME || "";
  return new DynamoStorageService(tableName);
} 