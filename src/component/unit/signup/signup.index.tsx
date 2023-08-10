import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (!e.target.value.includes('@')) {
            setEmailError('@를 포함하게 다시 입력 바랍니다!');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', {
                    email,
                    password
                });
                // user@user.com
                // 12345678
    
                alert('회원가입이 완료되었습니다.');
                navigate("/signin");
                
            } catch (error) {
                console.error('API 요청 중 오류가 발생했습니다:', error);
                alert('회원가입 중 에러가 발생했습니다.');
            }
        } else {
            alert('이메일/비밀번호를 다시 확인하세요.');
        }
    };
    

    return (
        <div className="signup-form">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">이메일:</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="이메일을 입력하세요" 
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
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <br />

                <button 
                    type="submit"
                    disabled={!isFormValid()}
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Signup;
