<template>
    <h1 class="text-center">Register</h1>
    <a-row>
        <a-col :xs="{span:24}" :sm="{span:12, offset:6}" >
            <a-form 
            
            :model="formState"
             name="basic" 
             autocomplete="off" 
             layout="vertical" 
             @finish="onFinish"
            @finishFailed="onFinishFailed">
                <a-form-item
                    name="email"
                    label="Type email"
                    :rules="[{required: true, message: 'Ingresa un email valido', whitespace: true, type: 'email'}]"
                >
                    <a-input v-model:value="formState.email"> 

                    </a-input>
                </a-form-item> 

                <a-form-item
                    name="password"
                    label="Type Password"
                    :rules="[{required: true, whitespace: true, min: 6, message: 'Ingrese una contraseña con minimo 6 caracteres'}]"
                >
                    <a-input-password v-model:value="formState.password"> </a-input-password>
                </a-form-item>
               
                <a-form-item
                 label="Repita contraseña" 
                 name="repassword"
                 :rules="[
                    {
                      
                        validator: validatePass
                        
                    }
                    ]">

                    <a-input-password v-model:value="formState.repassword"> </a-input-password>   
                </a-form-item>
                
                <a-form-item>
                    <a-button 
                        type="primary" 
                        html-type="submit"
                        :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser"
                        >Ingresar 
                    </a-button>   
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
   
    
   
   
    </template>
    
<script setup>
import { reactive } from 'vue'
import {useUserStore}  from '../stores/user'
import {useRouter} from 'vue-router'
import { message } from 'ant-design-vue';


const userStore = useUserStore()
const router = useRouter()

const formState = reactive({
    email: "",
    password: "",
    repassword: ""
})


const onFinish = async (values) => {
      console.log('Success:', values);
        const error = await userStore.register(formState.email, formState.password)
        
        if(!error){
            return message.success("Revisa tu correo electronico y verificalo")
        }

        switch(error){
        case 'auth/email-already-in-use':
            message.error('Email ya registrado');
            break;
        default: 
            alert('Error de servidor');
            break
        }
          
        };

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const validatePass = async(rule, value) =>{
    if(value === ''){
        return Promise.reject('Repita contraseña')
    }
    if(value !== formState.password ){
        return Promise.reject('No coinciden las contraseñas')
    }
    return Promise.resolve()
}
</script>