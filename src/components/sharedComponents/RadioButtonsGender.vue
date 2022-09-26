<template>
  <v-card-text>
    <v-radio-group v-model="generation" :disabled="!isDisable" row>
      <template v-slot:label>
        <div>Gender</div>
      </template>
      <v-radio @click="choseGender" color="teal lighten-2" label="Male" value="male"></v-radio>
      <v-radio @click="choseGender" color="teal lighten-2" label="Female" value="female"></v-radio>
    </v-radio-group>
  </v-card-text>
</template>

<script>
export default {
  name: 'RadioButtonsGender',

  data() {
    return {
      generation: null,
      isDisable: false,
    };
  },

  props: {
    gender: {
      type: String,
    },
    isEditing: {
      type: Boolean,
    },
  },

  watch: {
    isEditing() {
      this.isDisable = this.isEditing;
    },

    gender() {
      this.generation = this.gender;
    },
  },

  methods: {
    choseGender() {
      this.$emit('choseGender', this.generation);
    },
  },
};
</script>
