<template>
  <div>
    <v-layout wrap class="filtro" justify-center>
      <h1 class="Title">Ingredients</h1>
      <v-flex xs8 class="d-none">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search you Drink"
          aria-label="Search"
          v-model="palabra"
        >
      </v-flex>
      <v-flex xs3 class="d-none">
        <v-btn @click="filterItems()" color="success">
          <v-icon>fas fa-angle-right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout wrap class="resultados">
      <v-flex xs2 v-for="(item, index) in ingredients['0']" :key="index" v-if="!filtro">
        <router-link :to="{name:'indredient',params:{id:item.strIngredient1}}">
          <figure>
            <img
              :src="'https://www.thecocktaildb.com/images/ingredients/'+item.strIngredient1+'.png'"
            >
            <figcaption class="white--text text-xs-center">{{item.strIngredient1}}</figcaption>
          </figure>
        </router-link>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      ingredients: [],
      filtro: false,
      ingredientsFiltro: [],
      palabra: ""
    };
  },
  methods: {
    buscar() {
      this.ingredients = [];
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.ingredients.push(data.drinks));
      console.log(this.ingredients);
    }
  },
  computed: {},
  created() {
    this.buscar();
  }
};
</script>

<style>
.flex {
  padding: 0%;
}
figure img {
  width: 100%;
}
.filtro input {
  margin: 2% 0;
}
</style>
