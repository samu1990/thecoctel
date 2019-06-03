<template>
  <v-container grid-list-md text-xs-center class="Home">
    <div>
      <h1 class="Title mt-3">Random Drinks</h1>
      <p class="Title" v-if="usuario!=''">Welcome {{usuario.nombre}}</p>
    </div>
    <div>
      <v-layout row wrap>
        <v-flex xs4 md2 v-for="(bebida, index) in bebidas" :key="index">
          <router-link :to="{name:'coctel',params:{id:bebida.drinks[0].idDrink}}">
            <figure>
              <p :class="bebida.drinks[0].strAlcoholic">{{bebida.drinks[0].strAlcoholic}}</p>
              <v-img :src="bebida.drinks[0].strDrinkThumb"></v-img>
              <figcaption>{{bebida.drinks[0].strDrink}}</figcaption>
            </figure>
          </router-link>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      bebidas: []
    };
  },
  methods: {
    getBebidas(context) {
      for (let index = 0; index < 9; index++) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(data => data.json())
          //.then(data => console.log(data))
          .then(data => this.bebidas.push(data));
      }
      console.log(this.bebidas);
    }
  },
  created() {
    this.getBebidas();
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
<style>
.Home figcaption {
  color: white;
}
.Home {
  padding: 0;
}
.Home figure {
  margin: 0;
}
</style>
