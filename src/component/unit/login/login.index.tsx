import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../signup/signup.styles';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (!e.target.value.includes('@')) {
            setEmailError('@를 포함해서 다시 입력 바랍니다!');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setPasswordError('8자 이상 입력해주세요');
        } else {
            setPasswordError('');
        }
    };

    const isFormValid = () => {
        return email.includes('@') && password.length >= 8;
    };

    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                const response = await axios.post(
                    'https://www.pre-onboarding-selection-task.shop/auth/signin',
                    { email, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200 && response.data.access_token) {
                    alert('로그인에 성공했습니다.');
                     localStorage.setItem('access_token', response.data.access_token);
                     navigate('/todo');
                } else {
                    alert('로그인에 실패했습니다.');
                }
            } catch (error) {
                alert('이메일/비밀번호를 다시 확인하세요.');
            }
        } else {
            alert('이메일/비밀번호를 다시 확인하세요.');
        }
    };

    return (
        <S.Container>
            <S.Title>로그인</S.Title>
            <S.Form onSubmit={handleSubmit}>
                <S.Label htmlFor="email">이메일:</S.Label>
                <S.Input 
                    type="email" 
                    id="email" 
                    placeholder="이메일을 입력하세요" 
                    data-testid="email-input" 
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailError && <S.ErrorText>{emailError}</S.ErrorText>}
                
                <S.Label htmlFor="password">비밀번호:</S.Label>
                <S.Input 
                    type="password" 
                    id="password" 
                    placeholder="비밀번호를 입력하세요" 
                    data-testid="password-input" 
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordError && <S.ErrorText>{passwordError}</S.ErrorText>}
                
                <S.SubmitButton 
                    type="submit"
                    data-testid="signin-button" 
                    disabled={!isFormValid()}
                >
                    로그인
                </S.SubmitButton>
            </S.Form>
        </S.Container>
    );
}

export default Login;
