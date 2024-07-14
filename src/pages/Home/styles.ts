import styled from "styled-components"

export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
        width: 65%;
    }
`;




export const BaseCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;
    

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
cursor: pointer;
    background: ${p => p.theme["green-500"]};
    color: ${p => p.theme["gray-100"]};

    &:not(:disabled):hover {
        background: ${p => p.theme["green-700"]};
    }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
cursor: pointer;
    background: ${p => p.theme["red-500"]};
    color: ${p => p.theme["gray-100"]};

    &:not(:disabled):hover {
        background: ${p => p.theme["red-700"]};
    }
`

export const StartAlarmButton = styled(BaseCountdownButton)`
cursor: pointer;
    background: ${p => p.theme["yellow-500"]};
    color: ${p => p.theme["gray-600"]};

    &:not(:disabled):hover {
        background: ${p => p.theme["yellow-700"]};
        color: ${p => p.theme["gray-100"]};
    }
`