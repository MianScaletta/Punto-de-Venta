<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Client</h4>
                <div v-if="message==1" class=" alert alert-success" role="alert" >
                    Data Save Succesfully!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onOK()">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.client.id"/>
                        <ErrorMessage name="id" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Name
                        <Field name="name" id="name" type="text" class="form-control" v-model="model.client.name"/>
                        <ErrorMessage name="name" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Lastname
                        <Field name="lastname" id="lastname" type="text" class="form-control" v-model="model.client.lastname"/>
                        <ErrorMessage name="lastname" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Address
                        <Field name="address" id="address" type="text" class="form-control" v-model="model.client.address"/>
                        <ErrorMessage name="address" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Phone
                        <Field name="phone" id="phone" type="text" class="form-control" v-model="model.client.phone"/>
                        <ErrorMessage name="phone" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        RFC
                        <Field name="rfc" id="rfc" type="text" class="form-control" v-model="model.client.rfc"/>
                        <ErrorMessage name="rfc" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Curp
                        <Field name="curp" id="curp" type="text" class="form-control" v-model="model.client.curp"/>
                        <ErrorMessage name="curp" class="errorValidation" />
                    </div>  
                    <div class="mb-3">
                        CP
                        <Field name="cp" id="cp" type="text" class="form-control" v-model="model.client.cp"/>
                        <ErrorMessage name="cp" class="errorValidation" />
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
    name: 'ClientsCreate',
    components:{ Field,Form,ErrorMessage },
    data(){
        const phoneRegex= new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const rfcRegex = new RegExp(
            /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i
        );
        const curpRegex = new RegExp(
            /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/g
        );
        const cpRegex = new RegExp(
            /^[0-9]{5}$/
        );
        const validationSchema =toTypedSchema(
            zod.object({
                id: zod.number({message:"Only numbers"}).int(),
                name: zod.string().min(1,{message: 'Required Field'}),
                lastname: zod.string().min(1,{message: 'Required Field'}),
                address: zod.string().min(1,{message: 'Required Field'}),
                phone: zod.string().regex(phoneRegex,'Invalid number').min(10,{message:'Min 10'}),
                rfc: zod.string().regex(rfcRegex,'Invalid rfc'),
                curp: zod.string().regex(curpRegex,'Invalid curp'),
                cp: zod.string().regex(cpRegex,'Invalid cp'),
            })
        );
        return{
            validationSchema,
            message: 0,
            model:{
                client:{
                    id:'',
                    name:'',
                    lastname:'',
                    address:'',
                    phone:'',
                    rfc:'',
                    curp:'',
                    cp:''
                }
            }
        }
    },
    methods:{
        onOK(){
            alert('Client Added Successfully');
            axios.post('http://localhost:3000/api/clients',this.model.client).then(res =>{
                if(res.data.affectedRows == 1){
                    this.model.client = { //Limpiar cuadros de texto al dar click al boton
                        id:'',
                        name:'',
                        lastname:'',
                        address:'',
                        phone:'',
                        rfc:'',
                        curp:'',
                        cp:''
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
</style>