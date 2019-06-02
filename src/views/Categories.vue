<template>
  <div class="Categoria">
    <v-layout wrap class="filtro" justify-center>
      <h1 class="Title">Categories</h1>
      <v-flex xs10>
        <v-combobox background-color="white" v-model="tipo" :items="tipos" @change="buscar(tipo)"></v-combobox>
      </v-flex>
    </v-layout>
    <v-layout wrap class="resultados">
      <v-flex xs6 v-for="(item, index) in bebidas['0']" :key="index">
        <router-link :to="{name:'coctel',params:{id:item.idDrink}}">
          <figure>
            <img :src="item.strDrinkThumb">
            <figcaption class="white--text text-xs-center">{{item.strDrink}}</figcaption>
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
      tipos: [
        "Ordinary Drink",
        "Cocktail",
        "Milk / Float / Shake",
        "Other/Unknown",
        "Cocoa",
        "Shot",
        "Coffee / Tea",
        "Homemade Liqueur",
        "Punch / Party Drink",
        "Beer",
        "Soft Drink / Soda"
      ],
      tipo: "",
      bebidas: []
    };
  },
  methods: {
    buscar(tipo) {
      this.bebidas = [];
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + tipo;
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.bebidas.push(data.drinks));
    }
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
.filtro {
  position: fixed;
  background-color: black;
}
.Categoria .resultados {
  padding-top: 30%;
}
.primary--text {
  color: black !important;
  caret-color: black !important;
}
input {
  text-align: center;
}
</style>
