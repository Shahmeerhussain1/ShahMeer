// import { useEffect, useState, useRef } from 'react'
// import { doc, getDoc, setDoc } from 'firebase/firestore'
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
// import { db, storage } from '../firebase/firebaseClient' // Update this path to your actual firebase config file

// export default function SharedCommentBox() {
//     // Text states
//     const [text, setText] = useState('')
//     const [loading, setLoading] = useState(false)
//     const [fetching, setFetching] = useState(true)
//     const [copied, setCopied] = useState(false)

//     // File states
//     const [isDragging, setIsDragging] = useState(false)
//     const [uploadingFile, setUploadingFile] = useState(false)
//     const [fileUrl, setFileUrl] = useState(null)
//     const [filePath, setFilePath] = useState(null) // Keep track of path for deletion
//     const fileInputRef = useRef(null)

//     useEffect(() => {
//         fetchText()
//     }, [])

//     // --- Text Functions (Firestore) ---
//     async function fetchText() {
//         setFetching(true)
//         try {
//             // Reference to a specific document in the 'shared_data' collection
//             const docRef = doc(db, 'shared_data', 'main_text')
//             const docSnap = await getDoc(docRef)

//             if (docSnap.exists()) {
//                 setText(docSnap.data().content || '')
//             }
//         } catch (error) {
//             console.error("Error fetching text:", error)
//         }
//         setFetching(false)
//     }

//     async function saveText() {
//         setLoading(true)
//         try {
//             const docRef = doc(db, 'shared_data', 'main_text')
//             // setDoc with merge: true will create the document if it doesn't exist, or update it if it does
//             await setDoc(docRef, { content: text }, { merge: true })
//         } catch (error) {
//             console.error("Error saving text:", error)
//         }
//         setLoading(false)
//     }

//     function copyText() {
//         if (!text) return
//         navigator.clipboard.writeText(text)
//         setCopied(true)
//         setTimeout(() => setCopied(false), 1500)
//     }

//     // --- File Drag & Drop Functions ---
//     const onDragOver = (e) => {
//         e.preventDefault()
//         setIsDragging(true)
//     }

//     const onDragLeave = (e) => {
//         e.preventDefault()
//         setIsDragging(false)
//     }

//     const onDrop = async (e) => {
//         e.preventDefault()
//         setIsDragging(false)
//         const files = e.dataTransfer.files
//         if (files && files.length > 0) {
//             await handleFileUpload(files[0])
//         }
//     }

//     const onFileSelect = async (e) => {
//         const files = e.target.files
//         if (files && files.length > 0) {
//             await handleFileUpload(files[0])
//         }
//     }

//     // --- Firebase Storage Functions ---
//     async function handleFileUpload(file) {
//         setUploadingFile(true)
        
//         try {
//             // Create a unique file path
//             const uniqueFileName = `${Date.now()}_${file.name}`
//             const fullPath = `shared_files/${uniqueFileName}`
            
//             // Create a reference to the file location
//             const storageRef = ref(storage, fullPath)

//             // Upload the file
//             await uploadBytes(storageRef, file)

//             // Get the downloadable public URL
//             const downloadUrl = await getDownloadURL(storageRef)

//             setFilePath(fullPath)
//             setFileUrl(downloadUrl)
//         } catch (error) {
//             console.error("Error uploading file:", error)
//             alert("Failed to upload file.")
//         }
        
//         setUploadingFile(false)
//     }

//     async function deleteFile() {
//         if (!filePath) return
        
//         try {
//             const storageRef = ref(storage, filePath)
//             await deleteObject(storageRef)
            
//             setFileUrl(null)
//             setFilePath(null)
//         } catch (error) {
//             console.error("Error deleting file:", error)
//             alert("Failed to delete file.")
//         }
//     }

//     function copyFileUrl() {
//         if (!fileUrl) return
//         navigator.clipboard.writeText(fileUrl)
//         alert("File link copied!")
//     }

//     return (
//         <div className="max-w-3xl mx-auto mt-12 p-6 bg-white">
//             <h2 className="text-2xl font-semibold mb-4">Share your text & files</h2>

