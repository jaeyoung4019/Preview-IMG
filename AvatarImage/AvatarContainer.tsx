import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { errorOccurred } from "../../../../store/slices/errorAlertSlice";
import AvatarView from "./AvatarView";

interface Props {
    setFileHandler: (file: any) => void;
    initImage?: string
    col?: string
}

const AvatarContainer = ({ setFileHandler , initImage , col }: Props) => {

    const [isUserDefaultImage , setIsUserDefaultImage] = useState(initImage != null);
    const initImg = initImage || "/assets/img/common/defualt_avator.png";
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
            setIsUserDefaultImage(false)
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

    return <AvatarView handleChangeFile={handleChangeFile} previewImg={previewImg} isUserDefaultImage={isUserDefaultImage} col={col}/>;
};

export default AvatarContainer;
