<template>
    <div class="container">
        <div class="container-search">
            <input class="search" type="search" name="searchArticle" id="searchArticle" placeholder="Search">
            <button @click="getArticlesNameOrDescription()" class="btn btnSearch"><Icon icon="gravity-ui:magnifier" width="1.2em" height="1.2em"  style="color: white" /></button>
        </div>
        <div class="card">
            <div class="card-header">
                <h4>Articles
                <RouterLink to="/articles/create" class="btn btn-primary float-end">Add</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class=" table table-bordered table-striped">
                    <thead>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </thead>
                    <tbody v-if="articles.length > 0">
                        <tr v-for="(article,index) in articles" :key="index">
                            <td>{{ article.id }}</td>
                            <td>{{ article.description }}</td>
                            <td>{{ article.stock }} units</td>
                            <td>${{ article.price }}</td>
                            <td>
                                <RouterLink :to="{path: '/articles/id/'+ article.id +'/edit' }" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <button class="btn btn-danger" @click="deleteArticles(article.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" style="text-align: center;"> Sin registros!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { RouterLink } from 'vue-router';
    import {Icon} from '@iconify/vue';
    import '../assets/searchBar.css';
    export default{
        name:'ClientsView',
        components:{Icon},
        data(){
            return{
                articles:[],
            }
        },
        mounted(){
            this.getArticles();
        },
        methods:{
            getArticles(){
                axios.get('http://localhost:3000/api/articles').then(res=>{
                    console.log(res)
                    this.articles = res.data;
                });
            },
            deleteArticles(idArticleDelete){
                axios.delete('http://localhost:3000/api/articles/'+idArticleDelete).then(res=>{
                    console.log(res);
                    this.getArticles();
                })
            },
            getArticlesNameOrDescription() {
            const articleSearching = document.getElementById('searchArticle').value;
            if (!isNaN(articleSearching)) {
                // Es un ID
                axios.get(`http://localhost:3000/api/articles/id/${articleSearching}`).then(res => {
                    this.articles = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else if (articleSearching) {
                // Es un nombre
                axios.get(`http://localhost:3000/api/articles/description/${articleSearching}`).then(res => {
                    this.articles = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else {
                this.getArticles(); // Para restablecer la lista si no se ingresa ningún valor de búsqueda
            }
        }
    }
}
</script>