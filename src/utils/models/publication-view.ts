import { IMetadataView } from './metadata-view';

export interface IPublicationView {
  id: string;
  title: string;
  body: string;
  metadata: IMetadataView
}