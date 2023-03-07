<template>
  <div class="container list row">
    <h1>Articles LIST</h1>
    <div class="col-md-6">
      <ul class="list-group">
        <li></li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger">Tout Suppr.</button>
    </div>
    <div class="col-md-6">
      <div>
        <article-details></article-details>
      </div>
      <div>
        <p>Veuillez selectionner un article.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDataService from '../services/ArticleDataService.js';
import ArticleDetails from './ArticleDetails.vue';
export default {
  name: 'articles-list',
  components: { ArticleDetails },
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
    };
  },
  methods: {
    onDataChange(lesArticles) {
      let _articles = [];
      lesArticles.forEach((unArticle) => {
        // let key = unArticle.key;
        let data = unArticle.val();
        _articles.push({
          key: unArticle.key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });
      this.articles = _articles;
    },
    refreshList() {
      this.currentArticle = null;
      this.currentIndex = -1;
    },
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
    },
    removeAllArticles() {
      ArticleDataService.deleteAll()
        .then(() => {
          this.refreshList;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    ArticleDataService.getAll().on('value', this.onDataChange);
    console.log('JE VIENS DE ME MONTER');
  },
  beforeUnmount() {
    ArticleDataService.getAll().off('value', this.onDataChange);
    console.log('JUSTE AVANT QUE JE ME DEMONTE');
  },
};
</script>
