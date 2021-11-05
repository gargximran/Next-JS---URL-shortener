import {useState, useRef, useEffect} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import axios from 'axios'

export default function Home() {
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState('')
    const r = useRef(null)
    const l = useRef(null)
    useEffect(() => {
        r.current.focus()
    }, [])

    const submit = () => {
        if(loading){
            return false
        }
        setLoading(true)
        setResult('')
        setError("")
        const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if(!pattern.test(url)){
            setError("URL is not correct!")
        }
        axios.post('/api/make-short-url', {url})
            .then(res => {
               setResult(location.href + res.data.data.slug)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setResult('')
                setError("URL is not correct!")
            })

    }

    return (
        <div>
            <h2 className="py-4 text-xl font-bold text-center bg-gray-400 text-black">URL Shortener</h2>

            <p className="text-lg italic text-blue-400 font-bold text-center mt-20">Enter URL Here <br/> <span
                className={'text-sm text-gray-600 font-light'}>ex: https://google.com</span></p>
            <div className="mx-5 md:mx-20 mt-5">
                <input ref={r} type="text" placeholder={'https://www.example.com'} value={url}
                       onChange={e => setUrl(e.target.value)}
                       className="w-full shadow text-center rounded text-2xl font-bold py-3 px-4 border-2 focus:outline-none border-red-500"/>
                <p className="text-center font-bold text-red-600">{error}</p>
            </div>
            <div className="flex justify-center py-3">
                <button onClick={submit} className="px-10 py-2 rounded shadow bg-red-500 text-xl font-bold text-white">
                    {
                        loading ? (
                            <>
                                <svg className="animate-spin inline mr-1 -ml-1 mr-3 h-5 w-5 text-white"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading
                            </>
                        ) : (
                            'Submit'
                        )
                    }
                    </button>
            </div>
            {
                result ? (
                    <div className="div py-10 text-center">
                        <input ref={l} value={result}
                               className="inline-block py-2 px-2 rounded bg-gray-400 font-bold text-lg shadow"/>
                        <br/>
                        <CopyToClipboard text={result} onCopy={() => {
                            l.current.select()
                            alert('URL copied to clipboard!')
                        }}>
                            <button className="bg-green-400 my-2 py-2 px-4 font-bold shadow">Copy to ClipBoard</button>
                        </CopyToClipboard>

                    </div>
                ) : ''
            }



        </div>
    )
}
