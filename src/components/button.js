import { View, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { Theme } from '../core/theme';

export default function Button({mode, style, ...props}) {
  return (
    <PaperButton
      style={[
        styles.button,
        //backgroundColor= Theme.colors.secondary,
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      color={Theme.colors.primary}
      {...props}
    />
  );
}

export function ButtonFill({mode, style, ...props}) {
  return (
    <View style={styles.wide}>
    <PaperButton
      style={[
        styles.button,
        //backgroundColor= Theme.colors.secondary,
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      color={Theme.colors.primary}
      {...props}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    //width: '75%',
    width: '100%',
    margin: 32,
    paddingVertical: 2,
  },
  text: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  wide: {
    width: '100%',
    margin: 32,
    paddingVertical: 2,
    //flex: 1,
    //backgroundColor:Theme.colors.primaryAscent,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
