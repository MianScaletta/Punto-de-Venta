<template>
<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card titleCard" style="border-radius: 1rem;">
          <div class="card-body p-5">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="title text-uppercase">Sign up</h2>
              <p class="subtitle mb-5">Please enter your login and password!</p>

              <div v-if="message==1" class="alert alert-primary" role="alert">
                Registered User Successfully!
              </div>

              <div data-mdb-input-init class="form-outline form-white mb-4">
                <label class="form-label subtitle" for="typeEmailX">Email</label>
                <input placeholder="Enter your email" v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg inputDesign" />
              </div>

              <div data-mdb-input-init class="form-outline form-white mb-4">
                <label class="form-label subtitle" for="typePasswordX">Password</label>
                <input placeholder="Enter your password" v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg inputDesign" />
              </div>

              <button @click.prevent="login()" class="btnDesign" type="submit">Confirm</button>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import '../assets/base.css'
  export default{
    name: "LoginView",
    data(){
      return{
        email:'',
        password:'',
        message:0
      }
    },
    methods:{
      login(){
        createUserWithEmailAndPassword(getAuth(),this.email,this.password).then((data)=>{
          this.message=1;
          this.email='';
          this.password='';
        })
        .catch((error)=>{
          alert(error.message)
        })
      },
    }
  }
</script>