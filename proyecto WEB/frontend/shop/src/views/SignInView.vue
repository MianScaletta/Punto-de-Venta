<template>
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card titleCard" style="border-radius: 1rem;">
              <div class="card-body p-5">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="title mb-2 text-uppercase">Sign In</h2>
                  <p class="subtitle mb-5">Please enter your login and password!</p>
    
                  <div v-if="message" class="alert alert-primary" role="alert">
                    {{ message }}
                  </div>
    
                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label subtitle" for="typeEmailX">Email</label>
                    <input placeholder="Enter your email" v-model="email" type="email" id="typeEmailX" class="inputDesign form-control form-control-lg" />
                  </div>
    
                  <div data-mdb-input-init class="form-outline form-white mb-4">
                    <label class="form-label subtitle" for="typePasswordX">Password</label>
                    <input placeholder="Enter your password" v-model="password" type="password" id="typePasswordX" class="inputDesign" />
                  </div>
                  <button @click.prevent="signInGoogle()" class="btnDesign" type="submit"><Icon icon='logos:google-icon'/>Google</button>
                  <button @click.prevent="signIn()" class="btnDesign" type="submit">Sign In</button>
    
                </div>
    
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </template>
    <script>
    import { getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
    import { Icon } from '@iconify/vue'
    import '../assets/base.css'
      export default{
        name: "LoginView",
        components:{Icon},
        data(){
          return{
            email:'',
            password:'',
            message:''
          }
        },
        methods:{
          signIn(){
            signInWithEmailAndPassword(getAuth(),this.email,this.password).then((data)=>{
              this.message='';
              this.email='';
              this.password='';
            })
            .catch((error)=>{
              switch (error.code) {
                case "auth/invalid-email":
                    this.message='Invalid Email!'                    
                    break;
                case "auth/user-not-found":
                    this.message='That User is not valid'                    
                    break;
                case "auth/wrong-password":
                    this.message='That Password is incorrect '                    
                    break;
                default:
                    this.message='Incorrect Email or Password '
                    break;
              }
            })
          },
          signInGoogle(){
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(),provider).then((result)=>{
              this.$router.push('/clients/')

            })
          },
        }
      }
    </script>
