<template>
  <div class="pub">
    <Title klass="left" size="medium">{{ publication.title }}</Title> 
    <Title klass="left">
      <label @click="handleClick()">{{ publication.metadata.author.name }}</label> -
      <label >{{ publication.metadata.publishedAt | formattedDate }}</label>
    </Title>
    <hr>
    <div class="text-box">
      <p :class="['line-clamp', publicationsSize() === 1 ? 'no-clamp': '' ]">{{ publication.body }}</p>
    </div>
    <a href="javascript:void(0);" class="see-more" v-if="publicationsSize() !== 1" @click="handleClickSeeMore()">See more...</a>
    <a href="javascript:void(0);" class="see-more" v-if="publicationsSize() === 1" @click="handleClickGoBack()">Go back</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import { IPublicationView } from '../utils/models/publication-view';


@Component({
  components: { Title },
  filters: {
    formattedDate: function formattedDate(value: Date) { return value.toLocaleDateString() }
  }
})
export default class Publication extends Vue {
  @Prop()
  public publication!: IPublicationView;

  public publicationsSize() {
    return this.$store.getters.filteredPublicationsSize;
  }

  public handleClick() {
    this.$store.dispatch('filterPublications', { type: 'author', value: this.publication.metadata.author.name })
    this.$store.dispatch('changeFiltered', true);
  }

  public handleClickSeeMore() {
    this.$store.dispatch('filterPublications', { type: 'byId', value: this.publication.id })
  }

  public handleClickGoBack() {
    this.$store.dispatch('clearFilter');
  } 

}
</script>

<style scoped lang="scss">
.left {
  text-align: left;
}
.pub {
  margin: 3rem 0;
  background-color: white;
  .text-box {
    .line-clamp {
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;

      &.no-clamp {
        -webkit-line-clamp: unset;
      }
    }
  }

  .see-more {
    float: left;
  }
}
</style>
