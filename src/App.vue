<template lang="pug">
  #app
    img(src='./assets/logo.png')
    h1 Top Artists
    select(v-model="selectedCountry")
      option(:value="country.value" v-for="country in countries") {{ country.name }}
    Spinner(v-show="loading")
    ul
      Artist(v-for="artist in artists" :artist="artist" :key="artist.mbid")
</template>

<script>
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'
import { getArtists } from './api'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        { name: 'Colombia', value: 'colombia' },
        { name: 'Argentina', value: 'argentina' },
        { name: 'España', value: 'spain' }
      ],
      selectedCountry: 'colombia',
      loading: true
    }
  },
  components: {
    Artist,
    Spinner
  },
  methods: {
    refreshArtists () {
      this.loading = true
      this.artists = []
      getArtists(this.selectedCountry)
        .then(artists => {
          this.loading = false
          this.artists = artists
        })
    }
  },
  mounted: function () {
    this.refreshArtists()
  },
  watch: {
    selectedCountry () {
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px
  h1, h2
    font-weight normal
  ul
    list-style-type none
    padding 0
  li
    display inline-block
    margin 0 10px
  a
    color #42b983
</style>
