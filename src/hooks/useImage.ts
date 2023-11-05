import React from "react";

const imageCache = new Map<string, HTMLImageElement>();

export function useImage(imageUrl: string, onImageReady: () => void) : HTMLImageElement | undefined
{
    const [image, setImage] = React.useState<HTMLImageElement|undefined>(imageCache.get(imageUrl));

    React.useEffect(
        () => {
            if(image !== undefined) 
            {
                onImageReady();
                return;
            }

            const imageElem = new window.Image();
            imageElem.src = imageUrl;

            imageElem.onload = () => {
                imageCache.set(imageUrl, imageElem);
                setImage(imageElem);
                onImageReady();
            };

        }, [image, imageUrl, setImage]
    );

    return image;
}