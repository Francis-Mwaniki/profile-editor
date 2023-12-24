import React from 'react';
import { Input } from '../ui/input';

type ColorPickerProps = {
  selectedColor: string;
  onColorChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <div className="mt-4">
      <label htmlFor="colorPicker" className="mr-2">
        Select Border Color:
      </label>
      <Input
        type="color"
        id="colorPicker"
        value={selectedColor}
        onChange={handleColorChange}
        className="rounded"
      />
    </div>
  );
};

export default ColorPicker;
