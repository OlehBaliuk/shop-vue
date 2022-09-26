import AvatarUpload from '@/components/sharedComponents/AvatarUpload.vue';
import customWrapper from './utils/utils';

describe('AvatarUpload', () => {
  const event = {
    target: {
      files: [
        {
          name: 'image.png',
          size: 50000,
          type: 'image/png',
        },
      ],
    },
  };

  const image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/';

  const props = {
    avatar: 'avatar',
    isEditing: true,
  };

  const options = {
    propsData: props,
  };

  it('should be render', () => {
    const wrapper = customWrapper(AvatarUpload, options);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call handleImage', () => {
    const wrapper = customWrapper(AvatarUpload);
    const fileReaderSpy = jest
      .spyOn(FileReader.prototype, 'readAsDataURL')
      .mockImplementation(() => null);

    wrapper.vm.handleImage(event);
    expect(fileReaderSpy).toHaveBeenCalledWith(event);
  });

  it('should be call handleAvatar', async () => {
    const wrapper = customWrapper(AvatarUpload);
    wrapper.vm.$emit('handleAvatar', image);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().handleAvatar[0]).toStrictEqual([image]);
  });
});
