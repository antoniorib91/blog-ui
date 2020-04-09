import { expect } from 'chai';
import { shallowMount } from "@vue/test-utils";
import Title from '@/components/Title.vue';

describe('Title.vue =>', () => {
  context('When initialize the component =>', () => {
    const wrapper = shallowMount(Title);
    it('...Should initialize the component', () => {
      expect(wrapper.exists()).to.be.true;
    });

    context('And the props not informed =>', () => {
      it('...Should contains the default props', () => {
        expect(wrapper.props().size).to.eq('small');
        expect(wrapper.props().inline).to.eq(false);
        expect(wrapper.props().klass).to.eq('');
      });
    });

    context('And contains props values =>', () => {
      beforeEach(() => {
        wrapper.setProps({ size: 'medium', klass: 'test', inline: true})
      });
      
      it('...Should contains the informed values', () => {
        expect(wrapper.props().size).to.eq('medium');
        expect(wrapper.props().klass).to.eq('test');
        expect(wrapper.props().inline).to.eq(true);
      });

      it('...Should cointains scss classes', () => {
        expect(wrapper.classes()).to.contains('medium');
        expect(wrapper.classes()).to.contains('inline');
        expect(wrapper.classes()).to.contains('test');
      });
    })
  })
})
