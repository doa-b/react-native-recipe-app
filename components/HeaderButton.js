import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import COLORS from '../constants/Colors'

import {StyleSheet, View, Text} from 'react-native';

/**
 * Created by Doa on 26-3-2020.
 */

const CustomHeaderButton = props => {
    return (
        <HeaderButton {...props}
                      IconComponent={Ionicons}
                      iconSize={23}
                      color={Platform.OS === 'android' ? 'white' : COLORS.primaryColor}/>
    )
};

export default CustomHeaderButton;