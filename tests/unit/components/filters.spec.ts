
import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import Vuex, { Store, StoreOptions } from 'vuex';
import sinon from 'sinon';
import Filters from '@/components/navbar/Filters.vue';

chai.use(sinonChai);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Filters.vue', () => {
  let wrapper: Wrapper<Filters>;
  let store: Store<StoreOptions<object>>;
  const actions = {
    filterPublications: sinon.spy(),
    clearFilter: sinon.spy(),
    changeFiltered: sinon.spy()
  };
  const getters = {
    filtered: () => false
  };

  context('When initilize the component =>', () => {
    beforeEach(() => {
      store = new Vuex.Store({getters, actions});
      wrapper = shallowMount(Filters, { 
        store, localVue,
      });
    });

    it('Should create the component...', () => {
      expect(wrapper.exists()).to.be.true;
    });

    it('Should contains a div with filter class', () => {
      const el = wrapper.find('div');
      expect(el.classes())
    });

    it('Should contains a label with text Authors', () => {
      const el = wrapper.find('label');
      expect(el.text()).to.eq('Authors:')
    });

    it('Should contains a label with text Order By date', () => {
      const el = wrapper.findAll('label').at(1);
      expect(el.text()).to.eq('Order by date: Asc | Dsc');  
    });

    it('Should contains an input', () => {
      const el = wrapper.find('input');
      expect(el.classes()).to.includes('author-input');
    });

    describe('When insert a value on input =>', () => {
      context('And the value <= 2 =>', () => {
        it('Should dispatch "clearFilter" action on vuex...', () => {
          const el = wrapper.find('input');
          const inputEl = el.element as HTMLInputElement;
          inputEl.value = 'ab';
          el.trigger('input');
          expect(actions.clearFilter).to.have.been.called;
        });
      });

      context('And the value > 2', () => {
        it('Should dispatch "filterPublications" action on vuex...', () => {
          const inputValue = 'abcd';
          const el = wrapper.find('input');
          const inputEl = el.element as HTMLInputElement;
          inputEl.value = inputValue;
          el.trigger('input');
          expect(actions.filterPublications).to.have.been.called;
          expect(actions.filterPublications.lastCall.lastArg).to.contains( { type: 'author', value: inputValue })
        });
      });
    });

    describe('When Order by date =>', () => {
      context('And clicked Asc link =>', () => {
        it('Should dispatch "filterPublications" event on vuex...', () => {
          const el = wrapper.findAll('a').at(0);
          el.trigger('click');
          expect(el.text()).to.eq('Asc');
          expect(actions.filterPublications).to.have.been.called;
          expect(actions.filterPublications.lastCall.lastArg).to.contains({ type: 'date', value: 'asc' })
        });

        it('Should dispatch "changedFiltered" event on vues...' , () => {
          const el = wrapper.findAll('a').at(0);
          el.trigger('click');
          expect(el.text()).to.eq('Asc');
          expect(actions.changeFiltered).to.have.been.called;
          expect(actions.changeFiltered.lastCall.lastArg).to.eq(true)
        });
      });

      context('And clicked Dsc link...', () => {
        it('Should dispatch "filterPublications" event on vuex...', () => {
          const el = wrapper.findAll('a').at(1);
          el.trigger('click');
          expect(el.text()).to.eq('Dsc');
          expect(actions.filterPublications).to.have.been.called;
          expect(actions.filterPublications.lastCall.lastArg).to.contains({ type: 'date', value: 'dsc' })
        });

        it('Should dispatch "changedFiltered" event on vues...' , () => {
          const el = wrapper.findAll('a').at(1);
          el.trigger('click');
          expect(el.text()).to.eq('Dsc');
          expect(actions.changeFiltered).to.have.been.called;
          expect(actions.changeFiltered.lastCall.lastArg).to.eq(true)
        });
      });
    });

    context('When filtered was true =>', () => {
      beforeEach(() => {
        const tempGetters = {
          filtered: () => true
        }
        const tempStore = new Vuex.Store({getters: tempGetters, actions});
        wrapper = shallowMount(Filters, { 
          store: tempStore, localVue,
        });
      });

      it('Should show link clear filter...', () => {
        const el = wrapper.findAll('a').at(2);
        expect(el.text()).to.eq('Clear Filter')
      });

      it('Should dispatch "clearFilter" event on vuex when clicked link...', () => {
        const el = wrapper.findAll('a').at(2);
        el.trigger('click');
        expect(el.text()).to.eq('Clear Filter')
      });
    });

  });

    
});
