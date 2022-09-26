<template>
  <v-footer app class="teal lighten-1" padless height="50">
    <v-card class="flex align-center" flat tile>
      <v-card-title class="teal lighten-1 d-flex justify-center align-center py-0">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  icons: string[] = ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'];
}
</script>