//             {/* Skeleton while fetching */}
//             {fetching ? (
//                 <div className="relative w-full min-h-[200px] overflow-hidden rounded-xl bg-gray-100 mb-4">
//                     <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
//                 </div>
//             ) : (
//                 <textarea
//                     className="w-full min-h-[200px] p-4 border rounded-xl focus:outline-none focus:ring mb-4"
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     placeholder="Type your text here..."
//                 />
//             )}

//             {/* Drag & Drop File Zone */}
//             <div 
//                 className={`w-full p-8 border-2 border-dashed rounded-xl text-center transition-colors mb-4 ${
//                     isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
//                 }`}
//                 onDragOver={onDragOver}
//                 onDragLeave={onDragLeave}
//                 onDrop={onDrop}
//                 onClick={() => fileInputRef.current.click()}
//             >
//                 <input 
//                     type="file" 
//                     className="hidden" 
//                     ref={fileInputRef} 
//                     onChange={onFileSelect}
//                 />
                
//                 {uploadingFile ? (
//                     <span className="flex items-center justify-center gap-2 text-gray-500">
//                         <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//                         Uploading your file...
//                     </span>
//                 ) : (
//                     <div className="cursor-pointer">
//                         <p className="text-gray-600 font-medium">Drag & drop a file here</p>
//                         <p className="text-sm text-gray-400 mt-1">or click to browse</p>
//                     </div>
//                 )}
//             </div>

//             {/* Uploaded File Result */}
//             {fileUrl && (
//                 <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-xl mb-4">
//                     <span className="text-sm text-gray-600 truncate max-w-[60%]">
//                         File ready to share
//                     </span>
//                     <div className="flex gap-2">
//                         <button 
//                             onClick={copyFileUrl}
//                             className="px-3 py-1 text-sm bg-white border rounded-lg hover:bg-gray-50"
//                         >
//                             Copy Link
//                         </button>
//                         <button 
//                             onClick={deleteFile}
//                             className="px-3 py-1 text-sm bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100"
//                         >
//                             Delete Now
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Save Button */}
//             <button
//                 onClick={saveText}
//                 disabled={loading || fetching}
//                 className="w-full py-2 bg-black text-white rounded-xl hover:opacity-80 disabled:opacity-60 flex items-center justify-center"
//             >
//                 {loading ? (
//                     <span className="flex items-center gap-2">
//                         <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Saving...
//                     </span>
//                 ) : (
//                     'Save Text'
//                 )}
//             </button>

//             {/* Copy Button */}
//             <button
//                 onClick={copyText}
//                 disabled={fetching || !text}
//                 className="mt-3 w-full py-2 rounded-xl text-black hover:opacity-80 disabled:opacity-60 transition"
//                 style={{ backgroundColor: '#E5E5DD' }}
//             >
//                 {copied ? 'Copied ✓' : 'Copy Text'}
//             </button>
//         </div>
//     )
// }]


