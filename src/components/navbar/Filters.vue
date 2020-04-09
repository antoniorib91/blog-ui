<template>
  <div class="filter">
    <label>Authors: </label>
    <input type="text" class="author-input" placeholder="Ex.: John Doe" @input="handleInput($event.target.value)">
    <label> Order by date: 
      <a href="javascript:void(0);" @click="handleClickFilterByDate('asc')">Asc</a> |
      <a href="javascript:void(0);" @click="handleClickFilterByDate('dsc')">Dsc</a>
       <label v-if="filtered">
        | <a href="javascript:void(0);" @click="handleClearFilter()">Clear Filter</a>
      </label>
    </label>
   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Filters extends Vue {

  get filtered(): boolean {
    return this.$store.getters.filtered;
  }

  public handleInput(value: string) {
    if(value.length > 2) {
      this.$store.dispatch('filterPublications', { type: 'author', value: value });
    } else {
      this.handleClearFilter()
    }
  }

  public handleClearFilter() {
    this.$store.dispatch('clearFilter');
  }

  public handleClickFilterByDate(value: string) {
    this.$store.dispatch('filterPublications', { type: 'date', value: value });
    this.$store.dispatch('changeFiltered', true);
  }

}
</script>

<style scoped lang="scss">
@import '@/assets/scss/media.scss';

</style>
