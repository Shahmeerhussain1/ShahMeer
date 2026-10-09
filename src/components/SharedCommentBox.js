import { useEffect, useState, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/firebaseClient' // Update this path to your actual firebase config file

export default function SharedCommentBox() {
    // Text states
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [copied, setCopied] = useState(false)

    // File states
    const [isDragging, setIsDragging] = useState(false)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [fileUrl, setFileUrl] = useState(null)
    const [filePath, setFilePath] = useState(null) // Keep track of path for deletion
    const fileInputRef = useRef(null)

    useEffect(() => {
        fetchText()
    }, [])

    // --- Text Functions (Firestore) ---
    async function fetchText() {
        setFetching(true)
        try {
            // Reference to a specific document in the 'shared_data' collection
            const docRef = doc(db, 'shared_data', 'main_text')
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setText(docSnap.data().content || '')
            }
        } catch (error) {
            console.error("Error fetching text:", error)
        }
        setFetching(false)
    }

    async function saveText() {
        setLoading(true)
        try {
            const docRef = doc(db, 'shared_data', 'main_text')
            // setDoc with merge: true will create the document if it doesn't exist, or update it if it does
            await setDoc(docRef, { content: text }, { merge: true })
        } catch (error) {
            console.error("Error saving text:", error)
        }
        setLoading(false)
    }

    function copyText() {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    // --- File Drag & Drop Functions ---
    const onDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const onDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const onDrop = async (e) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files
        if (files && files.length > 0) {
            await handleFileUpload(files[0])
        }
    }

    const onFileSelect = async (e) => {
        const files = e.target.files
        if (files && files.length > 0) {
            await handleFileUpload(files[0])
        }
    }

    // --- Firebase Storage Functions ---
    async function handleFileUpload(file) {
        setUploadingFile(true)
        
        try {
            // Create a unique file path
            const uniqueFileName = `${Date.now()}_${file.name}`
            const fullPath = `shared_files/${uniqueFileName}`
            
            // Create a reference to the file location
            const storageRef = ref(storage, fullPath)

            // Upload the file
            await uploadBytes(storageRef, file)

            // Get the downloadable public URL
            const downloadUrl = await getDownloadURL(storageRef)

            setFilePath(fullPath)
            setFileUrl(downloadUrl)
        } catch (error) {
            console.error("Error uploading file:", error)
            alert("Failed to upload file.")
        }
        
        setUploadingFile(false)
    }

    async function deleteFile() {
        if (!filePath) return
        
        try {
            const storageRef = ref(storage, filePath)
            await deleteObject(storageRef)
            
            setFileUrl(null)
            setFilePath(null)
        } catch (error) {
            console.error("Error deleting file:", error)
            alert("Failed to delete file.")
        }
    }

    function copyFileUrl() {
        if (!fileUrl) return
        navigator.clipboard.writeText(fileUrl)
        alert("File link copied!")
    }

    return (
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-4">Share your text & files</h2>

            {/* Skeleton while fetching */}
            {fetching ? (
                <div className="relative w-full min-h-[200px] overflow-hidden rounded-xl bg-gray-100 mb-4">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
                </div>
            ) : (
                <textarea
                    className="w-full min-h-[200px] p-4 border rounded-xl focus:outline-none focus:ring mb-4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your text here..."
                />
            )}

            {/* Drag & Drop File Zone */}
            <div 
                className={`w-full p-8 border-2 border-dashed rounded-xl text-center transition-colors mb-4 ${
                    isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
                }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current.click()}
            >
                <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={onFileSelect}
                />
                
                {uploadingFile ? (
                    <span className="flex items-center justify-center gap-2 text-gray-500">
                        <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        Uploading your file...
                    </span>
                ) : (
                    <div className="cursor-pointer">
                        <p className="text-gray-600 font-medium">Drag & drop a file here</p>
                        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                    </div>
                )}
            </div>

            {/* Uploaded File Result */}
            {fileUrl && (
                <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-xl mb-4">
                    <span className="text-sm text-gray-600 truncate max-w-[60%]">
                        File ready to share
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={copyFileUrl}
                            className="px-3 py-1 text-sm bg-white border rounded-lg hover:bg-gray-50"
                        >
                            Copy Link
                        </button>
                        <button 
                            onClick={deleteFile}
                            className="px-3 py-1 text-sm bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100"
                        >
                            Delete Now
                        </button>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <button
                onClick={saveText}
                disabled={loading || fetching}
                className="w-full py-2 bg-black text-white rounded-xl hover:opacity-80 disabled:opacity-60 flex items-center justify-center"
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                    </span>
                ) : (
                    'Save Text'
                )}
            </button>

            {/* Copy Button */}
            <button
                onClick={copyText}
                disabled={fetching || !text}
                className="mt-3 w-full py-2 rounded-xl text-black hover:opacity-80 disabled:opacity-60 transition"
                style={{ backgroundColor: '#E5E5DD' }}
            >
                {copied ? 'Copied ✓' : 'Copy Text'}
            </button>
        </div>
    )
}