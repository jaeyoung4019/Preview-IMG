# 미리 보기 및 파일 업로드 용

## Container 

```ts
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { errorOccurred } from "../../../../store/slices/errorAlertSlice";
import AvatarView from "./AvatarView";

interface Props {
    setFileHandler: (file: any) => void;
}

const AvatarContainer = ({ setFileHandler }: Props) => {
    const initImg = "/assets/img/common/defualt_avator.png";
    const [previewImg, setPreviewImg] = useState<string>(initImg);
    const maxSize = Number(process.env.REACT_APP_FILE_MAX_SIZE);
    const dispatch = useAppDispatch();

    const transFileValue = (file: any) => {
        let files = Object.values(file);
        if (files.length > 0) return files[0];
        else return null;
    };

    const handleChangeFile = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files != null) {
                const files = event.target.files;
                const uploadFile = transFileValue(files);
                setFileHandler(uploadFile);
                for (let i = 0; i < files.length; i++) {
                    if (files[i].size >= maxSize) {
                        dispatch(
                            errorOccurred({
                                errorCode: "fileSizeOver"
                            })
                        );
                        return false;
                    } else {
                        if (files[i]) {
                            let reader = new FileReader();
                            const fileExtension = files[i].name.split(".").pop();
                            const includeExtensionList = ["png", "jpg", "jpeg", "gif"];
                            if (includeExtensionList.includes(fileExtension as string)) {
                                reader.readAsDataURL(files[i]);
                                reader.onloadend = () => {
                                    const base64 = reader.result;
                                    if (base64) {
                                        let base64Sub = base64.toString();
                                        setPreviewImg(() => base64Sub);
                                    }
                                };
                            } else {
                                setPreviewImg(() => initImg);
                            }
                        }
                    }
                }
            }
        },
        [previewImg]
    );

    return <AvatarView handleChangeFile={handleChangeFile} previewImg={previewImg} />;
};

export default AvatarContainer;
```


```ts
import React from "react";

interface Props {
    previewImg: string;
    handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarView = ({ previewImg, handleChangeFile }: Props) => {
    return (
        <div className="inp_wrap">
            <div className="inp_box edit_img">
                <div className="label">Avatar Image</div>
                <div className="inp">
                    <div className="img_box">
                        <img src={previewImg} id="preview" alt="Avatar_img" />
                    </div>
                    <label htmlFor="imgSelector">Edit</label>
                    <input type="file" id="imgSelector" accept="image/*" onChange={handleChangeFile} />
                </div>
            </div>
        </div>
    );
};

export default AvatarView;
```
