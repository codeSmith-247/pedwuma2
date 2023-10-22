

import { addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getExtension } from "../utils/Fixers";
import { categoryExists } from "../reads/Categories";
import refs from "../refs";

export const newCategory = async (categoryInputs) => {

    try {

        const exists = await categoryExists(categoryInputs.category);

        if(exists) return "exists";

        const rootStorage = getStorage();

        const categoryImageRef = ref(rootStorage, `categories/${categoryInputs.category}.${getExtension(categoryInputs.categoryImage)}`);

        const imageUpload = await uploadBytes(categoryImageRef, categoryInputs.categoryImage);

        const categoryImage = await getDownloadURL(imageUpload.ref);


        console.log(categoryImage);
        
        return "success";


        const result = await addDoc(refs.categories, {
            "Category Name": categoryInputs.category,
            "Desc": categoryInputs.description,
            "Pic": categoryImage,
            "Service Provided": categoryInputs.services
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }

}