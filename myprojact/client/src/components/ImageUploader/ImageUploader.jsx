import { React } from "react";
import ImageUploading from "react-images-uploading";
import "./ImageUploader.scss";
import closeIcon from "../../asset/close.svg";
import uploadIcon from "../../asset/upload.png";

const ImageUploader = ({ images, setImages }) => {
  const maxNumber = 5; // Max number of images a user can upload

  // Handle image change event
  const onChange = (imageList) => {
    setImages(imageList);
  };

  // Handle image removal
  const onRemove = (index, event) => {
    event.stopPropagation(); // Prevent triggering the upload
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="image-uploader">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          dragProps,
        }) => (
          <div
            className="image-uploader__drop-area"
            {...dragProps}
            onClick={onImageUpload}
          >
            {imageList.length > 0 ? (
              <div className="image-uploader__preview">
                {imageList.map((image, index) => (
                  <div key={index} className="image-uploader__image-item">
                    <img
                      src={image["data_url"]}
                      alt=""
                      className="image-uploader__image"
                    />
                    <img
                      className="image-uploader__remove-btn"
                      src={closeIcon}
                      alt="remove"
                      onClick={(e) => onRemove(index, e)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="image-uploader__content">
                <img
                  className="image-uploader__upload-icon"
                  src={uploadIcon}
                  alt="Upload icon"
                />
                <div className="image-uploader__messages">
                  Drag & drop images here or click to select images. <br />
                  Please upload at least 3 images for outfit recommendations. <br />
                  Total image file size should be under 1MB.
                </div>
              </div>
            )}
            <div className="image-uploader__counter">
              {imageList.length} out of {maxNumber} images uploaded
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
