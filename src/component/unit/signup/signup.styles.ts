import styled from 'styled-components';

export const Container = styled.div`
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 8px;
`;

export const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    transition: border-color 0.2s;

    &:focus {
        border-color: #007BFF;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 12px;
    margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #e1e1e1;
        cursor: not-allowed;
    }
`;