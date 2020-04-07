<template>
  <div id="nav">
    <div class="nav-bar">
      <div class="nav-title">
        <Title size="medium" :inline="true" >Blog - Ui</Title>
      </div>
      <div class="nav-links">
        <router-link to="/">Publications</router-link> |
        <router-link to="/sumary">Sumary</router-link>
      </div>
    </div>
    <div>
      <Filters></Filters>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Filters from '@/components/navbar/Filters.vue';
import Title from '@/components/Title.vue';
@Component({
  components: {
    Filters,
    Title
  }
})
export default class Navbar extends Vue {}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';

  #nav {
  .nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    
    a {
      font-weight: bold;
      color: $blue1;

      &.router-link-exact-active {
        color: $blue2;
      }
    }
  }
 
}
</style>
