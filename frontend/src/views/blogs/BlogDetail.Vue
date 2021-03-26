<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">{{ blog.title }}</p>
      </div>
    </section>
    <section class="section">
      <div class="content">
        <div class="card has-background-light">
          <div class="card-image pt-5">
            <div class="columns">
              <div  v-for="image in images" :key="image.id" class="column">
                <figure class="image">
                  <img
                    :src="'http://localhost:3000'+image.file_path"
                    alt="Placeholder image"
                    style="height: 500px; object-fit: cover;"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="content">{{ blog.content }}</div>
            <div class="container">
              <p class="subtitle">Comments</p>
              <div v-for="comment in comments" :key="comment.id" class="box">
                <article class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img
                        src="https://bulma.io/images/placeholders/128x128.png"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>{{ comment.comment }}</p>
                      <p class="is-size-7">{{ comment.comment_date }}</p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <a class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" href="#/">To Home Page</a>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      blog: {},
      comments: [],
      images: [],
      error: null
    }
  },
  mounted () {
    this.getBlogDetail(this.$route.params.id)
  },
  methods: {
    getBlogDetail(id) {
      axios.get(`http://localhost:3000/blogs/${id}`)
        .then(res => {
          this.blog = res.data.blog
          this.images = res.data.images
          this.comments = res.data.comments
        })
        .catch(err => {
          this.err = err
        })
    }
  }
};
</script>