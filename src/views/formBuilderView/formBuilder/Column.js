import React, { useContext, useState } from 'react';
import './form.css'

import { Draggable } from "react-smooth-dnd";

import { FormBuilderContext } from 'src/context/FormBuilderContext';


import ContentEditable from 'react-contenteditable'


const Input = ({name, label, labelAlign, value, subType, required, handleEditLabel, fieldIndex, colId, subFields, checked
}) => {
  console.log('labelAlign', labelAlign)
  console.log('checked', checked)
  const direction = {
    top: 'column',
    right: 'row-reverse',
    bottom: 'column-reverse',
    left: 'row',
  }


  const labelAlignment = direction[labelAlign] || 'column';
  // const labelIsCentered = labelAlign === 'right' || labelAlign === 'left' ? 'centered'
  return (
    <div 
    style={{
      display: 'flex', 
      justifyContent: 'left',
      flexDirection: labelAlignment, 
      border: '1px solid red', 
      minWidth: 0, 
      alignItems: labelAlignment.includes('row') ? 'center' : '',
      gap: labelAlignment.includes('row') ? 12 : 0,
    }}
    >
      <ContentEditable
        html={label} // innerHTML of the editable div
        onChange={(e) => handleEditLabel({value: e.target.value, fieldIndex, colId})} // handle innerHTML change
      />
      {subFields?.length ? subFields.map(subField => {
        console.log("value", value)
        console.log("subField.value", subField.value)

        return (
          <Input
            handleEditLabel={handleEditLabel}
            colId={colId}
            value={subField.value}
            fieldIndex={fieldIndex}
            label={subField.label}
            subType={subField.subType}
            required={false}
            name={name}
            labelAlign={subField.labelAlign}
            checked={value === subField.value}
          />
        )
       }) : 
      <input 
        style={{minWidth: 0}} // width 100% Will set input elements so they dont overflow if there are two in a row
        required={required} 
        type={subType || ""} 
        name={name?.split(" ").join("_")}
        value={value}
        checked={checked}
        // checked={value === 'Gabrielle'}
        
      />
  
}
      </div>
  )
}

const Radio = ({name, label, labelAlign, value, subType, required, handleEditLabel, fieldIndex, colId}) => {
  console.log('labelAlign', labelAlign)

  const direction = {
    top: 'column',
    right: 'row-reverse',
    bottom: 'column-reverse',
    left: 'row',
  }

  const labelAlignment = direction[labelAlign] || 'column';
  console.log('labelAlignment', labelAlignment)
 return (
  <div 
  style={{
      display: 'flex', 
      flexDirection: labelAlignment, 
      border: '1px solid green', 
      minWidth: 0,
      alignItems: 'center',
      gap: labelAlignment.includes('row') ? 12 : 0
    }}
  >    

      <input type="radio" id="html" name={name?.split(" ").join("_")} value="HTML" />
    
      <ContentEditable
        html={label} // innerHTML of the editable div
        onChange={(e) => handleEditLabel({value: e.target.value, fieldIndex, colId})} // handle innerHTML change
      />    
      </div>
  )
}

const Checkbox = () => {
  return (
    <div>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
      <label for="vehicle1"> I have a bike</label>
    </div>
  )
}




const Column = (props) => {
  const {
    rowIndex,
    handleToggleWidth,
    colIndex,
    col,
    handleEditLabel
  } = props;
  const { myfields } = useContext(FormBuilderContext);

    const renderFieldType = (name, field, fieldIndex) => {
      const fieldTypes = {
        input: <Input 
          handleEditLabel={handleEditLabel}
          colId={col.id}
          value={field.value}
          fieldIndex={fieldIndex}
          label={field.label}
          subType={field.subType}
          required={false}
          labelAlign={field.labelAlign}
          subFields={field.subFields}
          checked={field.defaultValue}
          name={field.name}
        />,
        checkbox: <Checkbox
          handleEditLabel={handleEditLabel}
          colId={col.id}
          fieldIndex={fieldIndex}
          label={field.label}
          subType={field.subType}
          required={false}
          name={name}
        />,
        radio: <Radio        
          handleEditLabel={handleEditLabel}
          colId={col.id}
          fieldIndex={fieldIndex}
          label={field.label}
          subType={field.subType}
          required={false}
          name={name}
          labelAlign={field.labelAlign}
        />
      }
      return fieldTypes[field.type] || "";
    }
  
    return ( 
    

                      <Draggable
                        key={col.id}
                        style={{
                          width: col.half ? '50%' : '100%',
                        }}
                      >
                        <div
                          style={{
                            border: '1px dashed black',
                            display: 'flex',
                            // flex: 1
                            
                          }}
                        >
                          <button
                            onClick={() => handleToggleWidth(rowIndex, colIndex)}
                          >{col.half ? 'Expand' : 'Shrink'}</button>
                          
                          <div style={{
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            flexDirection:`${col.direction || 'row'}`, 
                            gap: 8, 
                            flex: '1', // sets to full width
                            minWidth: 0 // prevents overflow
                            }}>
                          {myfields[col.id].map((field, fieldIndex) => {
                              return (
                                <div key={ fieldIndex } 
                                style={{minWidth: 0, flex: '1'}}
                                >
                                  {renderFieldType(col.name, field, fieldIndex)}
                             

                              </div>
                              )
                            })}
                            </div>
                        </div>
                      </Draggable>
    );
}

export default Column;
