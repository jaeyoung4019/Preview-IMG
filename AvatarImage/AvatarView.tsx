import React from "react";

interface Props {
    previewImg: string;
    handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isUserDefaultImage: boolean;
    col?: string | undefined;
}

const AvatarView = ({ previewImg, handleChangeFile , isUserDefaultImage , col}: Props) => {
    return (
        <div className="inp_wrap">
            <div className={`inp_box edit_img ${col || ""}`}>
                <div className="label">Avatar Image</div>
                <div className="inp">
                    <div className="img_box">
                        <img src={isUserDefaultImage ? `${process.env.REACT_APP_REST_RESOURCE_USER_URL}${previewImg}` : previewImg} id="preview" alt="Avatar_img" />
                    </div>
                    <label htmlFor="imgSelector">Edit</label>
                    <input type="file" id="imgSelector" accept="image/*" onChange={handleChangeFile} />
                </div>
            </div>
        </div>
    );
};

export default AvatarView;
