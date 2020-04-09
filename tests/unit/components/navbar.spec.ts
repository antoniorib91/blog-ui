import { shallowMount, Wrapper } from "@vue/test-utils";
import { expect } from 'chai';
import Title from '@/components/Title.vue';
import Navbar from '@/components/navbar/Navbar.vue';

describe('Navbar.vue', () => {
  let wrapper: Wrapper<Navbar>;

  beforeEach(() => {
    wrapper = shallowMount(Navbar);
  });

  context('When component initialize...', () => {
    it('Should create the component...', () => {
      expect(wrapper.exists()).to.be.true;
    });
    
    it('Should contains a div with class nav-bar and another div with class nav-title...', () => {
      const el = wrapper.findAll('div').at(1);
      const el2 = wrapper.findAll('div').at(2);
      expect(el.classes()).to.includes('nav-bar');
      expect(el2.classes()).to.includes('nav-title');
    });

    it('Should contains a Title with "Blog - Ui"...', () => {
      const el = wrapper.find(Title);
      expect(el.text()).to.eq('Blog - Ui');
      expect(el.attributes()['size']).to.eq('large');
    });
  });

});