<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">My Stories</p>
      </div>
    </section>
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="blog in blogs" :key="blog.id">
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
                  <img style="height: 120px" :src="imagePath(blog.file_path)" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ blog.title }}</div>
                <div class="content" style="height: 200px;">{{ shortContent(blog.content) }}</div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item" :href="`#/blogs/${blog.id}`">Read more...</a>
                <a class="card-footer-item">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="far fa-heart"></i>
                    </span>
                    <span>Like</span>
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      blogs: [],
    };
  },
  mounted () {
    this.getBlogs()
  },
  methods: {
    getBlogs() {
      axios
        .get("http://localhost:3000/")
        .then((response) => {
          this.blogs = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path){
        return 'http://localhost:3000/' + file_path
      } 
      else {
        return 'https://bulma.io/images/placeholders/640x360.png'
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + '...'
      }
      return content
    }
  },

};
</script>
