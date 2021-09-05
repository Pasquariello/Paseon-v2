import shortid from 'shortid';

export const buildArrayMatrix = (array) => {
let tempArray = [];
const arrayCopy = array;

// Build Matrix from array list based on element row
arrayCopy.map((el, index) => {
    if (tempArray[el.row]){
        tempArray[el.row].splice(el.col, 0, el)
        return el

    } else {
        tempArray.push([el])
        return {...el, row: tempArray.length - 1 }
    }
});
console.log('formModel(tempArray)', formModel(tempArray))
// this on is calling the name form 
// dispatch(addNewFieldAction(formModel(tempArray)))
return formModel(tempArray)
}


// transform above matrix into array of rows
// update column index to be sequential and set row to correct index
export const formModel = (arr) => {
    return arr.map((row, rowIndex) => {
    return {
        // id: `${rowIndex}`,
        id: shortid.generate(),
        subItems: row.map((formField, formFieldIndex) => {
            const { label, name, type, _id, width } = formField
    
            return {
                id: _id?.$oid ? _id?.$oid : formField.id, //shortid.generate(),
                label,
                name,
                type,
                col: formFieldIndex, 
                row: rowIndex,
                width,
            }
        })
    }
    }) 
}
  