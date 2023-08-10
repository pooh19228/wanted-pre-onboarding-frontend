import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
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
        <div className="login-form">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">이메일:</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="이메일을 입력하세요" 
                    data-testid="email-input" 
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <br />

                <label htmlFor="password">비밀번호:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="비밀번호를 입력하세요" 
                    data-testid="password-input" 
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <br />

                <button 
                    type="submit"
                    data-testid="signin-button" 
                    disabled={!isFormValid()}
                >
                    로그인
                </button>
            </form>
        </div>
    );
}

export default Login;
