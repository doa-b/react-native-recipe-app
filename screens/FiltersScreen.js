import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Switch, Platform} from 'react-native';
import { useDispatch } from "react-redux";

import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

import COLORS from "../constants/Colors";
import {setFilters} from "../store/actions/meals";

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>{props.label}</Text>
            <Switch
                trackColor={{true: COLORS.primaryColor}}
                thumbColor={Platform.OS === 'android' ? COLORS.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange}/>
        </View>
    )
};

const FiltersScreen = props => {

    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        vegetarian: isVegetarian,
    };
     dispatch(setFilters(appliedFilters));
  }, [isVegetarian, isVegan, isLactoseFree, isGlutenFree, dispatch]);

  useEffect(()=> {
      navigation.setParams({save: saveFilters});
  }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available filters / restrictions</Text>
            <FilterSwitch
                label={'Gluten-free'}
                state={isGlutenFree}
                onChange={setIsGlutenFree}/>
            <FilterSwitch
                label={'Lactose-free'}
                state={isLactoseFree}
                onChange={setIsLactoseFree}/>
            <FilterSwitch
                label={'Vegan'}
                state={isVegan}
                onChange={setIsVegan}/>
            <FilterSwitch
                label={'Vegetarian'}
                state={isVegetarian}
                onChange={setIsVegetarian}/>
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },
    filterLabel: {
        fontFamily: 'open-sans',
        fontSize: 18
    }
});
FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    }
};

export default FiltersScreen;
