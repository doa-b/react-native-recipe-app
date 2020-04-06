import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { useSelector } from "react-redux";
import MealItem from "./MealItem";

/**
 * Created by Doa on 3-4-2020.
 */
const MealList = props => {
    const favoriteMeals = useSelector(state=> state.meals.favoriteMeals);

    const RenderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return <MealItem
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetail',
                    params: {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite
                    }
                })
            }}
            meal={itemData.item}/>
    };

    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={props.listData}
                renderItem={RenderMealItem}
                style={{width: '100%'}}/>
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});

export default MealList;