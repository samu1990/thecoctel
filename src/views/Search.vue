<template>
  <div class="search">
    <div class="fijo">
      <h1 class="Title" :style="busqueda==true?'margin: 2% 0;':''">search</h1>
      <v-layout wrap justify-center>
        <v-flex xs8>
          <input
            class="form-control mr-sm-2"
            style="margin-top: 2%"
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
      </v-layout>
    </div>
    <v-layout wrap class="resultados">
      <v-flex xs12 v-if="busqueda">
        <v-layout wrap justify-center>
          <v-flex xs4 class="p-2">
            <button
              block
              color="blue-grey"
              class="white--text btnseach"
              @click="divingra=false,divBebida=true,divBebidaN=false"
              :disabled="bebidas.length==0"
              :class="bebidas.length>0?'actived':'desactived'"
            >
              <v-icon class="white--text">fas fa-cocktail</v-icon>
              <p>Drinks</p>
            </button>
          </v-flex>
          <v-flex xs4 class="p-2">
            <button
              block
              color="blue-grey"
              class="white--text btnseach"
              @click="divingra=false,divBebida=false,divBebidaN=true"
              :disabled="bebidasNo.length==0"
              :class="bebidasNo.length>0?'actived':'desactived'"
            >
              <v-icon class="white--text">fas fa-mug-hot</v-icon>
              <p>Non Alcoholic</p>
            </button>
          </v-flex>
          <v-flex xs4 class="p-2">
            <button
              color="blue-grey"
              class="white--text btnseach"
              @click="divingra=true,divBebida=false,divBebidaN=false"
              :disabled="ingredient.length==0"
              :class="ingredient.length>0?'actived':'desactived'"
            >
              <v-icon dark>fas fa-shopping-basket</v-icon>
              <p>Ingredients</p>
            </button>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs4 v-for="(item, index) in bebidas" :key="index" v-if="divBebida">
        <router-link :to="{name:'coctel',params:{id:item.idDrink}}">
          <figure>
            <img :src="item.strDrinkThumb">
            <figcaption class="white--text text-xs-center">{{item.strDrink}}</figcaption>
          </figure>
        </router-link>
      </v-flex>
      <v-flex xs4 v-for="(item, index) in bebidasNo" :key="index" v-if="divBebidaN">
        <router-link :to="{name:'coctel',params:{id:item.idDrink}}">
          <figure>
            <img :src="item.strDrinkThumb">
            <figcaption class="white--text text-xs-center">{{item.strDrink}}</figcaption>
          </figure>
        </router-link>
      </v-flex>
      <v-flex xs4 v-for="(item, index) in ingredient" :key="index" v-if="divingra">
        <router-link :to="{name:'indredient',params:{id:item}}">
          <figure>
            <img :src="'https://www.thecocktaildb.com/images/ingredients/'+item+'.png'">
            <figcaption class="white--text text-xs-center">{{item}}</figcaption>
          </figure>
        </router-link>
      </v-flex>

      <v-flex xs12 v-if="divBebida==false&&divingra==false&& divBebidaN==false && busqueda==true">
        <p class="white--text text-xs-justify m-4 display-1">nº Alcoholic {{bebidas.length}}</p>
        <p class="white--text text-xs-justify m-4 display-1">nº Non Alcoholic {{bebidasNo.length}}</p>
        <p class="white--text text-xs-justify m-4 display-1">nº Ingredients {{ingredient.length}}</p>
      </v-flex>
      <v-flex xs12 v-if="!busqueda">
        <v-img :src="require('../assets/fondo.jpg')"></v-img>
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
      bebidasNo: [],
      divingra: false,
      divBebida: false,
      divBebidaN: false,
      listingredient: [],
      listbebidas: [],
      listbebidasNa: [],
      busqueda: false,
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
      ]
    };
  },
  methods: {
    buscarAPI() {
      var arrayBA = [];
      var arrayBN = [];
      var arrayI = [];
      this.divingra = false;
      this.divBebida = false;
      if (this.palabra.length > 1) {
        arrayBA = this.listbebidas.filter(drink => {
          var name = drink.strDrink.toLowerCase();
          var bpalabra = this.palabra.toLowerCase();
          return name.match(bpalabra);
        });
        arrayI = this.listingredient.filter(drink => {
          var name = drink.toLowerCase();
          var bpalabra = this.palabra.toLowerCase();
          return name.match(bpalabra);
        });
        arrayBN = this.listbebidasNa.filter(drink => {
          var name = drink.strDrink.toLowerCase();
          var bpalabra = this.palabra.toLowerCase();
          return name.match(bpalabra);
        });

        this.bebidas = arrayBA;
        this.ingredient = arrayI;
        this.bebidasNo = arrayBN;
        console.log(this.bebidas);
        console.log(this.bebidasNo);
        console.log(this.ingredient);
        if (arrayBN.length + arrayBA.length + arrayI.length > 0) {
          this.busqueda = true;
        }
      }
    },
    crearArray() {
      //Crear Array Ingrediente
      var arrayI = [];
      fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then(data => data.json())
        //.then(data => console.log(data.drinks));
        .then(function(data) {
          var ing = data.drinks;
          for (let h = 0; h < ing.length; h++) {
            arrayI.push(ing[h].strIngredient1);
          }
        });
      this.listingredient = arrayI;
      //Crear Array Bebida no Alcolica

      var arrayNa = [];
      var arrayNoName = [];
      fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      )
        .then(data => data.json())
        //.then(data => console.log(data.drinks));
        .then(function(data) {
          var ing = data.drinks;
          for (let h = 0; h < ing.length; h++) {
            if (!arrayNa.includes(ing[h])) {
              arrayNa.push(ing[h]);
              arrayNoName.push(ing[h].idDrink);
            }
          }
        });
      this.listbebidasNa = arrayNa;

      var arraya = [];
      this.tipos.forEach(ti => {
        var urlAPI =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + ti;
        fetch(urlAPI)
          .then(data => data.json())
          //.then(data => console.log(data));
          .then(function(data) {
            var ing = data.drinks;
            //console.log(arrayNa);
            for (let h = 0; h < ing.length; h++) {
              if (!arraya.includes(ing[h])) {
                if (!arrayNoName.includes(ing[h].idDrink)) {
                  arraya.push(ing[h]);
                }
              }
            }
          });
      });

      this.listbebidas = arraya;
      // console.log("Inge:", this.listingredient);
      console.log("BebidaAl:", this.listbebidas);
      console.log("BebidaNal:", this.listbebidasNa);
    }
  },
  created() {
    this.crearArray();
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
.search figure {
  margin: 0;
}

.search figure img {
  width: 100%;
}
.search .actived {
  background-color: blueviolet !important;
}
.search .desactived {
  background-color: #c3c3c3;
}
.search .resultados {
  margin: 2% 3%;
}
.search .resultados .flex {
  padding: 2%;
}
.search .btnseach {
  font-size: 14px;
  font-weight: 500;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
  border-radius: 2px;
  width: 100%;
  padding: 5px 0;
}
.search .fijo {
  position: fixed;
  width: 100%;
  background-color: black;
  z-index: 1;
  padding-top: 1%;
}

.search .resultados {
  margin: 0 4%;
  padding-top: 28%;
}
.search .resultados > .xs12.flex {
  padding: 0%;
}
</style>
