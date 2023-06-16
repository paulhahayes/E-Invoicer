import React from 'react'
import PropTypes from 'prop-types'
const LanguageSelector = ({ language, handleSelectLanguage }) => {
  const languageOptions = [
    { value: 'en', label: 'EN' },
    { value: 'ar', label: 'AR' },
    { value: 'zh', label: 'ZH' },
    { value: 'fr', label: 'FR' },
    { value: 'de', label: 'DE' },
    { value: 'hi', label: 'HI' },
    { value: 'it', label: 'IT' },
    { value: 'jp', label: 'JP' },
    { value: 'kr', label: 'KR' },
    { value: 'ru', label: 'RU' },
    { value: 'es', label: 'ES' },
    { value: 'th', label: 'TH' },
  ]

  return (
    <div className="flex items-center">
      <select
        value={language}
        onChange={handleSelectLanguage}
        className="font-md text-main-table dark:text-white bg-gray-200 dark:bg-main-dark-bg"
      >
        {languageOptions.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  )
}

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  handleSelectLanguage: PropTypes.func.isRequired,
}

export default LanguageSelector
