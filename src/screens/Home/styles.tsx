import styled from 'styled-components/native';

import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { CarDTO } from '../../dtos/CarDTO';
import { FlatListProps } from 'react-native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;

    font-family:  ${({ theme }) => theme.fonts.secondary_600};
    background-color: ${({ theme }) => theme.colors.shape_dark};

    justify-content: center;
    padding: 32px 24px;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 32px;
`;

export const TotalCars = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(
    FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>
    ).attrs({
    contentContainerStyle: {
        padding: 24,
        paddingBottom: getBottomSpace()
    },
    showVerticalScrollIndicator: false
})``;