import { config } from '@/config/config';
import { toast } from 'sonner';


const cloud_name = config.cloudinary_cloud_name
const upload_preset = config.cloudinary_image_preset

export const uploadImageToCloudinary = async (imageFile: File | null | undefined): Promise<string> => {
    
    if (!imageFile) {
        toast.error('No image file provided');
        return '';
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', upload_preset);
    formData.append('cloud_name', cloud_name);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url as string;
        } else {
            toast.error('Image upload failed.');
            return '';
        }
    } catch (error: any) {
        toast.error(`Upload error: ${error.message || 'Something went wrong.'}`, {
            duration: 2000
        });
        return '';
    }
};
