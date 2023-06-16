import React, { useState } from 'react'
import DropFileInput from '../components/DropFileInput'
import api from '../utils/api'

const UploadPage = () => {
  const API = api(process.env.REACT_APP_API_URL)

  // a list of all the files that have been uploaded
  const [uploadedFiles, setUploadedFiles] = useState(new Set())
  // a list of all the files that failed to upload
  const [failUploads, setFailUploads] = useState([])
  // a list of all the files that are valid
  const [validFileList, setValidFileList] = useState([])
  // a list of all the files that were successfully uploaded after an event so the user knows exactly which uploaded
  const [successfulUploads, setSuccessfulUploads] = useState([])

  const onFileChange = async (files) => {
    const acceptedTypes = [
      'text/xml',
      'application/xml',
      'application/json',
      'text/json',
      'application/csv',
      'text/csv',
    ]
    const token = localStorage.getItem('e-invoice-token')
    setValidFileList(files)

    files.forEach(async (file) => {
      if (acceptedTypes.includes(file.type) && !uploadedFiles.has(file.name)) {
        const formData = new FormData()
        formData.append('file', file)

        try {
          const response = await API.post('/invoice/upload/', formData, {
            headers: {
              token,
              'Content-Type': 'multipart/form-data',
            },
          })
          if (response.status === 200) {
            // Save successful upload information
            setSuccessfulUploads((prevSuccessfulUploads) => [
              ...prevSuccessfulUploads,
              { fileName: file.name, uploadTime: new Date() },
            ])

            // Add the file name to the uploadedFiles Set
            setUploadedFiles((prevUploadedFiles) => {
              const updatedUploadedFiles = new Set(prevUploadedFiles)
              updatedUploadedFiles.add(file.name)
              return updatedUploadedFiles
            })
          }
        } catch (error) {
          console.error(error)

          //// THIS SECTION NEEDS REFACTORING ////

          // append file name to failUploads array
          setFailUploads((prevFailUploads) => {
            const updatedFailUploads = [...prevFailUploads]
            updatedFailUploads.push(file.name)
            return updatedFailUploads
          })

          // remove file from the uploadedFiles Set
          setUploadedFiles((prevUploadedFiles) => {
            const updatedUploadedFiles = new Set(prevUploadedFiles)
            updatedUploadedFiles.delete(file.name)
            return updatedUploadedFiles
          })

          // remove bad file from the validFileList
          setValidFileList((prevValidFileList) => {
            const updatedValidFileList = prevValidFileList.filter(
              (validFile) => validFile.name !== file.name
            )
            return updatedValidFileList
          })
        }
      } else if (!acceptedTypes.includes(file.type)) {
        setFailUploads((prevFailUploads) => {
          const updatedFailUploads = [...prevFailUploads]
          updatedFailUploads.push(file.name)
          return updatedFailUploads
        })

        // remove bad file from the validFileList
        setValidFileList((prevValidFileList) => {
          const updatedValidFileList = prevValidFileList.filter(
            (validFile) => validFile.name !== file.name
          )
          return updatedValidFileList
        })
      }
    })
  }

  return (
    <div className="bg-gray-200 dark:bg-main-dark-bg flex h-full justify-center">
      <div className="flex-grow pt-12">
        <div className=" dark:border dark:border-main-purple dark:shadow dark:shadow-main-purple rounded-xl shadow-md shadow-shadow-purple p-10">
          <DropFileInput
            onFileChange={(files) => onFileChange(files)}
            failUploads={failUploads}
            validFileList={validFileList}
            className=""
          />
          {successfulUploads.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2 dark:text-white  ">
                Successful uploads
              </h2>
              <ul>
                {successfulUploads.map((upload, index) => (
                  <li
                    key={index}
                    className="
                    my-3 shadow-md shadow-shadow-purple  bg-paid-green text-paid dark:bg-main-dark-bg dark:text-green-400 dark:shadow
                     dark:shadow-main-purple dark:border dark:border-main-purple px-10 py-2 rounded
                      -mr-8 transform -translate-x-8
                    "
                  >
                    <span className="font-bold">{upload.fileName}</span>{' '}
                    <span className="text-main-table dark:text-white">
                      - {new Date().toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {failUploads.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Failed uploads</h2>
              <ul>
                {failUploads.map((failedFileName, index) => (
                  <li
                    key={index}
                    className="my-3 shadow-md shadow-shadow-purple bg-unpaid-red text-over-due dark:bg-main-dark-bg
                     dark:text-red-400 dark:shadow dark:shadow-main-purple dark:border
                      dark:border-main-purple px-10 py-2 rounded
                      -mr-8 transform -translate-x-8"
                  >
                    <span className="font-bold w-36">{failedFileName}</span>{' '}
                    <span className="text-main-table dark:text-white">
                      - {new Date().toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadPage
// {failUploads.length > 0 && (
//   <div className='mt-4'>
//     <h2 className='text-lg font-semibold mb-2'>
//       Failed uploads
//     </h2>
//     <ul>
//       {failUploads.map((failedFile, index) => (
//         <li
//           key={index}
//           className='my-3 shadow-md shadow-shadow-purple bg-unpaid-red text-over-due dark:bg-main-dark-bg
//            dark:text-red-400 dark:shadow dark:shadow-main-purple dark:border
//             dark:border-main-purple px-10 py-2 rounded
//             -mr-8 transform -translate-x-8'
//         >
//           <span className='font-bold w-36'>
//             {failedFile.fileName}
//           </span>{' '}
//           <span className='text-main-table dark:text-white'>
//             - {new Date().toLocaleString()} -{' '}
//           </span>
//           <span className='text-xs text-red-600 dark:text-red-400'>
//             {failedFile.is_fatal ? 'Fatal Error' : 'Error'} at line {failedFile.line}: {failedFile.message}
//           </span>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

// setFailUploads((prevFailUploads) => {
//   const updatedFailUploads = [...prevFailUploads];
//   const errorInfo = errors.map((err) => ({
//     fileName: file.name,
//     is_fatal: err.is_fatal,
//     line: err.line,
//     message: err.message,
//   }));
//   return [...updatedFailUploads, ...errorInfo];
// });
