import { IPublicationView } from '@/utils/models/publication-view';
import { IPublication } from '@/utils/models/publication';
import { IAuthor } from '@/utils/models/author';

export class Mock {
  public static getPublicationView(): IPublicationView {
    return {
      id: '0',
      title: 'test',
      body: 'body test',
      metadata: {
        author: {
          id: 0,
          name: 'author test'
        },
        publishedAt: new Date()
      }
    }
  }

  public static getPublications(): Array<IPublicationView> {
    return [this.getPublicationView()];
  }



  public static getHttpPublications(): Array<IPublication> {
    return [ this.getPublication() ];
  }

  public static getHttpAuthors(): Array<IAuthor> {
    return [this.getAuthor()];
  }

  public static getAuthor(): IAuthor {
    return { id: 0, name: 'test name' }
  }

  public static getPublication(): IPublication {
    return {
      id: '0',
      body: 'test body',
      title: 'test title',
      metadata: {
        authorId: 0,
        publishedAt: 1586405097707
      }
    };
  }
}