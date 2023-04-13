import { useState } from 'react';
import { Upload, Avatar } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';
import ChangeProfilePictureSvg from 'assets/ReactComponentAssets/ChangeProfileAvatar';
import { useTheme } from 'styled-components';
import { FILE_STATUS } from 'utils/constants/fileStatus';


export const AvatarUploader = () => {
  const [avatarFile, setAvatarFile] = useState<RcFile | undefined>(undefined);
  const theme = useTheme();

  const handleAvatarChange = (info: UploadChangeParam) => {
    if (info.file.status === FILE_STATUS.DONE) {
      setAvatarFile(info.file.originFileObj);
    }
  };

  return (
    <Upload name="avatar" showUploadList={false} onChange={handleAvatarChange}>
      {avatarFile ? (
        <Avatar size={48} src={URL.createObjectURL(avatarFile)} />
      ) : (
        <Avatar
          style={{ backgroundColor: theme.colors.BACKGROUND_PRIMARY }}
          size={48}
          icon={<ChangeProfilePictureSvg />}
        />
      )}
    </Upload>
  );
};
