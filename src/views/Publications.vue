<template>
  <Container>
      <div v-for="publication in publications" :key="publication.id" >
        <Publication :publication="publication" @filter="handleFilter($event)"></Publication>
      </div>
  </Container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, ProvideReactive } from 'vue-property-decorator';
import Container from '@/components/Container.vue';
import Publication from '@/components/Publication.vue';
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
    Publication
  }
})
export default class Publications extends Vue {

  public publications: Array<IPublicationView> = [];
  private httpClient: HttpClient = new HttpClient();

  public beforeMount(): void {
    this.getPublications();
  }

  public handleFilter(values: any) {
    console.log(values);
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
    this.publications = PublicationMapper.mapMultiplePublicationsToPublicationView(publications, response.data);
  }

  private handleResponseError(err: any): void {
    console.log(err);
  }

  
}
</script>

<style scoped lang="scss">

</style>
