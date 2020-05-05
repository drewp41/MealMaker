import React from 'react';
import {
    Card, Skeleton
} from 'antd';
import {
    SyncOutlined, MenuOutlined,
    PushpinOutlined, PushpinFilled
} from '@ant-design/icons';

const mainTextColor = '#32323c';


function MealCardTitle(props) {
    return <>
        Breakfast &nbsp;&nbsp;
        <span style={{ color: '#606060' }}>
            <SyncOutlined className='regenIcon' />
            &nbsp;&nbsp;&nbsp;
            <PushpinOutlined className='pinIcon' />
        </span>
    </>;
}

class MealCard extends React.Component {

    regenMeal = () => {
        this.props.regenMeal(this.props.mealNum);
    }

    pinMeal = () => {
        this.props.pinMeal(this.props.mealNum);
    }

    render() {
        return (
            <Card className='cardShadow2' title={
                this.props.mealNum === 1 ? (
                    this.props.numMeals === 1 ?
                        'Feast'
                        : (this.props.numMeals === 2 ?
                            'Brunch'
                            :
                            'Breakfast'))
                    : this.props.mealNum === 2 ? (
                        this.props.numMeals === 2 ?
                            'Dinner'
                            :
                            'Lunch')
                        : this.props.mealNum === 3 ?
                            'Dinner'
                            : 'Snack'
            }
                extra={this.props.mealObj.meal.calories + this.props.mealObj.side.calories + ' calories'}
                style={{ width: 350, height: 200 }} bordered={false}
                headStyle={{ fontFamily: 'Camphor', fontWeight: 400, color: mainTextColor }}>
                <Skeleton avatar={false} loading={!this.props.displayMeals && !this.props.mealObj.pinned} title={false}
                    active={this.props.loadingMeals}
                    paragraph={{ rows: 3, width: [250] }} >
                    <div className='mealCard' style={{ margin: '-10px 0 0 0' }}>
                        <div style={{ float: 'right', fontSize: '18px', color: '#606060' }}>
                            {this.props.mealObj.loading ? <SyncOutlined spin className='regenIcon' onClick={() => this.regenMeal(1)} /> :
                                <SyncOutlined className='regenIcon' onClick={() => this.regenMeal(1)} />}
                    &nbsp;&nbsp;&nbsp;
                    {this.props.mealObj.pinned ? <PushpinFilled className='pinIcon' onClick={() => this.pinMeal(1)} /> :
                                <PushpinOutlined className='pinIcon' onClick={() => this.pinMeal(1)} />}
                        </div>
                        <div className='ant-card-meta-title' style={{ margin: '0 0 5px 0' }}>
                            {this.props.mealObj.meal.name}
                        </div>
                        <p className='ant-card-meta-description'>
                            C: {this.props.mealObj.meal.carbs}
                    , P: {this.props.mealObj.meal.protein}
                    , F: {this.props.mealObj.meal.fat}
                        </p>
                        {this.props.mealObj.side.name && <>
                            <div className='ant-card-meta-title' style={{ margin: '-8px 0 5px 0' }}>
                                {this.props.mealObj.side.name}
                            </div>
                            <p className='ant-card-meta-description'>
                                C: {this.props.mealObj.side.carbs}
                        , P: {this.props.mealObj.side.protein}
                        , F: {this.props.mealObj.side.fat}
                            </p>
                        </>}
                    </div>
                </Skeleton>
            </Card >
        );
    }
}

export default MealCard;

    // setTitle() {
    //     if (this.props.mealNum === 1) {
    //         if (this.props.numMeals === 1)
    //             'Feast';
    //         else if (this.props.numMeals === 2)
    //             'Brunch';
    //         else
    //             'Breakfast';
    //     } else if (this.props.mealNum === 2) {
    //         if (this.props.numMeals === 2)
    //             'Dinner';
    //         else
    //             'Lunch';
    //     } else if (this.props.mealNum === 3) {
    //         'Dinner';
    //     } else
    //         'Snack';
    // }