import { useEffect, useState, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/firebaseClient'

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25 MB

export default function SharedCommentBox() {
  // Text
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [copied, setCopied] = useState(false)
  const [autoSave, setAutoSave] = useState(false)

  // File
  const [isDragging, setIsDragging] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileUrl, setFileUrl] = useState(null)
  const [filePath, setFilePath] = useState(null)
  const [fileMeta, setFileMeta] = useState(null) // { name, size, type }
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchText()
  }, [])

  // Optional simple auto-save
  useEffect(() => {
    if (!autoSave || fetching) return
    const timer = setTimeout(() => {
      if (text.trim()) saveText(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [text, autoSave])

  async function fetchText() {
    setFetching(true)
    try {
      const docRef = doc(db, 'shared_data', 'main_text')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setText(docSnap.data().content || '')
      }
    } catch (err) {
      console.error(err)
      setError('Could not load shared text')
    }
    setFetching(false)
  }

  async function saveText(silent = false) {
    if (!silent) setLoading(true)
    try {
      const docRef = doc(db, 'shared_data', 'main_text')
      await setDoc(docRef, { content: text, updatedAt: new Date().toISOString() }, { merge: true })
    } catch (err) {
      console.error(err)
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

  // Drag & Drop
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
    if (files?.length) await handleFileUpload(files[0])
  }

  const onFileSelect = async (e) => {
    const files = e.target.files
    if (files?.length) await handleFileUpload(files[0])
    e.target.value = '' // allow re-selecting same file
  }

 // Using tmpfile.link (free, no signup, up to 100MB)
async function handleFileUpload(file) {
  if (file.size > 100 * 1024 * 1024) {
    setError("Max 100 MB allowed")
    return
  }

  setUploadingFile(true)
  setError("")

  try {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("https://tmpfile.link/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (data.downloadLink) {
      setFileUrl(data.downloadLink)
      setFileMeta({
        name: file.name,
        size: file.size,
        type: file.type,
      })
    } else {
      throw new Error("Upload failed")
    }
  } catch (err) {
    console.error(err)
    setError("Upload failed. Try again.")
  }

  setUploadingFile(false)
}

  async function deleteFile() {
    if (!filePath) return
    try {
      await deleteObject(ref(storage, filePath))
      setFileUrl(null)
      setFilePath(null)
      setFileMeta(null)
      setUploadProgress(0)
    } catch (err) {
      console.error(err)
      setError('Could not delete file')
    }
  }

  function copyFileUrl() {
    if (!fileUrl) return
    navigator.clipboard.writeText(fileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Share Text & Files
          </h1>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Drop anything here. Links expire only when you delete them.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-5 sm:p-7 space-y-6">

            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100">
                <span className="text-lg leading-none">⚠️</span>
                <div className="flex-1">
                  {error}
                  <button onClick={() => setError('')} className="ml-3 underline text-xs">Dismiss</button>
                </div>
              </div>
            )}

            {/* Text area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Shared text</label>
                <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  Auto-save
                </label>
              </div>

              {fetching ? (
                <div className="h-48 rounded-xl bg-slate-100 animate-pulse" />
              ) : (
                <>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste anything here..."
                    className="w-full h-48 sm:h-56 p-4 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none resize-none text-slate-800 placeholder:text-slate-400 transition"
                  />
                  <div className="flex justify-between mt-1.5 text-xs text-slate-400">
                    <span>{text.length.toLocaleString()} characters</span>
                  </div>
                </>
              )}
            </div>

            {/* Buttons for text */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => saveText()}
                disabled={loading || fetching}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : 'Save Text'}
              </button>

              <button
                onClick={copyText}
                disabled={fetching || !text}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 text-slate-800 font-medium hover:bg-slate-200 disabled:opacity-50 transition"
              >
                {copied ? 'Copied ✓' : 'Copy Text'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400">or share a file</span>
              </div>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => !uploadingFile && fileInputRef.current?.click()}
              className={`
                relative rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center cursor-pointer transition-all
                ${isDragging
                  ? 'border-slate-800 bg-slate-50 scale-[1.01]'
                  : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50/50'}
                ${uploadingFile ? 'pointer-events-none' : ''}
              `}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileSelect}
                className="hidden"
              />

              {uploadingFile ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
                  <p className="font-medium text-slate-700">Uploading… {uploadProgress}%</p>
                  <div className="w-full max-w-xs mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-800 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-3">📎</div>
                  <p className="font-medium text-slate-700">
                    Drag & drop a file here
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    or click to browse · max 25 MB
                  </p>
                </>
              )}
            </div>

            {/* Uploaded file card */}
            {fileUrl && fileMeta && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Preview for images */}
                {fileMeta.type?.startsWith('image/') && (
                  <img
                    src={fileUrl}
                    alt="preview"
                    className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{fileMeta.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {formatBytes(fileMeta.size)} · Ready to share
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={copyFileUrl}
                    className="px-3 py-2 text-sm rounded-lg bg-white border border-slate-200 hover:bg-slate-50 font-medium"
                  >
                    {copied ? 'Copied ✓' : 'Copy Link'}
                  </button>
                  <button
                    onClick={deleteFile}
                    className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Files are public while the link exists. Delete when finished.
        </p>
      </div>
    </div>
  )
}