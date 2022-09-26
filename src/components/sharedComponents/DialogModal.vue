<template>
  <v-dialog v-model="isFlag" width="70%">
    <v-card>
      <v-card-title class="text-h6">{{ title }}</v-card-title>
      <v-card-text data-test="error">{{ content }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="purple" @click="changeStatus">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class DialogModal extends Vue {
  @Prop(Boolean) isFlag: boolean;

  @Prop(String) title: string;

  @Prop(String) content: string;

  changeStatus() {
    this.$emit('onChangeStatus');
  }
}
</script>
