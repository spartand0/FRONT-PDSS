import { useEffect, useState, useRef } from 'react';

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(ref.current, event.target);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);

  return ref;
};

const useLanguageSelector = (props) => {
  const { languages, clearErrors, setValue, form_action_edit, child } = props;

  // State variables
  const [isActive, setIsActive] = useState(false);
  const [checkedValue, setCheckedValue] = useState([41]); // Default value
  const [searchInput, setSearchInput] = useState('');
  const [list, setList] = useState('Deutsch,'); // Default value

  // Update "languages" value in the form when "checkedValue" changes
  useEffect(() => {
    setValue('languages', checkedValue);
  }, [checkedValue, setValue]);

  // Update state variables when the component props change
  useEffect(() => {
    if (form_action_edit && child?.languages && languages?.length > 0) {
      const languageIds = [];
      let languageNames = '';
      languages.forEach((language) => {
        if (child.languages.includes(language.id.toString())) {
          languageIds.push(language.id);
          languageNames += language.name + ',';
        }
      });
      setCheckedValue(languageIds);
      setList(languageNames);
    }
  }, [form_action_edit, child, languages]);

  // Event handlers
  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectLanguage = async (e, language) => {
    e.preventDefault();
    clearErrors('languages');
    if (checkedValue.includes(language.id)) {
      await setCheckedValue(checkedValue.filter((item) => item !== language.id));
      await setList(list.replace(language.name + ',', ''));
    } else {
      await setCheckedValue((old) => [...old, language.id]);
      await setList(list + language.name + ',');
    }
  };

  const handleClickOutside = (current, target) => {
    // eslint-disable-next-line eqeqeq
    if (current.id != target.id) setIsActive((current) => !current);
  };

  // Use the "useOutsideClick" hook to handle clicks outside of the language selector component
  const ref = useOutsideClick(handleClickOutside);

  // Compute the filtered list of languages based on the search input
  const getFilteredLanguages = () => {
    if (!searchInput) return languages;
    return languages.filter((language) =>
      language.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  // Get the filtered list of languages
  const filteredLanguages = getFilteredLanguages();

  // Return the state variables and event handlers as an object
  return {
    isActive,
    handleClick,
    handleSelectLanguage,
    list,
    ref,
    handleChange,
    searchInput,
    getFilteredLanguages,
    filteredLanguages,
    checkedValue
  };
};

export default useLanguageSelector;
