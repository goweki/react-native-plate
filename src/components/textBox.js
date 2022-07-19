import { Text, StyleSheet, View } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { Theme } from '../core/theme';

export default function TextInput({ errorText, description, ...props }) {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={Theme.colors.grayFade}
                activeUnderlineColor = {Theme.colors.secondaryLight}
                mode="flat"
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      maxWidth:500,
      marginVertical: 16,
      //backgroundColor: Theme.colors.grayFade,
    },
    input: {
      //backgroundColor: Theme.colors.secondaryLight,
    },
    description: {
      fontSize: 13,
      color: Theme.colors.primaryFade,
      paddingTop: 8,
    },
    error: {
      fontSize: 13,
      color: Theme.colors.error,
      paddingTop: 8,
    },
  });
  