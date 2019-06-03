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
.iconoHome {
  animation: shake 2s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

