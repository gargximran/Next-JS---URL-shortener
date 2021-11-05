import withDBConnection from "../../core/middleware/withDBConnection";
import urlShortenerMakerController from "../../core/controllers/urlShortenerMakerController";
import withURLMakeValidators from "../../core/middlewares/withURLMakeValidators";


const handler = (req, res) => {
  switch (req.method){
    case "POST":
      return withURLMakeValidators(withDBConnection(urlShortenerMakerController))(req, res);
    default:
      res.status(404).send()
  }
}



export default handler


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10kb'
    }
  }
}