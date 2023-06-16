/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../config/drag.css'
import { ImageConfig } from '../config/ImageConfig'
import uploadImg from '../assets/cloud-upload-regular-240.png'

const DropFileInput = (props) => {
  const wrapperRef = useRef(null)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    setFileList(props.validFileList)
  }, [props.validFileList])

  const onDragEnter = () =>
    wrapperRef.current.classList.add('dragover')
  const onDragLeave = () =>
    wrapperRef.current.classList.remove('dragover')

  const onDrop = () => wrapperRef.current.classList.remove('dragover')

  const onFileDrop = (e) => {
    const newFiles = Array.from(e.target.files)
    if (newFiles.length > 0) {
      const updatedList = [...fileList, ...newFiles]
      setFileList(updatedList)

      props.onFileChange(updatedList)
    }
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList]
    updatedList.splice(fileList.indexOf(file), 1)
    setFileList(updatedList)
    props.onFileChange(updatedList)
  }

  const removeDuplicateFiles = (files) => {
    const fileNames = new Set()
    const uniqueFiles = []

    files.forEach((file) => {
      if (!fileNames.has(file.name)) {
        fileNames.add(file.name)
        uniqueFiles.push(file)
      }
    })

    return uniqueFiles
  }

  const uniqueFileList = removeDuplicateFiles(fileList)

  return (
    <>
      <div
        ref={wrapperRef}
        className='drop-file-input translate-x-60'
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className='drop-file-input__label'>
          <img src={uploadImg} alt='' />
          <p>Drag & Drop your files here</p>
        </div>
        <input type='file' value='' onChange={onFileDrop} multiple />
      </div>
      {uniqueFileList.length > 0 ? (
        <div className='drop-file-preview'>
          <p className='drop-file-preview__title'>Recent Files</p>
          {uniqueFileList.map((item, index) => (
            <div key={index} className='drop-file-preview__item'>
              <img
                src={
                  ImageConfig[item.type.split('/')[1]] ||
                  ImageConfig['default']
                }
                alt=''
              />
              <div className='drop-file-preview__item__info'>
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className='drop-file-preview__item__del'
                onClick={() => fileRemove(item)}
              >
                X
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
}
export default DropFileInput
