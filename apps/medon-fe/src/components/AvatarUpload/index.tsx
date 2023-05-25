import { ChangeEvent, useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import { t } from 'i18next';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { toast } from 'react-toastify';

import { useUpdatePhotoMutation } from 'redux/api/userApi';
import { toastConfig } from 'utils/toastConfig';
import {
  MAX_FILE_SIZE,
  fileTypes,
  imageQuality,
  imgFileType,
} from 'utils/constants/file';
import {
  Input,
  Label,
  LabelContainer,
  LoaderBox,
  StyledEditIcon,
} from './styled';

export default function AvatarUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropper, setCropper] = useState<Cropper | null>(null);
  const [updatePhoto, { isLoading }] = useUpdatePhotoMutation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (!file) {
        toast.error(t('avatar.errors.noFile'), toastConfig);

        return;
      }
      if (!imgFileType.includes(file.type)) {
        toast.error(t('avatar.errors.type'), toastConfig);

        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(t('avatar.errors.size'), toastConfig);

        return;
      }

      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (cropper && selectedImage) {
      const file = await fetch(
        cropper.getCroppedCanvas().toDataURL(selectedImage.type, imageQuality)
      )
        .then((res) => res.blob())
        .then(
          (blob) =>
            new File([blob], selectedImage.name, {
              type: selectedImage.type,
            })
        );

      if (file) {
        const formData = new FormData();

        formData.append('file', file);
        try {
          await updatePhoto(formData).unwrap();
          setSelectedImage(null);
          toast.success(t('avatar.success'), toastConfig);
        } catch (error) {
          toast.error(t('avatar.errors.catchError'), toastConfig);
        }
      }
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedImage) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [selectedImage]);

  return (
    <LabelContainer>
      <Label htmlFor="avatar">
        <StyledEditIcon />
      </Label>
      <Input
        type="file"
        name="avatar"
        id="avatar"
        accept={fileTypes}
        onChange={handleOnChange}
      />
      {selectedImage && (
        <Modal
          title={t('avatar.modalTitle')}
          centered
          width={550}
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          {isLoading ? (
            <LoaderBox>
              <Spin size="large" />
            </LoaderBox>
          ) : (
            <Cropper
              src={URL.createObjectURL(selectedImage)}
              style={{ height: 500, width: 500 }}
              initialAspectRatio={1}
              aspectRatio={1}
              minCropBoxHeight={100}
              minCropBoxWidth={100}
              guides={false}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          )}
        </Modal>
      )}
    </LabelContainer>
  );
}
