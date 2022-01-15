import React, {
    createContext,
    useState,
    useEffect
  } from 'react';
  import PropTypes from 'prop-types';
  import shortid from 'shortid';

  export const FormBuilderContext = createContext({
    handleChangeCurrentView: () => {},
    currentView: '',
  });

  export function FormBuilderProvider({ settings, children }) {
    const [currentSettings, setCurrentSettings] = useState();

    const [rows, setRows] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [cols, setCols] = useState([]);

    const [myfields, setMyfields] = useState()

    const views = {
      form: {
        title: 'Form'
      },
      submission: {
        title: 'Submission Results'
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

    const buildRows = (arrayToSort) => {
      // sort by row
      arrayToSort.sort((a, b) => a.row - b.row);
      let foo = [...arrayToSort]
      foo.sort((a, b) => a.row - b.row);
  
      let rowArray = [];
      arrayToSort.forEach((field, index) => { 
        const col = {
          id: field.id,
          row: field.row,
          col: field.col,
          half: field.half,
        }
        if (rowArray[field.row]){
          rowArray[field.row] = [...rowArray[field.row], col]
        } 
        else { 
      
          rowArray.push([col]) 
        }
      })
  
      let rowArray2 = [];
      foo.forEach((field, index) => { 
        const col = {
          id: field.id,
          row: field.row,
          col: field.col,
          half: field.half,
        }
        if (rowArray2[field.row]){
          rowArray2[field.row] = {...rowArray2[field.row], columns: [...rowArray2[field.row].columns, col]}
        } 
        else { 
      
          rowArray2.push({
            rowId: shortid.generate(),
            columns: [col]
          }) 
        }
      })
      setRows2(rowArray2)
      return rowArray;
  
    }


    const addNewRow = (toIndex) => {
      const foo = [...rows2];
      const elem = {
        rowId: shortid.generate(),
        columns: [],
      }
      foo.splice(toIndex, 0, elem);
      setRows2(foo);
    }

    const addNewField = () => {
     
      const newId = Math.floor(Math.random() * 1000);
      const col = {
        id: newId,
        row: rows.length + 1,
        col: 0,
        half: false,
      }
  
      const fieldSet = {
        value: 'New',
        label: 'New'
      }
  
      setRows2([
        ...rows2,
        {
          rowId: shortid.generate(),
          columns: [col]
        }
      ])
  
      setRows([...rows, [col]])
      setMyfields({...myfields, [newId]: [fieldSet]})
  
    }
  
    useEffect(() => {}, [currentSettings]);
  
    return (
      <FormBuilderContext.Provider
        value={{
          settings: currentSettings,
          saveSettings: handleSaveSettings,
          handleChangeCurrentView: handleChangeCurrentView,
          currentView: currentView,

          rows2: rows2,
          setRows2: setRows2,
          rows: rows,
          setMyfields,
          myfields,
          buildRows: buildRows,
          addNewField: addNewField,

          addNewRow,
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
  