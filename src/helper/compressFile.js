import Compress from 'compress.js';

export const compressFile = async (file) => {
    const compress= new Compress()
    const compressedFile = await 
    compress.compress([file], {
        size: 4, 
        quality: .1,
        maxWidth: 10000, 
        maxHeight: 10000, 
        resize: true,
        rotate: false,
    });
    return compressedFile;
}