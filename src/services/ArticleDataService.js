import firebase from '../firebase';
const db = firebase.ref('/articles');

class ArticleDataService {
  // Pour récup tous les articles
  getAll() {
    return db;
  }
  // Pour créer 1 article en +
  create(article) {
    return db.push(article);
  }
  // Pour MAJ 1 article
  update(key, value) {
    return db.child(key).update(value);
  }
  //Pour Delete 1 article
  delete(key) {
    return db.child(key).remove();
  }
  //pour delete Tous les Articles
  deleteAll() {
    return db.remove();
  }
}
export default new ArticleDataService();
