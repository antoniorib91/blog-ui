<template>
  <div  class="summary">
    <Title size="small" class="title">Latest Publications</Title>
    <ul class="list">
      <li class="item" v-for="pub in getPublications()" :key="pub.id">
        <a href="javascript:void(0);" @click="handleClick(pub.id)">{{ pub.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
@Component({
  components: { Title }
})
export default class Summary extends Vue {

  public getPublications() {
    return this.$store.getters.publicationsOrderedByDateDsc;
  }

  public handleClick(value: string) {
    this.$store.dispatch('filterPublications', { type: 'byId', value: value })
  }

}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';

.summary {
  margin: 3.5rem 0;

  .title {
    text-align: center; 
  }

  .list {
    margin-left: 3px;
    padding-inline-start: 15px;
    .item {
      margin: 0 5px;
    }
  }

 
}

</style>
