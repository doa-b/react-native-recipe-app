import React from 'react';
import {StyleSheet, Text} from 'react-native';

/**
 * Created by Doa on 3-4-2020.
 */

const DefaultText = props => {
    return (
        <Text style={styles.text}>
            {props.children}
        </Text>
    )
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
});

export default DefaultText;