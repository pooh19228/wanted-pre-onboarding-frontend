import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledInput = styled.input`
    width: 70%;
    padding: 8px 10px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    &:focus {
        outline-color: #50a3a2;
    }
`;

export const StyledButton = styled.button`
    background-color: #50a3a2;
    color: white;
    border: none;
    border-radius: 4px;
    margin-left: 10px;
    padding: 8px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #3f7f7f;
    }
    &:disabled {
        background-color: #dcdcdc;
        cursor: not-allowed;
    }
`;

export const TodoListItems = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 20px;
`;

export const TodoItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 12px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #e5e5e5;
    }
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
`;