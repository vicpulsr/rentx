import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Form,
    Footer
} from './styles';

export function SignIn() {
    const theme = useTheme();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail é obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('A senha é obrigatória')
            });

            await schema.validate({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message)
            } else {
                Alert.alert(
                    'Opa',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                );
            }
        }
    };

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    };

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle='dark-content'
                        translucent
                        backgroundColor='transparent'
                    />
                    <Header>
                        <Title>
                            Estamos {'\n'}quase lá.
                        </Title>
                        <Subtitle>
                            Faça seu login para começar {'\n'}
                            uma experiência incrível.
                        </Subtitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />

                        <Button
                            title="Criar conta gratuíta"
                            color={theme.colors.background_secondary}
                            light
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}