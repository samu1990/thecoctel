<template>
  <div>
    <h1 class="Title" v-if="id == 'random'">RandomMixer</h1>
    <v-btn absolute dark fab top right color="pink" @click="getBebidasRandom()">
      <v-icon>fa fa-dice</v-icon>
    </v-btn>
    <v-layout row wrap v-for="(bebida, index) in bebidas" :key="index" class="Ficha">
      <v-flex xs12 class="img">
        <v-img :src="bebida.drinks[0].strDrinkThumb"></v-img>
      </v-flex>
      <v-flex xs10>
        <p
          class="text-black font-weight-bold title"
          style="line-height: 2 !important;"
        >{{bebida.drinks[0].strDrink}}</p>
      </v-flex>
      <v-flex xs2>
        <v-icon
          large
          @click="like(bebida.drinks[0].idDrink)"
          :color="usuario.Myfav.includes(bebida.drinks[0].idDrink) ? 'red':''"
        >fas fa-heart</v-icon>
      </v-flex>
      <v-flex xs12>
        <p
          class="title red--text text-uppercase"
          v-if="bebida.drinks[0].strAlcoholic=='Alcoholic'"
        >{{bebida.drinks[0].strAlcoholic}}</p>
        <p
          class="title green--text text-uppercase"
          v-if="bebida.drinks[0].strAlcoholic=='Non alcoholic'"
        >{{bebida.drinks[0].strAlcoholic}}</p>
        <p
          class="title blue--text text-uppercase"
          v-if="bebida.drinks[0].strAlcoholic=='Optional alcohol'"
        >{{bebida.drinks[0].strAlcoholic}}</p>
      </v-flex>
      <v-flex xs12>
        <p class="grey--text title">Instructions</p>
        <p class="texto">{{bebida.drinks[0].strInstructions}}</p>
      </v-flex>
      <v-flex xs12 class="ingredient">
        <p class="grey--text title">Ingredients</p>
        <table>
          <tbody>
            <tr
              v-for="(item, index) in ingre"
              :key="index"
              v-if="bebida.drinks[0]['strIngredient' + (index+1)]!='' 
              && bebida.drinks[0]['strIngredient' + (index+1)]!=null
              && bebida.drinks[0]['strIngredient' + (index+1)]!=' '"
            >
              <td>
                <router-link
                  :to="{name:'indredient',params:{id:bebida.drinks[0]['strIngredient' + (index+1)]}}"
                >
                  <img
                    :src="'https://www.thecocktaildb.com/images/ingredients/'+bebida.drinks[0]['strIngredient' + (index+1)]+'.png'"
                  >
                </router-link>
              </td>
              <td class="name">
                <p>{{bebida.drinks[0]['strIngredient' + (index+1)]}}</p>
              </td>
              <td>
                <p class="text-xs-right">{{bebida.drinks[0]['strMeasure' + (index+1)]}}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-for="(bebida, index) in bebidasRandom" :key="index" class="Ficha">
      <v-flex xs12 class="img">
        <v-img :src="bebida.drinks[0].strDrinkThumb"></v-img>
      </v-flex>
      <v-flex xs10>
        <p
          class="text-black font-weight-bold title"
          style="line-height: 2 !important;"
        >{{bebida.drinks[0].strDrink}}</p>
      </v-flex>
      <v-flex xs2>
        <v-icon
          large
          @click="like(bebida.drinks[0].idDrink)"
          :color="usuario.Myfav.includes(bebida.drinks[0].idDrink) ? 'red':''"
        >fas fa-heart</v-icon>
      </v-flex>
      <v-flex xs12>
        <p
          class="title red--text text-uppercase"
          v-if="bebida.drinks[0].strAlcoholic=='Alcoholic'"
        >{{bebida.drinks[0].strAlcoholic}}</p>
        <p
          class="title green--text text-uppercase"
          v-if="bebida.drinks[0].strAlcoholic=='Non alcoholic'"
        >{{bebida.drinks[0].strAlcoholic}}</p>
        <p
          class="title blue--text text-uppercase"
          v-if="bebida.drinks[0].strAlcoholic=='Optional alcohol'"
        >{{bebida.drinks[0].strAlcoholic}}</p>
      </v-flex>
      <v-flex xs12>
        <p class="grey--text title">Instructions</p>
        <p class="texto">{{bebida.drinks[0].strInstructions}}</p>
      </v-flex>
      <v-flex xs12 class="ingredient">
        <p class="grey--text title">Ingredients</p>
        <table>
          <tbody>
            <tr
              v-for="(item, index) in ingre"
              :key="index"
              v-if="bebida.drinks[0]['strIngredient' + (index+1)]!='' 
              && bebida.drinks[0]['strIngredient' + (index+1)]!=null
              && bebida.drinks[0]['strIngredient' + (index+1)]!=' '"
            >
              <td>
                <img
                  :src="'https://www.thecocktaildb.com/images/ingredients/'+bebida.drinks[0]['strIngredient' + (index+1)]+'.png'"
                >
              </td>
              <td class="name">
                <p>{{bebida.drinks[0]['strIngredient' + (index+1)]}}</p>
              </td>
              <td>
                <p class="text-xs-right">{{bebida.drinks[0]['strMeasure' + (index+1)]}}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "@/firebase";

export default {
  data() {
    return {
      bebidas: [],
      ingre: 15,
      faborit: [],
      id: this.$route.params.id,
      bebidasRandom: []
    };
  },
  methods: {
    getBebidas(text) {
      this.bebidasRandom = [];
      var urlAPI =
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + this.id;
      fetch(urlAPI)
        .then(data => data.json())
        //.then(data => console.log(data))
        .then(data => this.bebidas.push(data));
      console.log(this.bebidas);
    },
    like(id) {
      if (!this.usuario.Myfav.includes(id)) {
        this.usuario.Myfav.push(id);
        this.faborit.push(id);
      } else {
        var index = this.usuario.Myfav.indexOf(id);
        this.usuario.Myfav.splice(index, 1);
        var index = this.faborit.indexOf(id);
        this.faborit.splice(index, 1);
      }
      db.collection("usuarios")
        .doc(this.usuario.uid)
        .update({
          Myfav: this.usuario.Myfav
        });
      console.log(this.usuario.Myfav);
    },
    getBebidasRandom() {
      this.bebidas = [];
      this.bebidasRandom = [];
      var urlAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
      fetch(urlAPI)
        .then(data => data.json())
        //.then(data => console.log(data))
        .then(data => this.bebidasRandom.push(data));
      console.log(this.bebidasRandom);
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
.Ficha {
  color: black !important;
  background-color: white;
  margin: 0 2%;
}
.Ficha .flex.img {
  margin: 0;
  padding: 0;
  margin-bottom: 2%;
}
.Ficha .flex {
  margin: 5px 0;
  padding: 0 5%;
}
.Ficha .flex p.texto {
  margin: 0 2%;
  text-align: justify;
}
.ingredient table {
  width: 100%;
  font-size: 115%;
  margin-top: 2%;
}
.ingredient img {
  width: 50px;
}
.ingredient .name {
  width: 50%;
}
.v-btn--top.v-btn--absolute {
  top: 2%;
  right: 6%;
  background-color: #607d8b8f !important;
}
.v-btn--floating.v-btn--absolute {
  z-index: 1;
}
</style>
