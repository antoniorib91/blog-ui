import Vue from 'vue'
import Vuex from 'vuex'
import { IPublicationView } from '@/utils/models/publication-view'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    publications: [],
    filteredPublications: [],
    filtered: false
  },
  mutations: {
    setPublications: (state, value) => {
      state.publications = value;
      state.filteredPublications = value;
    },
    setFilteredPublications: (state, value) => {
      state.filteredPublications = value;
    },
    setFiltered: (state, value) => {
      state.filtered = value;
    }
  },
  actions: {
    filterPublications: (context, { type, value }) => {
      const filteredPublications = type === 'author' 
      ? context.getters.publicationsFilteredByAuthor(value)
      : type === 'date' 
        ? value === 'asc'
          ? context.getters.publicationsOrderedByDateAsc
          : context.getters.publicationsOrderedByDateDsc
        : context.getters.publicationsFindById(value);
      
      context.commit('setFilteredPublications', filteredPublications)
    },
    clearFilter: (context) => {
      context.commit('setPublications', context.state.publications);
      context.commit('setFiltered', false);

    },
    changeFiltered: (context, value) => {
      context.commit('setFiltered', value ? value: !context.state.filtered);
    }
  },
  modules: {
  },
  getters: {
    publications: state => state.publications,
    filteredPublications: state => state.filteredPublications,
    filteredPublicationsSize: state => state.filteredPublications.length,
    filtered: state => state.filtered,
    publicationsOrderedByDateAsc: state => {
      const pubs: Array<IPublicationView> = Object.assign([], state.publications);
      return pubs.sort((a, b) => a.metadata.publishedAt.getTime() - b.metadata.publishedAt.getTime())
    },
    publicationsOrderedByDateDsc: state => {
      const pubs: Array<IPublicationView> = Object.assign([], state.publications);
      return pubs.sort((a, b) => b.metadata.publishedAt.getTime() - a.metadata.publishedAt.getTime())
    },
    publicationsFilteredByAuthor: (state) => (value: string) => {
      const pubs: Array<IPublicationView> = Object.assign([], state.publications);
      return pubs.filter(p => p.metadata.author.name.toLocaleLowerCase().trim().includes(value.toLocaleLowerCase().trim()));
    },
    publicationsFindById: (state) => (value: string) => {
      const pubs: Array<IPublicationView> = Object.assign([], state.publications);
      return pubs.filter(p => p.id === value);
    }
  },
})
