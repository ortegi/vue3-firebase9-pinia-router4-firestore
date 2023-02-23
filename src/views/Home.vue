<template>
<div>
    <h1>Home</h1>
    <p>{{  userStore.userData?.email }}</p>

    <add-form> </add-form>


    <p v-if="databaseStore.loadingDoc">Loading docs...</p>

    <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%;">
        <a-card 
            v-for="item of databaseStore.documents" 
            :key="item.id" 
            :title="item.short" 
            style="width: 100%">
            <template #extra>
                <a-space>
                    <a-popconfirm
                    title="Are you sure to delete?"
                    ok-text="Sí"
                    cancel-text="No"
                    @confirm="confirm(item.id)"
                    @cancel="cancel"
                    >
                        <a-button
                         danger
                          :loading="databaseStore.loading"
                          :disabled="databaseStore.loading"
                          >Eliminar</a-button>
                    </a-popconfirm>
              
                    <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                </a-space>
            </template>
            <p>{{ item.name }}</p>
        </a-card>
    </a-space>
  

  
</div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore} from '../stores/database'
import { message } from 'ant-design-vue';
import {useRouter} from 'vue-router'

const router = useRouter()

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
databaseStore.getUrls()

const confirm = async (id) =>{
    const error = await databaseStore.deleteUrl(id)
    if(!error) return message.success('Se elimino con exito')
    return message.error(error)
}

const cancel = () =>{
    message.error('not deleted')
}
</script>