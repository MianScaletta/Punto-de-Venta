<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Detail</h4>
                <div v-if="message==1" class=" alert alert-success" role="alert" >
                    Data Updated Succesfully!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onOK()">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.sale_detail.id"/>
                        <ErrorMessage name="id" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Article
                        <Field name="article" id="article" type="number" class="form-control" v-model="model.sale_detail.article"/>
                        <ErrorMessage name="name" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Stock
                        <Field name="stock" id="stock" type="number" class="form-control" v-model="model.sale_detail.stock"/>
                        <ErrorMessage name="lastname" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Price
                        <Field name="price" id="price" type="number" class="form-control" v-model="model.sale_detail.price"/>
                        <ErrorMessage name="department" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        <button type="submit"  class="btn btn-primary">Sent</button>
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
    name: 'Sale_DetailEdit',
    components:{ Field,Form,ErrorMessage },
    data(){
        const validationSchema =toTypedSchema(
            zod.object({
                id: zod.number({message:"Only numbers"}).int(),
                article: zod.number({message:"Only numbers"}).int(),
                stock: zod.number({message:"Only numbers"}).int(),
                price: zod.number({message:"Only numbers"}).int()
            })
        );
        return{
            validationSchema,
            message: 0,
            model:{
                sale_detail:{
                    id:'',
                    article:'',
                    stock:'',
                    price:''
                }
            }
        }
    },
    mounted(){
        this.getSale_Detail(this.$route.params.id);
    },
    methods:{
        getSale_Detail(id){
            axios.get('http://localhost:3000/api/sale_details/ids/' + id).then(res=>{
                //this.model.sale_detail.id  = res.data[0].id; // este es la manera 'manual' de recuperar datos uno por uno por posicion
                //this.model.sale_detail.article  = res.data[1].article; 
                //this.model.sale_detail.stock  = res.data[2].stock; 
                //this.model.sale_detail.price  = res.data[3].price; 
                this.model.sale_detail = res.data[0]; //este copia todo siempre y cuando este en el mismo orden
            });
        },
        onOK(){
            alert('Detail Updated Successfully');
            axios.put('http://localhost:3000/api/sale_details/id/' + this.$route.params.id,this.model.sale_detail).then(res =>{
                if(res.data.affectedRows == 1){
                    this.model.sale_detail = { //Limpiar cuadros de texto al dar click al boton
                        id:'',
                        article:'',
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