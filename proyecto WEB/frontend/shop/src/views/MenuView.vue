
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/"><img src="../assets/rayo.webp" alt="rayo" style="width: 50px;">Rayo's Shop</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="navbar-brand" to="/clients/login">Sign Up</RouterLink>
                        <RouterLink class="navbar-brand" to="/clients/signIn">Sign In</RouterLink>
                        <RouterLink class="navbar-brand" to="/clients">Clients</RouterLink>
                        <RouterLink class="navbar-brand" to="/employees">Employees</RouterLink>
                        <RouterLink class="navbar-brand" to="/articles">Articles</RouterLink>
                        <RouterLink class="navbar-brand" to="/sales">Sales</RouterLink>
                        <button @click="OutSystem" class="btn btn-primary" v-if="validated==true">Sign Out</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue'

export default{
    name:'MenuView',
    data(){
        return{
            validated: false,
            auth:'',
        }
    },
    mounted(){
        this.auth = getAuth();
        onAuthStateChanged(this.auth,(user)=>{
            if (user) {
                this.validated = true;
            }else{
                this.validated =false;
            }
        })
    },
    methods:{
        OutSystem(){
            signOut(this.auth).then(()=>{
                this.$router.push('/')
            })
        }
    }
}
</script>