<template>
  <div class="ingredient">
    <v-container grid-list-md text-xs-center v-for="(ingredient, index) in Arrbebida" :key="index">
      <div class="fijo">
        <v-layout row wrap>
          <v-flex xs4>
            <v-img
              :src="'https://www.thecocktaildb.com/images/ingredients/'+ingredient.ingredients[0].strIngredient+'.png'"
            ></v-img>
          </v-flex>
          <v-flex xs8>
            <div style="display:table-cell;vertical-align:middle;">
              <h1 class="Title" style="margin: 38% 0;">{{ingredient.ingredients[0].strIngredient}}</h1>
            </div>
          </v-flex>
          <v-flex xs12>
            <p
              class="orange--text text-xs-center"
            >Drinks with {{ingredient.ingredients[0].strIngredient}}</p>
          </v-flex>
        </v-layout>
      </div>
      <div class="resultados">
        <v-layout row wrap>
          <v-flex xs12>
            <div>
              <v-layout row wrap>
                <v-flex xs3 v-for="(bebida, index) in ADerivadas[0].drinks" :key="index">
                  <router-link :to="{name:'coctel',params:{id:bebida.idDrink}}">
                    <figure>
                      <v-img :src="bebida.strDrinkThumb"></v-img>
                      <figcaption>{{bebida.strDrink}}</figcaption>
                    </figure>
                  </router-link>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Arrbebida: [],
      ADerivadas: [],
      id: this.$route.params.id
    };
  },
  methods: {
    getBebidas(id) {
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + id;
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.Arrbebida.push(data));
      console.log(this.Arrbebida);
    },
    getDerivadas(id) {
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + id;
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.ADerivadas.push(data));
      console.log(this.ADerivadas);
    }
  },
  created() {
    this.getBebidas(this.id);
    this.getDerivadas(this.id);
  }
};
</script>
<style>
figure {
  color: white;
}
.ingredient .fijo {
  position: fixed;
  width: 100%;
  background-color: black;
  z-index: 1;
  padding-top: 1%;
}

.ingredient .resultados {
  margin: 0 4%;
  padding-top: 41%;
}
.ingredient .container {
  padding: 0;
}
</style>
