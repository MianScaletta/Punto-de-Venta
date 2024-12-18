<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Sale</h4>
                <div v-if="message==1" class=" alert alert-success" role="alert" >
                    Data Save Succesfully!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.sale.id"/>
                        <ErrorMessage name="id" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        Date
                        <Field name="date" id="date" type="date" class="form-control" v-model="model.sale.sale_date"/>
                        <ErrorMessage name="date" class="errorValidation" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" @click="onOK()" class="btn btn-primary">Sent</button>
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
    name: 'SalesCreate',
    components:{ Field,Form,ErrorMessage },
    data(){
        const validationSchema =toTypedSchema(
            zod.object({
                id: zod.number({message:"Only numbers"}).int(),
                sale_date: zod.string().min(1,{message: 'Required Field'}),
            })
        );
        return{
            validationSchema,
            message: 0,
            model:{
                sale:{
                    id:'',
                    sale_date:'',
                }
            }
        }
    },
    methods:{
    onOK(){        
        // Convertir la fecha al formato ISO 8601
        const saleDateISO = new Date(this.model.sale.sale_date).toISOString();

        // Actualizar el modelo con la fecha en el nuevo formato
        this.model.sale.sale_date = saleDateISO;

        // Realizar la solicitud al servidor
        axios.post('http://localhost:3000/api/sales', this.model.sale)
            .then(res => {
                if (res.data.affectedRows == 1) {
                    console.log(res);
                    // Limpiar cuadros de texto al dar click al boton
                    this.model.sale = {
                        id: '',
                        sale_date: '',
                    }
                    this.message = 1;
                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Manejar errores de solicitud aquí
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