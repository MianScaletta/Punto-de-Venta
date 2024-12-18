<template>
    <div class="container">
        <div class="container-search">
            <input class="search" type="search" name="searchClient" id="searchClient" placeholder="Search">
            <button @click="getClientsNameOrId()" class="btn btnSearch"><Icon icon="gravity-ui:magnifier" width="1.2em" height="1.2em"  style="color: white" /></button>
        </div>
        <div class="card">
            <div class="card-header">
                <h4>Clients
                <RouterLink to="/clients/create" class="btn btn-primary float-end">Add</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class=" table table-bordered table-striped">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>RFC</th>
                        <th>Curp</th>
                        <th>Cp</th>
                        <th>Actions</th>
                    </thead>
                    <tbody v-if="clients.length > 0">
                        <tr v-for="(client,index) in clients" :key="index">
                            <td>{{ client.id }}</td>
                            <td>{{ client.name }}</td>
                            <td>{{ client.lastname }}</td>
                            <td>{{ client.address }}</td>
                            <td>{{ client.phone }}</td>
                            <td>{{ client.rfc }}</td>
                            <td>{{ client.curp }}</td>
                            <td>{{ client.cp }}</td>
                            <td>
                                <RouterLink :to="{path: '/clients/id/'+ client.id +'/edit' }" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <button class="btn btn-danger" @click="deleteClients(client.id)">
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
        name:'ClientsView',
        components:{Icon},
        data(){
            return{
                clients:[],
            }
        },
        mounted(){
            this.getClients();
        },
        methods:{
            getClients(){
                axios.get('http://localhost:3000/api/clients').then(res=>{
                    console.log(res)
                    this.clients = res.data;
                });
            },
            deleteClients(idClientDelete){
                axios.delete('http://localhost:3000/api/clients/'+idClientDelete).then(res=>{
                    console.log(res);
                    this.getClients();
                })
            },
            getClientsNameOrId() {
            const clientSearching = document.getElementById('searchClient').value;
            if (!isNaN(clientSearching)) {
                // Es un ID
                axios.get(`http://localhost:3000/api/clients/id/${clientSearching}`).then(res => {
                    this.clients = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else if (clientSearching) {
                // Es un nombre
                axios.get(`http://localhost:3000/api/clients/name/${clientSearching}`).then(res => {
                    this.clients = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else {
                this.getClients(); // Para restablecer la lista si no se ingresa ningún valor de búsqueda
            }
        }
    }
}

</script>