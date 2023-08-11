import React, { useEffect, useState } from 'react';
import apiInstance from '../../../api/apiInstance';
import * as S from './todo.styles';

type Todo = {
    id: number;
    todo: string;
    isCompleted: boolean;
    userId?: number;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingContent, setEditingContent] = useState<string>('');

    useEffect(() => {
        // 투두 항목들 로드(getTodos)
        const fetchTodos = async () => {
            try {
                const response = await apiInstance.get('/todos');
                setTodos(response.data);
            } catch (error) {
                console.error('목록 조회 중 에러:', error);
            }
        };

        fetchTodos();
    }, []);
    
    //새 todo입력 핸들러
    const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };

    // 수정 내용 변경 입력 핸들러
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingContent(e.target.value);
    };

    //todolist 추가(createTodo)
    const handleAddTodo = async () => {
        try {
            const response = await apiInstance.post('/todos', { todo: newTodo });
            const newTodoItem: Todo = {
                id: response.data.id,
                todo: response.data.todo, 
                isCompleted: response.data.isCompleted,
                userId: response.data.userId
            };
            console.log(newTodoItem);
            setTodos([...todos, newTodoItem]);
            setNewTodo('');
            console.log('추가가 잘 되었습니다')
        } catch (error) {
            console.error('추가 중에 에러:', error);
        }
    };


    //todo완료 상태 토글 핸들러
     const toggleTodoCompletion = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    };

    //삭제(deleteTodo)
    const handleDeleteTodo = async (id: number) => {
        try {
            await apiInstance.delete(`/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
            console.log('지우기 성공')
        } catch (error) {
            console.error('지우는 중 에러 발생:', error);
        }
    };

    //수정(updateTodo) 
    const startEditing = (id: number, todo: string) => {
        setEditingId(id);
        setEditingContent(todo);
    };


    //수정 제출
    const submitEdit = async () => {
        if (editingId !== null) {
            const todoToUpdate = todos.find(todo => todo.id === editingId);
            if (todoToUpdate) {
                try {
                    const response = await apiInstance.put(`/todos/${editingId}`, {
                        todo: editingContent,
                        isCompleted: todoToUpdate.isCompleted
                    });
    
                    // 서버에서 응답받은 데이터로 상태 업데이트
                    setTodos(todos.map(todo => todo.id === editingId ? response.data : todo));
                    console.log(response.data);
                    console.log('수정 성공');
                } catch (error) {
                    console.error('수정 중 에러:', error);
                }
            }
            setEditingId(null);
            setEditingContent('');
        }
    }

    //수정 취소
    const cancelEdit = () => {
        setEditingId(null);
        setEditingContent('');
    };
    

    return (
        <S.Container>
            <S.StyledInput data-testid="new-todo-input" value={newTodo} onChange={handleNewTodoChange} />
            <S.StyledButton data-testid="new-todo-add-button" onClick={handleAddTodo}>추가</S.StyledButton>
            <S.TodoListItems>
                {todos.map(todo => (
                    <S.TodoItem key={todo.id}>
                        {editingId === todo.id ? (
                            //투두 수정 중일 때
                            <>
                                <S.StyledInput data-testid="modify-input" value={editingContent} onChange={handleEditChange} />
                                <S.StyledButton data-testid="submit-button" onClick={submitEdit}>제출</S.StyledButton>
                                <S.StyledButton data-testid="cancel-button" onClick={cancelEdit}>취소</S.StyledButton>
                            </>
                        ) : (
                            //수정 중이 아닐 때
                            <>
                                <S.Label>
                                    <input type="checkbox" checked={todo.isCompleted} onChange={() => toggleTodoCompletion(todo.id)} />
                                    <span>{todo.todo}</span>
                                </S.Label>
                                <S.StyledButton data-testid="modify-button" onClick={() => startEditing(todo.id, todo.todo)}>수정</S.StyledButton>
                                <S.StyledButton data-testid="delete-button" onClick={() => handleDeleteTodo(todo.id)}>삭제</S.StyledButton>
                            </>
                        )}
                    </S.TodoItem>
                ))}
            </S.TodoListItems>
        </S.Container>
    );
};

export default TodoList;
