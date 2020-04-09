import { shallowMount, Wrapper } from "@vue/test-utils";
import { expect } from 'chai';
import Container from '@/components/Container.vue';

describe('Container.vue', () => {
  let wrapper: Wrapper<Container>;

  beforeEach(() => {
    wrapper = shallowMount(Container, {
      slots: {
        default: '<p>Test Slot</p>'
      }
    });
  });

  context('When component initialize...', () => {
    it('Should create the component...', () => {
      expect(wrapper.exists()).to.be.true;
    });
    
    it('Should contains a div with class container...', () => {
      const el = wrapper.find('div');
      expect(el.classes()).to.includes('container');
    });

    it('Should contains any tag inside the slot in this case should be a paragraph...', () => {
      const el = wrapper.find('p');
      expect(el.text()).to.eq('Test Slot');
    });
  });

});