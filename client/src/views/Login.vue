<template>
    <v-row no-gutters style="min-width:100vw;min-height:100vh" align="center" justify="center">
        <v-card>
          <v-card-title class="justify-center">
            Insira seu nome para logar {{number2}} {{user}}
          </v-card-title>
          <v-card-text>
            <v-text-field label="Digite seu usuário" variant="outlined" autofocus @keypress.enter="signIn(user)" v-model="user.name"></v-text-field>
            <v-text-field label="Digite seu usuário" v-model="number2"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="signIn(user)" color="primary" block>Logar</v-btn>
          </v-card-actions>
        </v-card>
    </v-row>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { mapMutations, useStore } from 'vuex'

export default {
  props: {
    name: {
      default: ''
    }
  },

  setup() {
    const store = useStore();

    const user = reactive(store.state.user);
    const data = reactive({
      number: 1
    });

    const loading = reactive({
      number2: 1
    });

    const methods = reactive({
      signIn(user) {
        this.setUser(user)
        console.log(this);
      }
    })
    const signIn = reactive((user) => {
      console.log(this)
        // this.setUser(user)
    })

    return  {
      user,
      ...mapMutations({ setUser: 'user' }),
      ...toRefs(data),
      ...toRefs(loading),
      signIn
      // ...toRefs(methods)
    }
  },
}
</script>
