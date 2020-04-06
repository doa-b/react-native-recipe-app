import React from 'react';
import {Platform, Text} from "react-native";
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from "react-navigation";

import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";

import COLORS from "../constants/Colors";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primaryColor
};

const MealsNavigator = createStackNavigator({
        Categories: {
            screen: CategoriesScreen,
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealDetailScreen
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const favNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: Platform.OS === 'android'
                ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>
                : 'Meals',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: COLORS.primaryColor,
        }
    },
    Favorites: {
        screen: favNavigator,
        navigationOptions: {
            tabBarLabel: Platform.OS === 'android'
                ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
                : 'Favorites',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-star"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: COLORS.accentColor
        }
    }
};

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig,
        {
            activeColor: 'white',
            shifting: true,
        }
    )
    : createBottomTabNavigator(
        tabScreenConfig,
        {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans'
                },
                activeTintColor: COLORS.accentColor
            }
        });

const filtersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    });

const MainNavigator = createDrawerNavigator({
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {drawerLabel: 'Meals'}
        },
        Filters: filtersNavigator
    }, {
        contentOptions: {
            activeTintColor: COLORS.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }

    }
);

export default createAppContainer(MainNavigator)