import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor';
import { Button } from '../ui/button';
import ColorPicker from './ColorPicker';
import { Input } from '../ui/input';
import Image from 'next/image';
import { toast } from "sonner"




type ImageCropperProps = {
  onCrop: (croppedImage: string) => void;
};

const ImageCropper: React.FC<ImageCropperProps> = ({ onCrop }) => {
  const [image, setImage] = useState<File | null>(null);
  const [borderRadius, setBorderRadius] = useState(100); // Adjust border radius as needed
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [selectedColor, setSelectedColor] = React.useState('#1a5fb4');
  const [SelectedRandomColor, setSelectedRandomColor] = React.useState('1a5fb4');
  const [saving, setSaving] = React.useState(false);

  const callToast = () => {
   toast('save change please!')
  }
 /* seleceted color */
  useEffect(() => {
    if (selectedColor) {
     setSelectedColor(selectedColor)
     callToast()
    }
  }, [selectedColor]);

  /* random color */
  useEffect(() => {
    if(selectedColor){
      returnRandomColor()
    }

  }
  , [selectedColor]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const returnRandomColor = () => {
    //format f5c211
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
     setSelectedRandomColor(color);
  }
  const handleSelectedColor = (color: string) => {
    console.log('color', color);
    setSelectedColor(color);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorderRadius(parseInt(e.target.value));
  };

  const handleSave = () => {
    setSaving(true);
    if(!selectedColor){
      setSelectedColor('#1a5fb4')
    }
    if (editorRef.current && image) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas().toDataURL();
      setCroppedPreview(canvasScaled); // Update cropped preview

      onCrop(canvasScaled);
    }
    setTimeout(() => {
      setSaving(false);
    }
    , 2000);
  };

  // const handleClearToDefault = () => {
  //   if (editorRef.current) {
  //     const canvasScaled = editorRef.current.getImageScaledToCanvas().toDataURL();
  //     setCroppedPreview(canvasScaled); // Update cropped preview
  //   }
  // };

  return (
    <div className="flex flex-col items-center">
     
      <Input type="file" accept="image/*" onChange={handleFileChange}
      placeholder='Upload Image' 

       />
      {image && (
        <>
          <AvatarEditor
            ref={(ref) => (editorRef.current = ref)}
            image={image}
            width={250}
            height={250}
            border={50}
            borderRadius={borderRadius}
            color={[255, 255, 255, 0.6]} // RGBA color for the crop area overlay
            scale={1.2} // Adjust as needed
            className="mt-4"
           
            
          />
             <ColorPicker selectedColor={selectedColor} onColorChange={handleSelectedColor} />
          <label htmlFor="borderRadius" className="mr-2">
            Border Radius:
          </label>
          <Input
            type="range"
            min="0"
            max="999"
            style={{
              width: '100%',
              height: '15px',
              borderRadius: '4px',
              background: selectedColor,
            
              outline: 'none', // Remove default outline
              opacity: '0.7', // Set opacity
              transition: 'opacity .2s ease-in-out', // Add animation

            }}
            value={borderRadius}
            onChange={handleColorChange}
            className="mt-2"
          />
          <button onClick={handleSave} className="
          mt-4 px-9 py-3 text-sm font-medium leading-5  transition-colors duration-150 border border-transparent rounded-lg   focus:outline-none focus:shadow-outline-blue
           flex justify-center items-center justify-self-center mx-auto flex-row w-full
          "
          style={{backgroundColor:`${selectedColor}`,
          color:'#fff'
        }}
          
          >
            
           
            <span 
            style={{
              color:`${SelectedRandomColor}`
            }}
            >
           {
              saving ? 'Saving' : 'Save'
           }
            </span>
        {
          !saving && (
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
          </svg>
          )
       

        }

        {
          saving && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" animate-spin w-6 h-6">
  <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
</svg>

          )
        }

          </button>
        </>
      )}

      

   <div className={`bg-[${selectedColor}]`}>
{croppedPreview && (
        <div className="mt-4">
          
          {/* border color of cropped image */}
          
          <div
           
          >
          
            <Image src={croppedPreview}
            width={250}
            height={250}
            className={`rounded-[${borderRadius}px]
             
            `}
            style={{
              border: `9px solid ${selectedColor}`, // Apply border color dynamically
              display: 'inline-block'
             
            }}
         
            
           alt="Cropped Image Preview" />

          </div>
         
        </div>
      )}
      </div>
    </div>
  );
};

export default ImageCropper;
