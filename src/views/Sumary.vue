<template>
  <Container>
    <h1>Sumary</h1>
  </Container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Container from '@/components/Container.vue';
import Title from '@/components/Title.vue';

@Component({
  components: {
    Container,
    
  }
})
export default class Sumary extends Vue {
}
</script>

<style scoped lang="scss">

</style>
