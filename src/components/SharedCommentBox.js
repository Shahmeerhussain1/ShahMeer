import { useEffect, useState } from 'react'
import { supabase } from '../supabase/supabaseClient'


export default function SharedCommentBox() {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)


    // Load shared text
    useEffect(() => {
        fetchText()
    }, [])


    async function fetchText() {
        const { data } = await supabase
            .from('shared_text')
            .select('content')
            .eq('id', 1)
            .single()


        if (data) setText(data.content)
    }


    // Save shared text
    async function saveText() {
        setLoading(true)


        await supabase
            .from('shared_text')
            .update({ content: text })
            .eq('id', 1)


        setLoading(false)
    }


    return (
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white ">
            <h2 className="text-2xl font-semibold mb-4">Share your text</h2>


            <textarea
                className="w-full min-h-[200px] p-4 border rounded-xl focus:outline-none focus:ring"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />


            <button
                onClick={saveText}
                className="mt-4 w-full py-2 bg-black text-white rounded-xl hover:opacity-80"
            >
                {loading ? 'Saving...' : 'Save'}
            </button>
        </div>
    )
}