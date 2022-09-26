<template>
  <v-dialog v-model="isFlagDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5 justify-center">{{ title }}</v-card-title>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="green darken-1" text @click="resolvePromise(false)">Disagree</v-btn>
        <v-btn color="green darken-1" text @click="resolvePromise(true)">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { IShowProps } from '../interfaces/interfaces';

@Component
export default class DialogAreYouSure extends Vue {
  title: null | string = null;

  resolvePromise: null | object = null;

  @Prop(Boolean) isDialog: boolean;

  show(opts = {} as IShowProps) {
    this.title = opts.title;

    return new Promise(resolve => {
      this.resolvePromise = resolve;
    });
  }

  get isFlagDialog(): boolean {
    return this.isDialog;
  }
}
</script>
