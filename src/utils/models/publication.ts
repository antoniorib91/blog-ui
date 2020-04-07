import { IMetadata } from './metadata';

export interface IPublication {
  id: string;
  title: string;
  body: string;
  metadata: IMetadata
}