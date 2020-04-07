import { IPublication } from '../models/publication';
import { IAuthor } from '../models/author';
import { IPublicationView } from '../models/publication-view';

export class PublicationMapper {

  public static mapMultiplePublicationsToPublicationView(publications: Array<IPublication>, authors: Array<IAuthor>) {
    return publications.map((pub, i) => 
      this.mapPublicationToPublicationView(i, pub, this.getAuthor(pub, authors))
    )
  }

  public static mapPublicationToPublicationView(index: number, publication: IPublication, author: IAuthor | undefined) {
    return { 
      id: index.toString(), 
      body: publication.body, 
      title: publication.title,
      metadata: { 
        publishedAt: new Date(publication.metadata.publishedAt),
        author: author 
      }
    } as IPublicationView
  }

  private static getAuthor(pub: IPublication, authors: Array<IAuthor>) {
    return authors.find(a => a.id === pub.metadata.authorId)
  }
}