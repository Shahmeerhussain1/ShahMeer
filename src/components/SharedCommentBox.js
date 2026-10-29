

import { useEffect, useState, useRef } from 'react'
import {
    doc, getDoc, setDoc,
    collection, addDoc, getDocs, deleteDoc,
    query, orderBy, serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase/firebaseClient'

// ========== YOUR CLOUDINARY VALUES ==========
const CLOUD_NAME = 'dazznu7pv'
const UPLOAD_PRESET = 'student_upload'
// ============================================

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB

export default function SharedCommentBox() {
    // Text
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [copied, setCopied] = useState(false)

    // Files
    const [isDragging, setIsDragging] = useState(false)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [files, setFiles] = useState([])
    const [filesLoading, setFilesLoading] = useState(true)
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)

    useEffect(() => {
        fetchText()
        fetchFiles()
    }, [])

    // ---------- TEXT ----------
    async function fetchText() {
        setFetching(true)
        try {
            const docRef = doc(db, 'shared_data', 'main_text')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) setText(docSnap.data().content || '')
        } catch (err) {
            console.error(err)
        }
        setFetching(false)
    }

    async function saveText(silent = false) {
        if (!silent) setLoading(true)
        try {
            await setDoc(doc(db, 'shared_data', 'main_text'), {
                content: text,
                updatedAt: new Date().toISOString()
            }, { merge: true })
        } catch (err) {
            setError('Failed to save text')
        }
        if (!silent) setLoading(false)
    }

    function copyText() {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
    }

    // ---------- FILES ----------
    async function fetchFiles() {
        setFilesLoading(true)
        try {
            const q = query(collection(db, 'shared_files'), orderBy('createdAt', 'desc'))
            const snapshot = await getDocs(q)
            const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
            setFiles(list)
        } catch (err) {
            console.error('Error fetching files:', err)
        }
        setFilesLoading(false)
    }

    async function handleFileUpload(file) {
        setError('')
        if (file.size > MAX_FILE_SIZE) {
            setError(`File too large (max 20 MB)`)
            return
        }

        setUploadingFile(true)
        setUploadProgress(10)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', UPLOAD_PRESET)
            formData.append('folder', 'shared_files')

            const xhr = new XMLHttpRequest()

            const data = await new Promise((resolve, reject) => {
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        setUploadProgress(Math.round((e.loaded / e.total) * 100))
                    }
                })
                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        reject(new Error('Upload failed'))
                    }
                })
                xhr.addEventListener('error', () => reject(new Error('Network error')))
                xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`)
                xhr.send(formData)
            })

            await addDoc(collection(db, 'shared_files'), {
                name: file.name,
                url: data.secure_url,
                publicId: data.public_id,
                size: file.size,
                type: file.type,
                createdAt: serverTimestamp()
            })

            await fetchFiles()
            setUploadProgress(100)
        } catch (err) {
            console.error(err)
            setError('Upload failed. Please try again.')
        }

        setUploadingFile(false)
    }

    async function deleteFile(fileId) {
        if (!window.confirm('Remove this file from the shared list?')) return

        try {
            await deleteDoc(doc(db, 'shared_files', fileId))
            setFiles(prev => prev.filter(f => f.id !== fileId))
        } catch (err) {
            console.error(err)
            setError('Failed to remove file')
        }
    }

    // Force download
    function downloadFile(url, filename) {
        // Show a small loading state if you want
        setError('') // clear previous errors

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Download failed')
                return response.blob()
            })
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = blobUrl
                link.download = filename || 'download'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(blobUrl)
            })
            .catch(err => {
                console.error(err)
                setError('Could not download the file. Please try again.')
                // Fallback: open in new tab
                window.open(url, '_blank')
            })
    }

    function formatBytes(bytes) {
        if (!bytes) return ''
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / 1024 / 1024).toFixed(1) + ' MB'
    }

    // Drag & Drop
    const onDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
    const onDragLeave = (e) => { e.preventDefault(); setIsDragging(false) }
    const onDrop = async (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files?.length) await handleFileUpload(e.dataTransfer.files[0])
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Share Text & Files</h1>
                    <p className="mt-2 text-slate-500 text-sm">Everyone can see and download the files</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-5 sm:p-7 space-y-6">

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100 flex justify-between items-center">
                                <span>{error}</span>
                                <button onClick={() => setError('')} className="underline text-xs">Dismiss</button>
                            </div>
                        )}

                        {/* ===== TEXT SECTION ===== */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-slate-700">Shared text</label>
                             
                            </div>

                            {fetching ? (
                                // Skeleton for text
                                <div className="space-y-3">
                                    <div className="h-4 bg-slate-200 rounded-lg w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-slate-200 rounded-lg w-full animate-pulse"></div>
                                    <div className="h-4 bg-slate-200 rounded-lg w-5/6 animate-pulse"></div>
                                    <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
                                </div>
                            ) : (
                                <textarea
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    placeholder="Type anything here..."
                                    className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-200 outline-none resize-none"
                                />
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => saveText()}
                                disabled={loading || fetching}
                                className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50 transition"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Saving...
                                    </span>
                                ) : 'Save Text'}
                            </button>
                            <button
                                onClick={copyText}
                                disabled={!text || fetching}
                                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-800 font-medium hover:bg-slate-200 disabled:opacity-50 transition"
                            >
                                {copied ? 'Copied ✓' : 'Copy Text'}
                            </button>
                        </div>

                        {/* ===== FILE UPLOAD ===== */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-3 text-slate-400">Share a file</span>
                            </div>
                        </div>

                        <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onClick={() => !uploadingFile && fileInputRef.current?.click()}
                            className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all
                ${isDragging ? 'border-slate-800 bg-slate-50' : 'border-slate-200 hover:border-slate-400'}`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                                accept="
    image/*,
    .pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,
    .txt,.zip,.rar,.csv,
    .js,.jsx,.ts,.tsx,
    .py,.java,.c,.cpp,.h,.hpp,.cs,
    .html,.css,.scss,.json,.xml,.md,
    .sql,.php,.rb,.go,.rs,.swift,.kt,
    .sh,.bash,.yml,.yaml,.ipynb
  "
                            />

                            {uploadingFile ? (
                                <div className="space-y-4">
                                    <div className="w-12 h-12 mx-auto border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">Uploading... {uploadProgress}%</p>
                                        <div className="mt-2 w-48 mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-slate-800 transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="text-3xl mb-2">📎</div>
                                    <p className="font-medium text-slate-700">Drag & drop or click to upload</p>
                                    <p className="text-xs text-slate-400 mt-1">PDF, Word, images, zip... max 20 MB</p>
                                </>
                            )}
                        </div>

                        {/* ===== LIST OF FILES ===== */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-slate-700">
                                Shared Files {filesLoading ? '' : `(${files.length})`}
                            </h3>

                            {filesLoading ? (
                                // Skeleton loaders for files
                                <div className="space-y-3">
                                    {[1].map(i => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100">
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                                                <div className="h-3 bg-slate-100 rounded w-1/4 animate-pulse"></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse"></div>
                                                <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : files.length === 0 ? (
                                <div className="text-center py-8 text-slate-400 text-sm">
                                    No files shared yet
                                </div>
                            ) : (
                                files.map(file => (
                                    <div
                                        key={file.id}
                                        className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{formatBytes(file.size)}</p>
                                        </div>

                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => downloadFile(file.url, file.name)}
                                                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
                                            >
                                                Download
                                            </button>
                                            <button
                                                onClick={() => deleteFile(file.id)}
                                                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}