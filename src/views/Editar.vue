<template>
    <div>
        <h1>Editar id: {{ route.params.id }} </h1>
    <a-form
    name="editform"
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
            > Editar Url </a-button>
        </a-form-item>
   </a-form>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute} from 'vue-router'
import {useDatabaseStore} from '../stores/database'
import { message } from 'ant-design-vue';

const route = useRoute()
const databaseStore = useDatabaseStore()



onMounted( async()=>{
     formState.url = await databaseStore.leerUrl(route.params.id)
})

const formState = reactive({
    url: ""
})

const onFinish = async (value) => {
    console.log('todo correcto' + value)
   const error = await databaseStore.updateUrl(route.params.id, formState.url)
   if(!error){
    formState.url = ''
    return message.success('Url editada')
    
   }

   switch(error){
    default:
        message.error('Ocurrio un error en el servidor, try later');
        break
   }
}
</script>

