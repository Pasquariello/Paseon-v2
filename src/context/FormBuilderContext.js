import React, {
    createContext,
    useState,
    useEffect
  } from 'react';
  import PropTypes from 'prop-types';
  
  export const FormBuilderContext = createContext({
    handleChangeCurrentView: () => {},
    currentView: '',
  });

  export function FormBuilderProvider({ settings, children }) {
    const [currentSettings, setCurrentSettings] = useState();

    const views = {
      form: {
        title: 'Form'
      },
    email: {
        title: 'Email Submission'
      },
      conditionals: {
        title: 'Field Conditions'
      },
      success: {
        title: 'Thank you'
      },

    }

    const [currentView, setCurrentView] = useState(views['form']);

    const handleChangeCurrentView = (key) => {
      setCurrentView(views[key]);
    }
  
    const handleSaveSettings = () => {};
  
    useEffect(() => {}, [currentSettings]);
  
    return (
      <FormBuilderContext.Provider
        value={{
          settings: currentSettings,
          saveSettings: handleSaveSettings,
          handleChangeCurrentView: handleChangeCurrentView,
          currentView: currentView,
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
  
  // export const FormBuilderConsumer = FormBuilderContext.Consumer;
  
  export default FormBuilderProvider;
  