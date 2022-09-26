<template>
  <v-card-text>
    <v-radio-group v-model="generation" :disabled="!isEditing" row>
      <template v-slot:label>
        <div>Gender</div>
      </template>
      <v-radio
        @click="$emit('update:gender', generation)"
        data-test="radioButton"
        color="teal lighten-2"
        label="Male"
        value="male"
      ></v-radio>
      <v-radio
        @click="$emit('update:gender', generation)"
        color="teal lighten-2"
        label="Female"
        value="female"
      ></v-radio>
    </v-radio-group>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class RadioButtonsGender extends Vue {
  generation = this.gender;

  @Prop(Boolean) isEditing: boolean;

  @Prop(String) gender?: string;

  changeStatus() {
    this.$emit('onChangeStatus');
  }
}
</script>
