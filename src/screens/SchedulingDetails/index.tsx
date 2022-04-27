import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';


import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryType } from '../../utils/getAccesoryType';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
    Footer
} from './styles';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { api } from '../../service/api';
import { Alert } from 'react-native';

interface Params {
    car: CarDTO;
    dates: string[];
};

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
};

export function SchedulingDetails() {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    const { car, dates } = route.params as Params;

    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const rentalTotal = Number(dates.length * car.rent.price);

    async function handleConfirmRental() {
        setLoading(true);
        
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ];

        await api.post('/schedules_byuser', {
            user_id: 1, 
            car,
            startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        });

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id, 
            unavailable_dates
        })
        .then(() => navigation.navigate('Confirmation', {
            title: 'Carro alugado',
            message: `Agora você só precisa ir\naté a concessionária da RENTX\npara pegar o seu automóvel.`,
            nextScreenRoute: 'Home'
        }))
        .catch(() => {
            setLoading(false);
            Alert.alert('Não foi possível confirmar o agendamento')
        });
    };

    function handleBack() {
        navigation.goBack();
    };

    useEffect(() => {
        setRentalPeriod({
            startFormatted: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory 
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryType(accessory.type)}
                            />
                        ))
                    }
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>

                    <Feather
                        name='chevron-right'
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>

                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
};