<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="getBlogs">
    <icon icon="address-book" size="lg" />
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      items: [],
    }
  },
  methods:{
    getBlogs () {
      axios.get('http://localhost:3000/').then((response) => {
        this.items = response.data
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>
