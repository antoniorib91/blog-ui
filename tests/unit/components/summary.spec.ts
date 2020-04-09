import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import Vuex, { Store, StoreOptions } from 'vuex';
import sinon from 'sinon';
import { Mock } from '../mocks/mock';
import Title from '@/components/Title.vue';
import Summary from '@/components/summary/Summary.vue';
chai.use(sinonChai);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Summary.vue', () => {
  let wrapper: Wrapper<Summary>;
  let store: Store<StoreOptions<object>>;
  const actions = {
    filterPublications: sinon.spy(),
  };
  const getters = {
    publicationsOrderedByDateDsc: () => Mock.getPublications()
  };

  beforeEach(() => {
    store = new Vuex.Store({getters, actions});
    wrapper = shallowMount(Summary, { 
      store, localVue,
    });
  });

  context('When component initialize...', () => {
    it('Should create the component...', () => {
      expect(wrapper.exists()).to.be.true;
    });
    
    it('Should contains a div with class container...', () => {
      const el = wrapper.find('div');
      expect(el.classes()).to.includes('summary');
    });

    it('Should contains a title with class title and value "Latest Publications"...', () => {
      const el = wrapper.find(Title);
      expect(el.classes()).to.includes('title');
      expect(el.text()).to.eq('Latest Publications')
    });

    it('Should contains a list with class list"...', () => {
      const el = wrapper.find('ul');
      expect(el.classes()).to.includes('list');
    });

    context('When render publications values =>', () => {
      it('Should have a list with lines...', () => {
        const allLines= wrapper.findAll('li');
        const lineElement = allLines.at(0);
        expect(lineElement.classes()).to.includes('item');
      });

      it('Should have a list when the lines have a link...', () => {
        const allLines= wrapper.findAll('li');
        const lineElement = allLines.at(0);
        const link = lineElement.find('a');
        expect(link.text()).to.eq(Mock.getPublicationView().title)
      })

      context('When clicked in one list link', () => {
        it('Should dispatch "filterPublications" event on store...', () => {
          const allLines= wrapper.findAll('li');
          const lineElement = allLines.at(0);
          const link = lineElement.find('a');
          link.trigger('click');
          expect(actions.filterPublications).to.have.been.called;
          expect(actions.filterPublications.lastCall.lastArg).to.contains({ type: 'byId', value: Mock.getPublicationView().id });
        });
      });
    });
  });
  
});