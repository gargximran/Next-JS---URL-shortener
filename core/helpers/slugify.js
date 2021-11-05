import {nanoid} from "nanoid";

export default function (model) {
    return new Promise(async (resolve, reject) => {
        try {
            let exists = true;
            let slug = nanoid();
            while (exists) {
                let doc = await model.findOne({slug: slug});
                if (doc) {
                    slug = nanoid();
                } else {
                    exists = false;
                }
            }

            resolve(slug)
        } catch (e) {
            reject(e)
        }

    })


}