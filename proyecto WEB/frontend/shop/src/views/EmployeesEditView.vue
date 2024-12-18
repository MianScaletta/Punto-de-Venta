<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Employee</h4>
                <div v-if="message==1" class=" alert alert-success" role="alert" >
                    Data Updated Succesfully!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onOK()">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.employee.id"/>
                        <ErrorMessage name="id" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Name
                        <Field name="name" id="name" type="text" class="form-control" v-model="model.employee.name"/>
                        <ErrorMessage name="name" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Lastname
                        <Field name="lastname" id="lastname" type="text" class="form-control" v-model="model.employee.lastname"/>
                        <ErrorMessage name="lastname" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Department
                        <Field name="department" id="department" type="text" class="form-control" v-model="model.employee.department"/>
                        <ErrorMessage name="department" class="errorValidation" />
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
    name: 'EmployeeCreate',
    components:{ Field,Form,ErrorMessage },
    data(){
        const validationSchema =toTypedSchema(
            zod.object({
                id: zod.number({message:"Only numbers"}).int(),
                name: zod.string().min(1,{message: 'Required Field'}),
                lastname: zod.string().min(1,{message: 'Required Field'}),
                department: zod.string().min(1,{message: 'Required Field'})
            })
        );
        return{
            validationSchema,
            message: 0,
            model:{
                employee:{
                    id:'',
                    name:'',
                    lastname:'',
                    department:''
                }
            }
        }
    },
    mounted(){
            this.getEmployee(this.$route.params.id);
    },
    methods:{
        getEmployee(idEmployee){
            axios.get('http://localhost:3000/api/employees/id/' + idEmployee).then(res=>{
                // this.model.client.id  = res.data[0].id;  este es la manera 'manual' de recuperar datos uno por uno por posicion
                this.model.employee = res.data[0]; //este copia todo siempre y cuando este en el mismo orden
            });
        },
        onOK(){
            alert('Employee Updated Successfully');
            axios.put('http://localhost:3000/api/employees/id/' + this.$route.params.id,this.model.employee).then(res =>{
                if(res.data.affectedRows == 1){
                    this.model.employee = { //Limpiar cuadros de texto al dar click al boton
                        id:'',
                        name:'',
                        lastname:'',
                        department:''
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