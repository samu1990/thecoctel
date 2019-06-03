<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name:'home'}">
          <span>THE-COCKTAIL</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-tile>
        <router-link :to="{ name: 'search' }">
          <v-icon x-large class="black--text">fas fa-search</v-icon>
        </router-link>
      </v-list-tile>
    </v-toolbar>
    <v-navigation-drawer class="grey lighten-1" v-model="drawer" app>
      <v-layout column align-left pa-3>
        <v-flex>
          <v-avatar>
            <img :src="usuario.foto" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex>
          <p style="margin-top:5%">{{usuario.nombre}}</p>
          <p>{{usuario.email}}</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{item.logo}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-btn @click="cerrarSession()" v-if="usuario!=null" block class="out error">LOG OUT</v-btn>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          title: "Saved Cocktails",
          to: { name: "saved" },
          logo: "fas fa-heart"
        },
        /*
        {
          title: "Drinks ",
          to: { name: "drinks" },
          logo: "fas fa-cocktail"
        },*/
        {
          title: "Category",
          to: { name: "categories" },
          logo: "fas fa-beer"
        },
        /*
        {
          title: "Ingredients ",
          to: { name: "ingredients" },
          logo: "fas fa-shopping-basket"
        },
        {
          title: "Glass",
          to: { name: "admin" },
          logo: "fas fa-glass-whiskey"
        },*/
        { title: "Chat", to: { name: "chat" }, logo: "fas fa-comments" },
        { title: "Admin", to: { name: "admin" }, logo: "fas fa-users-cog" }
      ]
    };
  },
  methods: {
    ...mapActions(["cerrarSession"])
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>

<style>
.v-navigation-drawer .v-btn {
  margin: 3% 5%;
  width: 90%;
  border-radius: 5px;
}
.v-list > div {
  margin: 5%;
  background-color: white;
  border-radius: 20px;
}
a.v-list__tile {
  color: #78909c !important;
  caret-color: #78909c !important;
}
a.primary--text {
  color: black !important;
  caret-color: black !important;
}
</style>
