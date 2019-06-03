<template>
  <div>
    <v-layout wrap class="filtro" justify-center>
      <h1 class="Title">Drinks</h1>
      <v-flex xs10>
        <v-combobox background-color="white" v-model="tipo" :items="tipos" @change="buscar(tipo)"></v-combobox>
      </v-flex>
      <v-flex xs8>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search you Drink"
          aria-label="Search"
          v-model="palabra"
          v-if="tipo!=''"
        >
      </v-flex>
      <v-flex xs3>
        <v-btn @click="filterItems(bebidasFiltro)" v-if="tipo!=''" color="success">
          <v-icon>fas fa-angle-right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout wrap class="resultados">
      <v-flex xs4 v-for="(item, index) in bebidasFiltro" :key="index" v-if="!filtrar">
        <router-link :to="{name:'coctel',params:{id:item.idDrink}}">
          <figure>
            <img :src="item.strDrinkThumb">
            <figcaption class="white--text text-xs-center">{{item.strDrink}}</figcaption>
          </figure>
        </router-link>
      </v-flex>
      <v-flex xs4 v-for="(item, index) in bebidas['0']" :key="index" v-if="filtrar">
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
      tipos: ["Alcoholic", "Non alcoholic", "Optional alcohol"],
      tipo: "",
      bebidas: [],
      bebidasFiltro: [],
      palabra: "",
      filtrar: true
    };
  },
  methods: {
    buscar(tipo) {
      this.bebidas = [];
      this.filtrar = true;
      this.palabra = "";
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + tipo;
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.bebidas.push(data.drinks));
    },
    filterItems(bebidasFiltro) {
      if (this.palabra.length > 1) {
        var bb = [];
        this.filtrar = false;
        var tipo = this.tipo;
        var urlAPi =
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          this.palabra;
        fetch(urlAPi)
          .then(data => data.json())
          .then(function(data) {
            for (let h = 0; h < data.drinks.length; h++) {
              var element = data.drinks[h];
              if (element.strAlcoholic == tipo) {
                bb.push(element);
              }
            }
          });
      }
      this.bebidasFiltro = bb;
      console.log(this.bebidasFiltro);
    }
  },
  mutations: {
    setHeroes(state, payload) {
      state.bebidasFiltro = payload;
    }
  },
  created() {}
};
</script>

<style>
.flex {
  padding: 4%;
}
figure img {
  width: 100%;
}
.filtro .flex {
  padding: 0%;
}
.filtro input {
  margin: 2% 0;
}
.layout.resultados.wrap {
  padding-top: 43%;
}
.filtro .fijo {
  position: fixed;
  width: 100%;
  background-color: black;
  z-index: 1;
  padding-top: 1%;
}

.filtro .resultados {
  margin: 0 4%;
  padding-top: 45%;
}
</style>
