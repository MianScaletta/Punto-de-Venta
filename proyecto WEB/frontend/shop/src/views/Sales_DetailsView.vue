<template>
    <div class="container">
        <div class="container-search">
            <input class="search" type="search" name="searchSale_Detail" id="searchSale_Detail" placeholder="Search">
            <button @click="getDetailsSaleOrEmpleyeeOrClientOrArticle()" class="btn btnSearch"><Icon icon="hugeicons:search-02" /></button>
        </div>
        <div class="card">
            <div class="card-header">
                <h4>Sales Details
                <RouterLink to="/sales_details/create" class="btn btn-primary float-end">Add</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class=" table table-bordered table-striped">
                    <thead>
                        <th>Detail</th>
                        <th>Sale</th>
                        <th>Employee</th>
                        <th>Client</th>
                        <th>Article</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </thead>
                    <tbody v-if="sale_details.length > 0">
                        <tr v-for="(sale_detail,index) in sale_details" :key="index">
                            <td>{{ sale_detail.id }}</td>
                            <td>{{ sale_detail.sale }}</td>
                            <td>{{ sale_detail.employee }}</td>
                            <td>{{ sale_detail.client }}</td>
                            <td>{{ sale_detail.article }}</td>
                            <td>{{ sale_detail.stock }}</td>
                            <td>{{ sale_detail.price }}</td>
                            <td>
                                <RouterLink :to="{path: '/sale_details/id/'+ sale_detail.id +'/edit' }" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <button class="btn btn-danger" @click="deleteSale_Details(sale_detail.id)">
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
    import {Icon} from '@iconify/vue'
    import { RouterLink } from 'vue-router';
    import '../assets/searchBar.css';
    export default{
        name:'Sales_DetailsView',
        components:{Icon},
        data(){
            return{
                sale_details:[],
            }
        },
        mounted(){
            this.getSales_Details(this.$route.params.id);
        },
        methods:{
            getSales_Details(id){
                axios.get('http://localhost:3000/api/sale_details/id/'+id).then(res=>{
                    console.log(res)
                    this.sale_details = res.data;
                });
            },
            deleteSale_Details(idSale_DetailDelete){
                axios.delete('http://localhost:3000/api/sale_details/'+idSale_DetailDelete).then(res=>{
                    console.log(res);
                    this.getSales_Details(this.$route.params.id);
                })
            },
            getDetailsSaleOrEmpleyeeOrClientOrArticle() {
            const sale_detailSearching = document.getElementById('searchSale_Details').value;
            if (!isNaN(sale_detailSearching)) {
                // Es un ID
                axios.get(`http://localhost:3000/api/sale_details/id/${sale_detailSearching}`).then(res => {
                    this.sale_details = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else if (sale_detailSearching) {
                // Es un nombre
                axios.get(`http://localhost:3000/api/sale_details/name/${sale_detailSearching}`).then(res => {
                    this.sale_details = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else {
                this.getSale_Details(); // Para restablecer la lista si no se ingresa ningún valor de búsqueda
            }
        }
    }
}

</script>