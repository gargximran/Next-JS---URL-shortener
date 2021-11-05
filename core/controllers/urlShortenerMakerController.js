import URLDirectoryModel from "../db/models/URLDirectoryModel";
import slugify from "../helpers/slugify";

const urlShortenerMakerController = async (req, res) => {
    const url = req.body.url;

    try{
        const slug = await slugify(URLDirectoryModel);
        const doc = await URLDirectoryModel.create({
            url, slug
        })
        res.send({
            data: doc,
            status: 200,
            message: 'Action done!'
        })
    }catch (e) {
        res.status(500).send()
    }
}

export default urlShortenerMakerController