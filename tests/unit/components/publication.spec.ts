import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import Vuex, { Store, StoreOptions } from 'vuex';
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from 'chai';
import { Mock } from '../mocks/mock';
import Title from '@/components/Title.vue';
import Publication from '@/components/Publication.vue';

chai.use(sinonChai);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Publication.vue =>', () => {
  let wrapper: Wrapper<Publication>;
  let store: Store<StoreOptions<object>>;
  const actions = {
    filterPublications: sinon.spy(),
    changeFiltered: sinon.spy(),
    clearFilter: sinon.spy(),
  };
  const getters = {
    filteredPublicationsSize: () => Mock.getPublications().length
  };

  context('When initialize component =>', () => {
    beforeEach(() => {
      store = new Vuex.Store({getters, actions});
      wrapper = shallowMount(Publication, { 
        store, localVue,
        propsData: {publication: Mock.getPublicationView()}
      });
    });
    it('Should create the component...', () => {
      expect(wrapper.exists()).to.be.true;
    });

    it('Should contains a Title with publication title..', () => {
      const el = wrapper.find(Title);
      expect(el.text()).to.eq(Mock.getPublicationView().title);
    });

    context('When click at author name =>', () => {
      it('Should dispatch "filterPublications" on store...', () => {
        const el = wrapper.findAll('label').at(0)
        el.trigger('click');
        expect(actions.filterPublications).to.have.been.called;
        expect(actions.filterPublications.lastCall.lastArg).to.contains({ type: 'author', value: Mock.getPublicationView().metadata.author.name })
      });

      it('Should dispatch "changeFiltered" on store...', () => {
        const el = wrapper.findAll('label').at(0)
        el.trigger('click');
        expect(el.text()).to.eq(Mock.getPublicationView().metadata.author.name);
        expect(actions.changeFiltered).to.have.been.called;
        expect(actions.changeFiltered.lastCall.lastArg).to.eq(true);

      });
    });

    context('When was one publication filtered =>', () => {
      it('Should show Go Back link...', () => {
        const el = wrapper.find('a')
        expect(el.text()).to.eq('Go back');
      });

      it('Should dispatch "clearFilter" on store', () => {
        const el = wrapper.find('a')
        el.trigger('click')
        expect(actions.clearFilter).to.have.been.called;
      });
    });
    
    context('When was more than one publications filtered =>', () => {
      let tempStore: Store<StoreOptions<object>>;
      beforeEach(() => {
        const localGetters = {
          filteredPublicationsSize: () => 4
        }
        tempStore = new Vuex.Store({getters: localGetters, actions});
        wrapper = shallowMount(Publication, { 
          store: tempStore, localVue,
          propsData: {publication: Mock.getPublicationView()}
        });
      });
      
      it('Should show see more link...', () => {
        const el = wrapper.find('a')
        expect(el.text()).to.eq('See more...');
      });
      
      it('Should dispatch "filterPublications" on store...', () => {
        const el = wrapper.find('a')
        el.trigger('click')
        expect(actions.filterPublications).to.have.been.called;
        expect(actions.filterPublications.lastCall.lastArg).to.contains({ type: 'byId', value: Mock.getPublicationView().id })
      });
    });
  });


});