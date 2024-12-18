<template>
    <div class="container">
        <div class="container-search">
            <input class="search" type="search" name="searchEmployee" id="searchEmployee" placeholder="Search">
            <button @click="getEmployeesNameOrId()" class="btn btnSearch"><Icon icon="gravity-ui:magnifier" width="1.2em" height="1.2em"  style="color: white" /></button>
        </div>
        <div class="card">
            <div class="card-header">
                <h4>Employees
                <RouterLink to="/employees/create" class="btn btn-primary float-end">Add</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class=" table table-bordered table-striped">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </thead>
                    <tbody v-if="employees.length > 0">
                        <tr v-for="(employee,index) in employees" :key="index">
                            <td>{{ employee.id }}</td>
                            <td>{{ employee.name }}</td>
                            <td>{{ employee.lastname }}</td>
                            <td>{{ employee.department }}</td>
                            <td>
                                <RouterLink :to="{path: '/employees/id/'+ employee.id +'/edit' }" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <button class="btn btn-danger" @click="deleteEmployees(employee.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" style="text-align: center;">Sin registros!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Icon} from '@iconify/vue';
    import { RouterLink } from 'vue-router';
    import '../assets/searchBar.css';
    export default{
        name:'EmployeeView',
        components:{Icon},
        data(){
            return{
                employees:[],
            }
        },
        mounted(){
            this.getEmployees();
        },
        methods:{
            getEmployees(){
                axios.get('http://localhost:3000/api/employees').then(res=>{
                    console.log(res)
                    this.employees = res.data;
                });
            },
            deleteEmployees(idEmployeeDelete){
                axios.delete('http://localhost:3000/api/employees/'+idEmployeeDelete).then(res=>{
                    console.log(res);
                    this.getEmployees();
                })
            },
            getEmployeesNameOrId() {
            const employeeSearching = document.getElementById('searchEmployee').value;
            if (!isNaN(employeeSearching)) {
                // Es un ID
                axios.get(`http://localhost:3000/api/employees/id/${employeeSearching}`).then(res => {
                    this.employees = res.data;
                }).catch(err => {
                    console.error(err);
                });
            } else if (employeeSearching) {
                // Es un nombre
                axios.get(`http://localhost:3000/api/employees/name/${employeeSearching}`).then(res => {
                    this.employees = res.data;
                }).catch(err => {
                    console.error(err);
                });
            }
             else {
                this.getEmployees(); // Para restablecer la lista si no se ingresa ningún valor de búsqueda
            }
        }
    }
}
</script>
