import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor';
import { Button } from '../ui/button';
import ColorPicker from './ColorPicker';
import { Input } from '../ui/input';
import Image from 'next/image';
import { toast } from "sonner"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer"




type ImageCropperProps = {
  onCrop: (croppedImage: string) => void;
};

const ImageCropper: React.FC<ImageCropperProps> = ({ onCrop }) => {
  const [image, setImage] = useState<File | null>(null);
  const [borderRadius, setBorderRadius] = useState(999); // Adjust border radius as needed
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [selectedColor, setSelectedColor] = React.useState('#1a5fb4');
  const [SelectedRandomColor, setSelectedRandomColor] = React.useState('1a5fb4');
  const [saving, setSaving] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [saveToLocalStorage, setSaveToLocalStorage] = useState<string | null>(null);
  const [getFromLocalStorage, setGetFromLocalStorage] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const callToast = () => {
   toast('save to see the result!')
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

  useEffect(() => {
    if (saveToLocalStorage) {
      localStorage.setItem('croppedImage', saveToLocalStorage)
    }
  }
  , [saveToLocalStorage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
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
      setDrawerOpen(true);
      setSaving(false);
    }
    , 1000);
  };

  useEffect(() => {
    let getLocalStorage = localStorage.getItem('croppedImage');
    if (getLocalStorage) {
      setGetFromLocalStorage(getLocalStorage)
    }
  }
  , [
    getFromLocalStorage
  ]);

  const DownloadCroppedImage = () => {
    localStorage.removeItem('croppedImage')
     setDownloading(true);
    const link = document.createElement('a');
    link.download = 'cropped-image.png';
    link.href = croppedPreview as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setDownloading(false);
      toast('Image Exported')
      setDrawerOpen(false);
      setSaveToLocalStorage(croppedPreview)
      // setGetFromLocalStorage(croppedPreview)
    }
    , 1000);

  }
  const clearFromLocalStorage = () => {
   setDeleting(true)

    setTimeout(() => {
      setDeleting(false)
      
  
    }
    , 800);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };

    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen]);
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
          {/* <label htmlFor="borderRadius" className="mr-2">
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
          /> */}
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
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
          </svg>
          )
       

        }

        {
          saving && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" animate-spin w-6 h-6">
  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
</svg>

          )
        }

          </button>
        </>
      )}


      <div className="mt-4 flex justify-center items-center mx-auto ">
        {
          getFromLocalStorage && (
            <div className='mt-4 flex justify-center items-center mx-auto  flex-col'>
             <h3 className='text-center text-2xl font-bold'>Saved images</h3>

            <div>
              <Image
                src={getFromLocalStorage}
                width={250}
                height={250}
                className="rounded-full"
                style={{
                  border: `9px solid ${selectedColor}`,
                  display: 'inline-block',
                }}
                alt="Cropped Image Preview"
              />
              {/* clear image from localStorage*/}
              <button
              onClick={() => {
               setDeleting(true)
               setTimeout(()=>{
                setDeleting(false)
                localStorage.removeItem('croppedImage')
               setGetFromLocalStorage(null)
               },1000)
              }}
              className="
          mt-4 px-9 py-3 text-sm font-medium leading-5  transition-colors duration-150 border border-transparent rounded-lg   focus:outline-none focus:shadow-outline-blue
            flex justify-center items-center justify-self-center mx-auto flex-row w-full
              "
              style={{backgroundColor:`${selectedColor}`,
              color:'#fff'
            }}

              >
                <span>

{
  deleting ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-ping">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
        ) :(
        "Clear"
  )

}
            

             


                </span>
                <span>
                  
                  </span>
              </button>

            </div>
            </div>
           
          )


        }

      </div>
      

   <div className={`bg-[${selectedColor}]`}>
   {croppedPreview && (
        <Drawer open={drawerOpen} onClose={closeDrawer} >
          <DrawerContent ref={drawerRef} className='flex justify-center items-center mx-auto' >
            <DrawerHeader className='flex justify-center items-center mx-auto'>
              <DrawerTitle>Cropped Image</DrawerTitle>
              <DrawerClose onClick={() => setDrawerOpen(false)} />
            </DrawerHeader>
            <DrawerDescription>
              <div className="mt-4 flex justify-center items-center mx-auto ">
                <div>
                  <Image
                    src={croppedPreview}
                    width={250}
                    height={250}
                    className="rounded-full"
                    style={{
                      border: `9px solid ${selectedColor}`,
                      display: 'inline-block',
                    }}
                    alt="Cropped Image Preview"
                  />
                </div>
              </div>
            </DrawerDescription>
            {/* export cropped pic */}
            <div className='flex justify-center items-center mx-auto'>
              <button
              onClick={DownloadCroppedImage}
             
              className="
          mt-4 px-9 py-3 text-sm font-medium leading-5  transition-colors duration-150 border border-transparent rounded-lg   focus:outline-none focus:shadow-outline-blue
           flex justify-center gap-x-2 items-center justify-self-center mx-auto flex-row w-full
          "
              style={{backgroundColor:`${selectedColor}`,
              color:'#fff'
            }}
              >
                <span>
                  {
                    downloading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" animate-spin w-6 h-6">
                      <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                    </svg>
                                        ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                    )
                  }
               
                
                </span>
                <span>
                  {
                    downloading ? 'Exporting' : 'Export'
                  }
                  </span>
              </button>
            </div>
            <DrawerFooter>
              {/* Your footer content */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      </div>
    </div>
  );
};

export default ImageCropper;
