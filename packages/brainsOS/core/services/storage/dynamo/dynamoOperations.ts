import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";

// Consolidate client creation
export const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function queryItems(
  userId: string,
  prefixFilter: string
) {
  const command = new QueryCommand({
    TableName: process.env.SYSTEM_DATA_TABLE_NAME || "",
    KeyConditionExpression: 'userId = :userId AND begins_with(typeName, :prefix)',
    ExpressionAttributeValues: {
      ':userId': userId,
      ':prefix': prefixFilter
    }
  });
  
  const result = await dynamoDb.send(command);
  return result.Items || [];
}

export async function putItem(
  userId: string,
  typeName: string,
  attributes: Record<string, unknown>
) {
  const command = new PutCommand({
    TableName: process.env.SYSTEM_DATA_TABLE_NAME || "",
    Item: {
      userId,
      typeName,
      createdAt: new Date().toISOString(),
      ...attributes
    }
  });
  
  return dynamoDb.send(command);
}

