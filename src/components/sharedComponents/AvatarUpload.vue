<template>
  <v-card-text>
    <v-row
      ><v-file-input
        data-test="fileInput"
        color="teal lighten-2"
        :disabled="!isEditing"
        @change="handleImage"
        :label="$t('profile.changeAvatar')"
        prepend-icon="mdi-camera"
        class="px-4"
      ></v-file-input>
      <img v-if="image" class="avatar" :src="image" alt="avatar" />
      <img v-else src="../../../public/images/avatar.png" alt="avatar" class="avatar" />
    </v-row>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from 'vue-property-decorator';

@Component
export default class AvatarUpload extends Vue {
  image: string | undefined = this.avatar;

  @Prop(String) avatar?: string;

  @Prop(Boolean) isEditing: boolean;

  handleImage(file: Blob | File) {
    const reader = new FileReader();

    reader.onload = e => {
      this.image = (e.target as any).result;
      this.handleAvatar();
    };

    reader.readAsDataURL(file);
  }

  @Emit('handleAvatar')
  handleAvatar() {
    return this.image;
  }
}
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
