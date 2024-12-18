<template>
    <div class="container">
        <div class="container-search">
            <input class="search" type="search" name="searchSale" id="searchSale" placeholder="Search">
            <button @click="getSalesId()" class="btn btnSearch"><Icon icon="gravity-ui:magnifier" width="1.2em" height="1.2em"  style="color: white" /></button>
        </div>
        <div class="card">
            <div class="card-header">
                <h4>Sales
                <RouterLink to="/sales/create" class="btn btn-primary float-end">Add</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class=" table table-bordered table-striped">
                    <thead>
                        <th>ID</th>
                        <th>Fecha</th>
                    </thead>
                    <tbody v-if="sales.length > 0">
                        <tr v-for="(sale,index) in sales" :key="index">
                            <td>{{ sale.id }}</td>
                            <td>{{ sale.sale_date }}</td>              
                            <td>
                                <RouterLink :to="{path: '/sales/id/'+ sale.id +'/edit' }" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <RouterLink :to="{path: '/sales_details/id/'+ sale.id +'/details' }" class="btn btn-success">
                                    Detalles
                                </RouterLink>
                                <button class="btn btn-danger" @click="deleteSales(client.id)">
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
        name:'SalesView',
        components:{Icon},
        data(){
            return{
                sales:[],
            }
        },
        mounted(){
            this.getSales();
        },
        methods:{
            getSales(){
                axios.get('http://localhost:3000/api/sales').then(res=>{
                    console.log(res)
                    this.sales = res.data;
                });
            },
            deleteSales(id){
                axios.delete('http://localhost:3000/api/sales/'+id).then(res=>{
                    console.log(res);
                    this.getSales();
                })
            },
            getSalesId() {
            const saleSearching = document.getElementById('searchSale').value;
            if (!isNaN(saleSearching)) {
                // Es un ID
                axios.get(`http://localhost:3000/api/sales/id/${saleSearching}`).then(res => {
                    this.sales = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else if (saleSearching) {
                // Es un nombre
                axios.get(`http://localhost:3000/api/clients/name/${saleSearching}`).then(res => {
                    this.sales = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else {
                this.getSales(); // Para restablecer la lista si no se ingresa ningún valor de búsqueda
            }
        }
    }
}

</script>