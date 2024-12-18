<template>
    <div class="container mt-5 firstContainer">
        <div class="card">
            <div class="card-header">
                <h4>Add Sale Detail</h4>
                <div v-if="message==1" class=" alert alert-success" role="alert" >
                    Data Save Succesfully!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onOK()">
                    <div class="mb-3 d-flex justify-content-between">
                        <div class="columLeft">
                            Id
                            <Field name="id" id="id" type="number" class="form-control border rounded" v-model="model.sale_detail.id"/>
                            <ErrorMessage name="id" class="errorValidation" />
                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between">
                        <div class="columLeft">
                            Sale
                            <Field name="sale" id="sale" type="number" class="form-control border rounded" v-model="model.sale_detail.sale"/>
                            <ErrorMessage name="sale" class="errorValidation" />
                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between">
                        <div class="columLeft">
                            Employee
                            <Field name="employee" id="employee" type="number" class="form-control border rounded" v-model="model.sale_detail.employee"/>
                            <ErrorMessage name="employee" class="errorValidation" />
                        </div>
                        <div class="columnRight">
                            Name
                            <Field name="idEmployee" id="idEmployee" type="text" class="form-control border rounded" v-model="model.employee.name" readonly/>
                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between">
                        <div class="columLeft">
                            Client
                            <Field name="client" id="client" type="number" class="form-control border rounded" v-model="model.sale_detail.client"/>
                            <ErrorMessage name="client" class="errorValidation" />
                        </div>
                        <div class="columnRight">
                            Name
                            <Field name="idClient" v-model="model.client.name" id="idClient" type="text" class="form-control border rounded"  readonly/>
                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between">
                        <div class="columLeft">
                            Article
                            <Field name="article" id="article" type="number" class="form-control border rounded" v-model="model.sale_detail.article"/>
                            <ErrorMessage name="article" class="errorValidation" />
                        </div>
                        <div class="columnRight">
                            Name
                            <Field name="idArticle" v-model="model.article.description" id="idArticle" type="text" class="form-control border rounded"  readonly/>
                        </div>
                    </div>
                    <div class="mb-3">
                        Stock
                        <Field name="stock" id="stock" type="text" class="form-control border rounded elements" v-model="model.sale_detail.stock"/>
                        <ErrorMessage name="stock" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Price
                        <Field name="price" id="price" type="text" class="form-control border rounded elements" v-model="model.sale_detail.price"/>
                        <ErrorMessage name="price" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Total = ${{total}}
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
    name: 'Sale_DetailsCreate',
    components:{ Field,Form,ErrorMessage },
    data(){
        const validationSchema =toTypedSchema(
            zod.object({
                id: zod.number({message:"Only numbers"}).int(),
                sale: zod.number({message:"Only numbers"}).int(),
                employee: zod.number({message:"Only numbers"}).int(),
                client: zod.number({message:"Only numbers"}).int(),
                article: zod.number({message:"Only numbers"}).int(),
            })
        );
        return{
            validationSchema,
            message: 0,
            model:{
                sale_detail:{
                    id:'',
                    sale:'',
                    employee:'',
                    client:'',
                    article:'',
                    stock:'',
                    price:'',
                },
                employee:{
                    name: ''
                },
                client:{
                    name:''
                },
                article:{
                    description:''
                }
            }
        }
    },
    watch: {
        "model.sale_detail.employee"(newValue){
            axios.get("http://localhost:3000/api/employees/id/"+newValue)
            .then(res => this.model.employee = res.data[0])
        },
        "model.sale_detail.client"(newValue2){
            axios.get("http://localhost:3000/api/clients/id/"+newValue2)
            .then(res => this.model.client = res.data[0])
        },
        "model.sale_detail.article"(newValue3){
            axios.get("http://localhost:3000/api/articles/id/"+newValue3)
            .then(res => this.model.article = res.data[0])
        }
    },
    computed: {
        total() {
            const stock = parseFloat(this.model.sale_detail.stock) || 0;
            const price = parseFloat(this.model.sale_detail.price) || 0;
            return stock * price;
        }
    },
    methods:{
        onOK(){
            alert('Sale Detail Added Successfully');
            axios.post('http://localhost:3000/api/sale_details',this.model.sale_detail).then(res =>{
                if(res.data.affectedRows == 1){
                    this.model.sale_detail = { //Limpiar cuadros de texto al dar click al boton
                        id:'',
                        sale:'',
                        employee:'',
                        client:'',
                        article:'',
                        stock:'',
                        price:'',
                    }
                    this.message = 1;
                }
            });
        },
    }
}
</script>
<style scoped>
    .errorValidation{
        color: red;
        font-weight: bold;
    }
    .columnLeft{
        width: 20%;
    }
    .columnRight{
        width: 40%;
        float: right;
        margin-right: 30%;
    }
    .firstContainer{
        width: 50%;
    }
    .elements{
        width: 20%;
    }
</style>