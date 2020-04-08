<template>
  <Container>
    <div class="content">
      <div class="content-publications">
        <div v-for="publication in publications" :key="publication.id" >
          <Publication :publication="publication" ></Publication>
        </div>
      </div>
      <div class="content-sumary">
        <Summary></Summary>
      </div>
    </div>
      
  </Container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Container from '@/components/Container.vue';
import Publication from '@/components/Publication.vue';
import Summary from "@/components/summary/Summary.vue";
import Title from '@/components/Title.vue';
import { IPublication } from '@/utils/models/publication';
import { IPublicationView } from '../utils/models/publication-view';
import { IAuthor } from '../utils/models/author';
import { PublicationMapper } from '@/utils/mappers/publication-mapper';
import { HttpClient } from '../utils/http-client/http-client';
import { AxiosResponse } from 'axios';
@Component({
  components: {
    Container,
    Title,
    Publication,
    Summary
  }
})
export default class Publications extends Vue {

  public filtered = false;

  private httpClient: HttpClient = new HttpClient();

  get publications(): Array<IPublicationView> {
    return this.$store.getters.filteredPublications;
  }

  public beforeMount(): void {
    this.getPublications();
  }

  private getPublications() {
    this.httpClient.getPublications()
    .then(this.handleResponse)
    .catch(this.handleResponseError);
  }

  private getAuthors(values: Array<IPublication>) {
    this.httpClient.getAuthors()
    .then(res => this.handleResponseAuthors(res, values))
    .catch(this.handleResponseError);
  }

  private handleResponse(response: AxiosResponse<Array<IPublication>>): void {
    this.getAuthors(response.data);
  }

  private handleResponseAuthors(response: AxiosResponse<Array<IAuthor>>, publications: Array<IPublication>) {
    const publicationsViews = PublicationMapper.mapMultiplePublicationsToPublicationView(publications, response.data);
    this.$store.commit('setPublications', publicationsViews);
  }

  private handleResponseError(err: Error): void {
    console.log(err);
  }

  
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/media.scss';
</style>
