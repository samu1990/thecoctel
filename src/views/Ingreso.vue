<template>
  <div id="LOGIN">
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 xl4>
        <v-card class="text-xs-center">
          <v-card-text>
            <v-img :src="require('../assets/logo.png')" class="logoPag"></v-img>
            <p class="text-uppercase display-2 font-weight-bold">THE-COCKTAIL</p>
            <p
              class="display-1"
              color="success"
              style="border-bottom: 3px solid;padding-bottom: 2%;"
            >Sign In</p>
          </v-card-text>
          <v-card-text>
            <v-btn block color="error" @click="google()">
              <v-icon left dark>fab fa-google</v-icon>Google
            </v-btn>
            <v-btn block color="info" @click="facebook()" disabled>
              <v-icon left dark>fab fa-facebook-square</v-icon>Facebook
            </v-btn>
          </v-card-text>
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="future">
      <p class="title mb-2 text-uppercase">*Future versions</p>
      <p class>-Login with facebook</p>
      <p class>-Instructions in Spanish and French</p>
    </div>
  </div>
</template>

<script>
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapActions } from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      registro: false
    };
  },
  methods: {
    ...mapMutations(["nuevoUsuario"]),
    ...mapActions(["setUsuario"]),
    google() {
      console.log("google");
      const provider = new firebase.auth.GoogleAuthProvider();
      this.ingresar(provider);
    },
    facebook() {
      console.log("facebook");
      const provider = new firebase.auth.FacebookAuthProvider();
      this.ingresar(provider);
    },
    async ingresar(provider) {
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        this.setUsuario(user);
        console.log("Usuario Guardado BB");

        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style>
.v-card__text {
  padding: 10px;
}
#LOGIN > div {
  padding: 25% 4%;
  padding-bottom: 0;
}
#LOGIN > div > div > div {
  background-color: white;
  border-radius: 10px;
}
#LOGIN .v-btn {
  margin-bottom: 5%;
}
#LOGIN .future {
  padding: 5% 4%;
  color: white;
  text-align: center;
}
</style>
