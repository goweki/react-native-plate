import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Theme } from '../core/theme';

export default function Dropdown({ errorText, description, ...props }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Loading...', value: 'Loading'},
    /*{label: 'Banana', value: '2'},
    {label: 'Apple', value: '3'},
    {label: 'Banana', value: '4'},
    {label: 'Apple', value: '5'},
    {label: 'Banana', value: '6'},
    {label: 'Apple', value: '7'},
    {label: 'Banana', value: '8'},
    {label: 'Apple', value: '9'},
    {label: 'Banana', value: '10'}*/
  ]);

  useEffect(() => {
    async function loadDropDownData(){
      //fetch data and store in items...
    }

    
  },[]);

  return (
    <DropDownPicker
      placeholderStyle={{ color: Theme.colors.grayFade2, fontWeight: "normal" }}
      dropDownContainerStyle = {{ backgroundColor: Theme.colors.grayFade3, zIndex: 5050 }}
      searchTextInputProps = {{ maxLength: 8 }}
      searchPlaceholder="Search..."
      searchTextInputStyle={{ color: Theme.colors.grayFade2, borderColor:Theme.colors.grayFade2}}
      searchContainerStyle={{borderBottomColor: "transparent" }}
      open={open}
      searchable={true}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      {...props}
      />
  );
}