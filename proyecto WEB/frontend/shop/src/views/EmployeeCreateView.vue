<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Employee</h4>
                <div v-if="message==1" class=" alert alert-success" role="alert" >
                    Data Save Succesfully!
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
    methods:{
        onOK(){
            alert('Employee Added Successfully');
            axios.post('http://localhost:3000/api/employees',this.model.employee).then(res =>{
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