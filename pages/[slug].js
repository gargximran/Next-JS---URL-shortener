import URLDirectoryModel from "../core/db/models/URLDirectoryModel";

const Slug = () => (
    ''
)

export default Slug



export const getServerSideProps = async ({params}) => {
    const slug = params.slug;
    let url = '';
    try{
        const doc = await URLDirectoryModel.findOne({slug})
        url = doc.url
    }catch (e) {
        url = ''
    }
    if(url){
        return {
            redirect: {
                permanent: true,
                destination: url,
            },
            props:{},
        }
    }else{
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

}