import { Wrapper, createLocalVue, shallowMount } from '@vue/test-utils';
import chai, { expect } from 'chai';
import Vuex, { Store, StoreOptions } from 'vuex';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Publications from '@/views/Publications.vue';
import Publication from '@/components/Publication.vue';
import Summary from '@/components/summary/Summary.vue';
import Container from '@/components/Container.vue';
import { Mock } from '../mocks/mock';
import { HttpClient } from './../../../src/utils/http-client/http-client';
import { AxiosResponse } from 'axios';

chai.use(sinonChai);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Publications.vue =>', () => {
  let wrapper: Wrapper<Publications>;
  let store: Store<StoreOptions<object>>;
  const getters = {
    filteredPublications: () => Mock.getPublications()
  };
  const mutations = {
    setPublications: sinon.spy()
  }
  sinon.stub(HttpClient, 'getAuthors').resolves(
    { data: Mock.getHttpAuthors() } as AxiosResponse
  )
  sinon.stub(HttpClient, 'getPublications').resolves(
    { data: Mock.getHttpPublications() } as AxiosResponse
  )

  beforeEach(() => {
    store = new Vuex.Store({getters, mutations});
    wrapper = shallowMount(Publications, { 
      store, localVue
    })
  });

  context('Whe initialize the component =>', () => {
    it('Should create the component...', () => {
      expect(wrapper.exists()).to.be.true
    });

    it('Should have a container component...', () => {
      const el = wrapper.find(Container)
      expect(el.exists()).to.be.true
      expect(el.is(Container)).to.be.true
    });

    it('Should have a div with content class...', () => {
      const el = wrapper.find('.content');
      expect(el.exists()).to.be.true;
      expect(el.is('div')).to.be.true;
    });
  
    it('Should have a div with content-publications class...', () => {
      const el = wrapper.find('.content-publications');
      expect(el.exists()).to.be.true;
      expect(el.is('div')).to.be.true;
    });

    it('Should have one Publication Component...', () => {
      const elements =  wrapper.findAll(Publication);
      expect(elements.length).is.not.greaterThan(1);
    })

    it('Should have a div with content-sumary class...', () => {
      const el = wrapper.find('.content-sumary');
      expect(el.exists()).to.be.true;
      expect(el.is('div')).to.be.true;
    });

    it('Should have a component Summary...', () => {
      const el =  wrapper.findAll(Summary);
      expect(el.exists()).to.be.true;
      expect(el.is(Summary)).to.be.true;
    });

    it('Should commit "setPublications" event on vuex...', () => {
      expect(mutations.setPublications).to.have.been.called;
    });

  });
});