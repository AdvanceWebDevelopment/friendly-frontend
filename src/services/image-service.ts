import axios from "axios";
import { IMAGE_HOST } from "../constants";

export const imageService = {
    async uploadImage(imageFile: File): Promise<string> {
        const formData = new FormData();

        formData.append("file", imageFile);
        formData.append("upload_preset", "DoranHouse");

        const response = await axios.post(IMAGE_HOST, formData);

        return response?.data?.secure_url;
    },
    async uploadImages(imageFiles: File[]): Promise<string[]> {
        const imageUrls: string[] = [];

        for (const imageFile of imageFiles) {
            const url = await imageService.uploadImage(imageFile);
            imageUrls.push(url);
        }

        return imageUrls;
    },
};
