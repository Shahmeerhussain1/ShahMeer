

// import { useEffect, useState } from 'react'
// import { supabase } from '../supabase/supabaseClient'

// export default function SharedCommentBox() {
//     const [text, setText] = useState('')
//     const [loading, setLoading] = useState(false)      // save loading
//     const [fetching, setFetching] = useState(true)    // initial fetch loading

//     useEffect(() => {
//         fetchText()
//     }, [])

//     async function fetchText() {
//         setFetching(true)

//         const { data } = await supabase
//             .from('shared_text')
//             .select('content')
//             .eq('id', 1)
//             .single()

//         if (data) setText(data.content)
//         setFetching(false)
//     }

//     async function saveText() {
//         setLoading(true)

//         await supabase
//             .from('shared_text')
//             .update({ content: text })
//             .eq('id', 1)

//         setLoading(false)
//     }

//     return (
//         <div className="max-w-3xl mx-auto mt-12 p-6 bg-white">
//             <h2 className="text-2xl font-semibold mb-4">Share your text</h2>

//             {/* Skeleton while fetching */}
//             {fetching ? (
//                 <div className="relative w-full min-h-[200px] overflow-hidden rounded-xl bg-gray-100">
//                     <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
//                 </div>
//             ) : (
//                 <textarea
//                     className="w-full min-h-[200px] p-4 border rounded-xl focus:outline-none focus:ring"
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />
//             )}


//             <button
//                 onClick={saveText}
//                 disabled={loading || fetching}
//                 className="mt-4 w-full py-2 bg-black text-white rounded-xl hover:opacity-80 disabled:opacity-60 flex items-center justify-center"
//             >
//                 {loading ? (
//                     <span className="flex items-center gap-2">
//                         <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Saving...
//                     </span>
//                 ) : (
//                     'Save'
//                 )}
//             </button>
//         </div>
//     )
// }



import { useEffect, useState } from 'react'
import { supabase } from '../supabase/supabaseClient'

export default function SharedCommentBox() {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)      // save loading
    const [fetching, setFetching] = useState(true)    // initial fetch loading
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        fetchText()
    }, [])

    async function fetchText() {
        setFetching(true)

        const { data } = await supabase
            .from('shared_text')
            .select('content')
            .eq('id', 1)
            .single()

        if (data) setText(data.content)
        setFetching(false)
    }

    async function saveText() {
        setLoading(true)

        await supabase
            .from('shared_text')
            .update({ content: text })
            .eq('id', 1)

        setLoading(false)
    }

    function copyText() {
        if (!text) return

        navigator.clipboard.writeText(text)
        setCopied(true)

        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-4">Share your text</h2>

            {/* Skeleton while fetching */}
            {fetching ? (
                <div className="relative w-full min-h-[200px] overflow-hidden rounded-xl bg-gray-100">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
                </div>
            ) : (
                <textarea
                    className="w-full min-h-[200px] p-4 border rounded-xl focus:outline-none focus:ring"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            )}

            {/* Save Button */}
            <button
                onClick={saveText}
                disabled={loading || fetching}
                className="mt-4 w-full py-2 bg-black text-white rounded-xl hover:opacity-80 disabled:opacity-60 flex items-center justify-center"
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                    </span>
                ) : (
                    'Save'
                )}
            </button>

            {/* Copy Button */}
            <button
                onClick={copyText}
                disabled={fetching || !text}
                className="mt-3 w-full py-2 rounded-xl text-black hover:opacity-80 disabled:opacity-60 transition"
                style={{ backgroundColor: '#E5E5DD' }}
            >
                {copied ? 'Copied ✓' : 'Copy'}
            </button>
        </div>
    )
}
