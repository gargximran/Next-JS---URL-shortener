const withURLMakeValidators = handler => (req, res) => {
    const errors = {}
    // validate url
    if(req.body?.url){
        // validate exact format
        const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if(!pattern.test(req.body.url)){
            errors.url = 'URL is not valid!'
        }
    }else{
        errors.url = 'URL is required!'
    }

    if(Object.keys(errors).length){
        return res.status(422).send({
            message: 'Invalid type of input!',
            errors,
            status: 422
        }).send()
    }
    return handler(req, res)

}


export default withURLMakeValidators