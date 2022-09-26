<template>
  <v-dialog v-model="isFlagDialog" width="70%">
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

<script>
export default {
  name: 'DialogModal',

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
    changeStatus() {
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
