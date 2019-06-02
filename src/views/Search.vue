<template>
  <div class="search">
    <h1 class="Title">search</h1>
    <v-layout wrap class="filtro" justify-center>
      <v-flex xs8>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search your drink or ingredient"
          aria-label="Search"
          v-model="palabra"
        >
      </v-flex>
      <v-flex xs3>
        <v-btn color="success" @click="buscarAPI()">
          <v-icon>fas fa-angle-right</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs5 v-if="bebidas.length > 0 ||ingredient.length > 0">
        <v-btn
          color="blue-grey"
          class="white--text"
          @click="ingra=false"
          :disabled="bebidas[0]==null"
          :class="ingra?'':'actived'"
        >
          <v-icon left dark>fas fa-cocktail</v-icon>Drinks
        </v-btn>
      </v-flex>
      <v-flex xs5 v-if="bebidas.length > 0 ||ingredient.length > 0">
        <v-btn
          color="blue-grey"
          class="white--text"
          @click="ingra=true"
          :disabled="ingredient[0]==null"
          :class="ingra?'actived':''"
        >
          <v-icon left dark>fas fa-shopping-basket</v-icon>Ingredients
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout wrap class="resultados">
      <v-flex xs4 v-for="(item, index) in bebidas[0]" :key="index" v-if="!ingra">
        <router-link :to="{name:'coctel',params:{id:item.idDrink}}">
          <figure>
            <img :src="item.strDrinkThumb">
            <figcaption class="white--text text-xs-center">{{item.strDrink}}</figcaption>
          </figure>
        </router-link>
      </v-flex>
      <v-flex xs4 v-for="(item, index) in ingredient['0']" :key="index" v-if="ingra">
        <router-link :to="{name:'indredient',params:{id:item.strIngredient}}">
          <figure>
            <img
              :src="'https://www.thecocktaildb.com/images/ingredients/'+item.strIngredient+'.png'"
            >
            <figcaption class="white--text text-xs-center">{{item.strIngredient}}</figcaption>
          </figure>
        </router-link>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      palabra: "",
      bebidas: [],
      ingredient: [],
      ingra: false
    };
  },
  methods: {
    buscarAPI() {
      var arrayB = [];
      var arrayI = [];
      if (this.palabra.length > 1) {
        this.ingra = false;
        fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
            this.palabra
        )
          .then(data => data.json())
          //.then(data => console.log(data));
          .then(data => arrayB.push(data.drinks));
        fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" +
            this.palabra
        )
          .then(data => data.json())
          //.then(data => console.log(data))
          .then(data => arrayI.push(data.ingredients));
        this.bebidas = arrayB;
        this.ingredient = arrayI;
        console.log(this.bebidas);
        console.log(this.ingredient);
      }
    }
  }
};
</script>

<style>
.search .Title {
  margin: 4% 0;
}
.search .filtro input {
  margin: 2% 0;
}
.search figure img {
  width: 100%;
}
.search .actived {
  background-color: blueviolet !important;
}
.search .resultados {
  margin: 2% 3%;
}
.search .resultados .flex {
  padding: 2%;
}
</style>
