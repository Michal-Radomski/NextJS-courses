"use client";

import React from "react";
import Image from "next/image";

import classes from "./image-picker.module.scss";

export default function ImagePicker({ label, name }: { label: string; name: string }): JSX.Element {
  const [pickedImage, setPickedImage] = React.useState<string | null>(null);
  const imageInput = React.useRef<HTMLInputElement | null>(null);

  function handlePickClick(): void {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0] as File;
    // console.log("file:", file);

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader() as FileReader;

    fileReader.onload = (): void => {
      // console.log("fileReader:", fileReader);
      setPickedImage(fileReader?.result as string);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill={true} />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
