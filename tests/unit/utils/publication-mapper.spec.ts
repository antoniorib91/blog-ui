import { expect } from 'chai';
import { Mock } from '../mocks/mock';
import { PublicationMapper } from '@/utils/mappers/publication-mapper';
describe('PublicationMapper =>', () => {
  const publication = Mock.getPublication();
  const author = Mock.getAuthor();

  describe('#mapMultiplePublicationsToPublicationView =>', () => {
    context('When I have an array with Publications and an array of Authors =>', () => {
      it('Should format the array to  an array of PublicationsView...', () => {
        const subject = PublicationMapper.mapMultiplePublicationsToPublicationView([publication], [author]);
        expect(subject.length).to.eq(1);
        expect(subject[0].title).to.eq(publication.title)
        expect(subject[0].body).to.eq(publication.body)
        expect(subject[0].id).to.eq(publication.id)
        expect(subject[0].metadata.publishedAt.getTime()).to.eq(publication.metadata.publishedAt)
        expect(subject[0].metadata.author.id).to.eq(author.id)
        expect(subject[0].metadata.author.name).to.eq(author.name)
      });
    });
  });

  describe('#mapPublicationToPublicationView =>', () => {
    context('When I have a publication and want to transform to PublicationView =>', () => {
      it('Should format to publicationView...', () => {
        const subject = PublicationMapper.mapPublicationToPublicationView(0, publication, author);
        expect(subject.title).to.eq(publication.title)
        expect(subject.body).to.eq(publication.body)
        expect(subject.id).to.eq(publication.id)
        expect(subject.metadata.publishedAt.getTime()).to.eq(publication.metadata.publishedAt)
        expect(subject.metadata.author.id).to.eq(author.id)
        expect(subject.metadata.author.name).to.eq(author.name)
      });
    });
    context('When I want to transform to PublicationView without author =>', () => {
      it('Should format with undefined author...', () => {
        const subject = PublicationMapper.mapPublicationToPublicationView(0, publication, undefined);
        expect(subject.title).to.eq(publication.title)
        expect(subject.body).to.eq(publication.body)
        expect(subject.id).to.eq(publication.id)
        expect(subject.metadata.publishedAt.getTime()).to.eq(publication.metadata.publishedAt)
        expect(subject.metadata.author).to.be.undefined
      });
    });
  });
  
});