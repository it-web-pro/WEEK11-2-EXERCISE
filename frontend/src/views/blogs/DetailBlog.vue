<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
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
            <div class="container pb-3">
              <p class="subtitle">Comments</p>
              <div class="columns">
                <div class="column is-8">
                  <input type="text" class="input" v-model="commTxt" placeholder="Add new comment"/>
                </div>
                <div class="column is-4">
                  <button @click="addComment" class="button">Add comment</button>
                </div>
              </div>
            </div>
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
                    <nav class="level">
                      <div class="level-left">
                        <a class="level-item" aria-label="like">
                          <span class="icon is-small pr-3">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                          Like (0)
                        </a>
                      </div>
                      <div class="level-right">
                        <div class="level-item">
                          <button class="button is-warning">
                            <span>Edit</span>
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                          </button>
                        </div>
                        <div class="level-item">
                          <button class="button is-danger is-outlined">
                            <span>Delete</span>
                            <span class="icon is-small">
                              <i class="fas fa-times"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            </div>
          <footer class="card-footer">
            <router-link class="card-footer-item" to="/">To Home Page</router-link>
            <a class="card-footer-item" @click="deleteBlog">
              <span>Delete this blog</span>
            </a>
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
      error: null,
      commTxt: ''
    }
  },
  mounted () {
    this.getBlogDetail(this.$route.params.id)
  },
  methods: {
    getBlogDetail(blogId) {
      axios.get(`http://localhost:3000/blogs/${blogId}`)
        .then(response => {
          this.blog = response.data.blog
          this.images = response.data.images
          this.comments = response.data.comments
        })
        .catch(error => {
          this.error = error.message
        })
    },
    addComment() {
      axios.post(`http://localhost:3000/${this.blog.id}/comments`, {
        comment: this.commTxt
      })
        .then(response => {
          this.comments.push(response.data)
        })
        .catch(error => {
          this.error = error.message
        })
    },
    deleteBlog() {
      axios.delete(`http://localhost:3000/blogs/${this.blog.id}`)
        .then(response => {
          // this.$router.push('/')
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          this.error = error.message
        })
    }
  }
};
</script>