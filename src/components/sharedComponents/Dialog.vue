<template>
  <v-dialog v-model="isFlagDialog" width="70%">
    <v-card>
      <v-card-title class="text-h6"> {{ title }}</v-card-title>
      <v-card-text>{{ content }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="purple" @click="onChangeStatus"> Ok </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    isFlag: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },

  methods: {
    onChangeStatus() {
      this.$emit('onChangeStatus');
    },
  },

  computed: {
    isFlagDialog: {
      get() {
        return this.isFlag;
      },
      set() {
        this.onChangeStatus();
      },
    },
  },
};
</script>
