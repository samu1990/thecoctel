<template>
  <div class="myfav">
    <h2 class="Title">My Cocktails</h2>
    <v-btn @click="getBebidas()" class="subir" color="success" :disabled="myfav">
      Get cocktails
      <v-icon right>fas fa-hand-pointer</v-icon>
    </v-btn>
    <v-layout wrap class="resultados">
      <v-flex xs6 v-for="(item, index) in mybebida" :key="index">
        <router-link :to="{name:'coctel',params:{id:item['0'].idDrink}}">
          <figure>
            <img :src="item['0'].strDrinkThumb">
            <figcaption class="white--text text-xs-center">{{item['0'].strDrink}}</figcaption>
          </figure>
        </router-link>
      </v-flex>
      <v-flex x6 v-if="!myfav">
        <v-img :src="require('../assets/logo.png')" class="logoPag iconoHome"></v-img>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      mybebida: [],
      myfav: false
    };
  },
  methods: {
    getBebidas() {
      var array = this.usuario.Myfav;
      array.forEach(id => {
        var urlAPI =
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
        fetch(urlAPI)
          .then(data => data.json())
          //.then(data => console.log(data))
          .then(data => this.mybebida.push(data.drinks));
      });
      this.myfav = true;
      console.log(this.mybebida);
    }
  },
  computed: {
    ...mapState(["usuario"])
  },
  created() {
    //this.getBebidas();
  }
};
</script>

<style>
.myfav .flex {
  padding: 4%;
}
.myfav figure img {
  width: 100%;
}
.myfav .subir {
  margin: 2% 27%;
  width: 45%;
}
.myfav
  .theme--light.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat):not(.v-btn--outline) {
  background-color: #9e9e9e !important;
}
.myfav .layout {
  background-color: black;
}
.myfav .logoPag {
  width: 50%;
  margin: 0 25%;
}
.iconoHome {
  animation: shake 1s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
