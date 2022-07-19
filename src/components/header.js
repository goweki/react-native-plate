import { Text, StyleSheet } from 'react-native';
import { Theme } from '../core/theme';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:'row',
        textAlignVertical: 'center',
        fontSize: 21,
        color: Theme.colors.primary,
        fontWeight: 'bold',
        //backgroundColor:Theme.colors.secondary,
        maxHeight:60,
      },
});
  