<template>
  <div class="pub">
    <Title klass="left" size="medium">{{ publication.title }}</Title> 
    <Title klass="left">
      <label @click="handleClick('filterByAuthor')">{{ publication.metadata.author.name }}</label> -
      <label @click="handleClick('filterByDate')">{{ publication.metadata.publishedAt | formattedDate }}</label>
    </Title>
    <hr>
    <div class="text-box">
      <p class="line-clamp">{{ publication.body }}</p>
    </div>
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

  public handleClick(value: string) {
    value === 'filterByAuthor' ? this.handleClickFilterByAuthor() : this.handleClickFilterByDate();
  }

  private handleClickFilterByDate() {
    this.$emit('filter', ['date', this.publication.metadata.publishedAt]);
  }

  private handleClickFilterByAuthor() {
    this.$emit('filter', ['author', this.publication.metadata.author.name]);
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
    }
  }
}
</style>
