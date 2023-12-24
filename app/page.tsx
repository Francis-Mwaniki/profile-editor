"use client";
import React, { useEffect, useState } from 'react';
import ImageCropper from '../components/Base/ImageCropper';
import ColorPicker from '../components/Base/ColorPicker';

const ProfilePicEditor: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [mounting, setMounting] = useState<boolean>(true);



  useEffect(() => {
    setTimeout(() => {
      setMounting(false);
    }
    , 2000);
  }
  , []);
  const handleCropImage = (croppedImage: string) => {
    // Handle the cropped image here
    console.log(croppedImage);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

    {
      mounting ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" animate-spin w-6 h-6">
  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
</svg>
           

          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center my-3">
        <h1 className="text-3xl mb-4 my-5">Profile Picture Editor</h1>
        <ImageCropper onCrop={handleCropImage} />
        
      </div>
      )
    }
    </div>
  );
};

export default ProfilePicEditor;
