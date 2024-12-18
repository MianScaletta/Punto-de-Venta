<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Article</h4>
                <div v-if="message==1" class=" alert alert-success" role="alert" >
                    Data Updated Succesfully!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onOK()">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.article.id"/>
                        <ErrorMessage name="id" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Description
                        <Field name="description" id="description" type="text" class="form-control" v-model="model.article.description"/>
                        <ErrorMessage name="description" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Stock
                        <Field name="stock" id="stock" type="number" class="form-control" v-model="model.article.stock"/>
                        <ErrorMessage name="stock" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Price
                        <Field name="price" id="price" type="number" class="form-control" v-model="model.article.price"/>
                        <ErrorMessage name="price" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Sent</button>
                    </div>
                </Form>  
            </div>
        </div>
    </div>
</template>
<script>
import { Field,Form,ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import axios from 'axios';

export default{
    name: 'ArticleCreate',
    components:{ Field,Form,ErrorMessage },
    data(){
        const validationSchema =toTypedSchema(
            zod.object({
                id: zod.number({message:"Only numbers"}).int(),
                description: zod.string().min(1,{message: 'Required Field'}),
                stock: zod.number({message:"Only numbers"}).int(),
                price: zod.number({message:"Only numbers"}).int()
            })
        );
        return{
            validationSchema,
            message: 0,
            model:{
                article:{
                    id:'',
                    description:'',
                    stock:'',
                    price:''
                }
            }
        }
    },
    mounted(){
            this.getArticle(this.$route.params.id);
    },
    methods:{
        getArticle(idArticle){
            axios.get('http://localhost:3000/api/articles/id/' + idArticle).then(res=>{
                // this.model.client.id  = res.data[0].id;  este es la manera 'manual' de recuperar datos uno por uno por posicion
                this.model.article = res.data[0]; //este copia todo siempre y cuando este en el mismo orden
            });
        },
        onOK(){
            alert('Article Updated Successfully');
            axios.put('http://localhost:3000/api/articles/id/' + this.$route.params.id,this.model.article).then(res =>{
                if(res.data.affectedRows == 1){
                    this.model.article = { //Limpiar cuadros de texto al dar click al boton
                        id:'',
                        description:'',
                        stock:'',
                        price:''
                    }
                    this.message = 1;
                }
            });
        }
    }
}
</script>
<style scoped>
    .errorValidation{
        color: red;
        font-weight: bold;
    }
</style>