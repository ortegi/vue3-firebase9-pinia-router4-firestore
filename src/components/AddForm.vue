
<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database'
import { message } from 'ant-design-vue';
const databaseStore = useDatabaseStore()

const formState = reactive({
    url: ''
})

const onFinish = async (value) => {
    console.log('todo correcto' + value)
   const error = await databaseStore.addUrl(formState.url)
   if(!error){
    formState.url = ''
    return message.success('Url agregada')
    
   }

   switch(error){
    default:
        message.error('Ocurrio un error en el servidor, try later');
        break
   }
}
</script>



<template>
   <a-form
    name="addform"
    autocomplete="off"
    layout="vertical"
    :model="formState"
    @finish="onFinish"
   >

    <a-form-item
        name="url"
        label="Ingrese una URL"
        :rules="[{
            required: true,
            whitespace : true,
            message: 'Ingrese Url válida',
            pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
        }]"
        >
        <a-input v-model:value="formState.url"> </a-input>
    </a-form-item>
    
    <a-form-item>
        <a-button
        type="primary"
        html-type="submit"
        :disabledO="databaseStore.loading"
        :loading="databaseStore.loading"
        > Agregar Url </a-button>
    </a-form-item>
   </a-form>
</template>

