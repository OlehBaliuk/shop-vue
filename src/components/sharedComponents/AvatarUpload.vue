<template>
  <v-card-text>
    <v-row
      ><v-file-input
        color="teal lighten-2"
        :disabled="!isDisable"
        @change="handleImage"
        label="Change avatar"
        prepend-icon="mdi-camera"
        class="px-4"
      ></v-file-input>
      <img v-if="image" class="avatar" :src="image" alt="avatar" />
      <img v-else src="../../../public/images/avatar.png" alt="avatar" class="avatar" />
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  name: 'AvatarUpload',
  data() {
    return {
      image: '',
      isDisable: false,
    };
  },

  props: {
    avatar: {
      type: String,
    },
    isEditing: {
      type: Boolean,
    },
  },
  methods: {
    handleImage(selectedImage) {
      this.createBase64Image(selectedImage);
    },

    createBase64Image(file) {
      const reader = new FileReader();

      reader.onload = e => {
        this.image = e.target.result;
        this.$emit('handleAvatar', this.image);
      };

      reader.readAsDataURL(file);
    },
  },

  watch: {
    avatar() {
      this.image = this.avatar;
    },

    isEditing() {
      this.isDisable = this.isEditing;
    },
  },
};
</script>

<style lang="scss" scope>
.avatar {
  display: flex;
  align-self: center;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 1rem;
}
</style>
