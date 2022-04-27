import React, { useState } from 'react';

import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler';

import {
    Container,
    IconContainer,
    InputText,
} from './styles';

interface Props extends TextInputProps {
    iconName: string;
    value?: string;
};

export function PasswordInput({
    iconName,
    value,
    ...rest
}: Props) {
    const theme = useTheme();

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    };

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    };

    function handlePasswordVisibilityChange() {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <Container>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                {...rest}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                secureTextEntry={isPasswordVisible}
                isFocused={isFocused}
            />

            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer>
                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        color={theme.colors.text_detail}
                        size={24}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}