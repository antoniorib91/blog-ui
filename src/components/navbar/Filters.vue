<template>
  <div class="filter">
    <label>Authors: </label>
    <input type="text" v-model="input" name="filter" placeholder="Ex.: John Doe">
    <label> Order by date: 
      <a href="javascript:void(0);" :click="handleClickFilterByDate('asc')">asc</a> |
      <a href="javascript:void(0);" :click="handleClickFilterByDate('dsc')">dsc</a> 
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';

@Component
export default class Filters extends Vue {

  @Model()
  public input!: string;

  // public handleClick(value: string) {
  //   console.log(value);
  //   value === 'filterByAuthor' ? this.handleClickFilterByAuthor() : this.handleClickFilterByDate();
  // }

  private handleClickFilterByDate(value: string) {
    console.log('byDate')
    this.$emit('filter', 'date', value);
  }

  // private handleClickFilterByAuthor() {
  //   console.log('byAuthor');
  //   this.$emit('filter', 'author');
  // }

}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';
</style>
