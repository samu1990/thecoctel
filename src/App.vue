<template>
  <v-app>
    <Navbar v-if="usuario!=''"></Navbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  components: {
    Navbar
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
<style>
a {
  color: black !important;
  text-decoration: none;
}
p {
  margin: 0;
}
.logoPag {
  width: 100px;
  margin: 0 35%;
}
main.v-content {
  background-color: black;
}
.Title {
  text-align: center;
  color: white;
  margin: 1% 0;
  text-transform: uppercase;
  width: 100%;
}
.Alcoholic {
  color: red;
}
.Optional.alcohol {
  color: #2196f3;
}
.Non.alcoholic {
  color: green;
}
</style>

