<template>
  <div class="ingredient white--text text-xs-center">
    <v-layout>
      <v-flex xs4 v-for="(item, index) in Arrbebida" :key="index" style="height:80vh;" class="mt-3">
        <div>
          <p class="text-xs-center title">{{item.strIngredient}}</p>
        </div>
        <div>
          <v-img
            class="pt-2"
            :src="'https://www.thecocktaildb.com/images/ingredients/'+item.strIngredient+'.png'"
          ></v-img>
        </div>
        <div>
          <p>{{item.strType}}</p>
          <p>Drinks: {{ADerivadas[0].length}}</p>
        </div>
      </v-flex>
      <v-flex xs8 class="text-xs-center">
        <p class="mt-2 display-2">Drinks</p>
        <div class="resultado flex-container">
          <div xs6 v-for="(item, index) in ADerivadas[0]" :key="index" class="drink p-1">
            <router-link :to="{name:'coctel',params:{id:item.idDrink}}">
              <figure>
                <v-img :src="item.strDrinkThumb"></v-img>
                <figcaption>{{item.strDrink}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Arrbebida: [],
      ADerivadas: [],
      id: this.$route.params.id,
      nameIng: null
    };
  },
  methods: {
    getBebidas(id) {
      var array = [];
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + id;
      fetch(urlAPi)
        .then(data => data.json())
        .then(function(data) {
          array.push(data.ingredients[0]);
        });
      this.Arrbebida = array;
      console.log(this.Arrbebida);
    },
    getDerivadas(id) {
      var array = [];
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + id;
      fetch(urlAPi)
        .then(data => data.json())
        .then(function(data) {
          array.push(data.drinks);
        });
      this.ADerivadas = array;
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

.ingredient .resultado {
  overflow: auto;
  max-height: 75vh;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2%;
}
.ingredient .resultado .drink {
  width: 50%;
}
</style>
