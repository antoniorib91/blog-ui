<template>
  <h1 :class="['title', size, inline ? 'inline':'', klass]">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Title extends Vue {

  @Prop({type: String, default: ''})
  public klass!: string;

  @Prop({default: 'small'})
  public size!: 'small' | 'medium' | 'large';

  @Prop({default: false})
  public inline!: boolean

}
</script>

<style scoped lang="scss">
  .title {
    &.small {
      font-size: 1rem;
    }

    &.medium {
      font-size: 1.8rem;
    }

    &.large {
      font-size: 2.2rem;
    }

    &.inline {
      display: inline;
      margin: 0 3rem;
    }
  }
</style>
