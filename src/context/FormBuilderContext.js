import React, {
    createContext,
    useState,
    useEffect
  } from 'react';
  import PropTypes from 'prop-types';
  
  const FormBuilderContext = createContext();

  
  export function FormBuilderProvider({ settings, children }) {
    const [currentSettings, setCurrentSettings] = useState();
  
    const handleSaveSettings = () => {};
  
    useEffect(() => {}, [currentSettings]);
  
    return (
      <FormBuilderContext.Provider
        value={{
          settings: currentSettings,
          saveSettings: handleSaveSettings
        }}
      >
        {children}
      </FormBuilderContext.Provider>
    );
  }
  
  FormBuilderProvider.propTypes = {
    children: PropTypes.node.isRequired,
    settings: PropTypes.object
  };
  
  export const FormBuilderConsumer = FormBuilderContext.Consumer;
  
  export default FormBuilderContext;
  