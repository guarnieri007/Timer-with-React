import styled from "styled-components";
export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme["gray-100"]};
    }
`;

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th{
            background-color: ${props => props.theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme["gray-100"]};
            font-size: 0.75rem;
            line-height: 1.6;
            text-align: center;
            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
                text-align: left;
            }
            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
            }
            
            td {
                background-color: ${props => props.theme["gray-700"]};
                border-top: 4px solid ${props => props.theme["gray-800"]};
                padding: 1rem;
                font-size: 0.875rem;
                line-height: 1.6;
                text-align: center;
                &:first-child {
                    padding-left: 1.5rem;
                    width: 50%;
                    text-align: left
                }
                &:last-child {
                    padding-right: 1.5rem;
                }
        }
    }
`
export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content:'';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background-color: ${(props) => props.theme[STATUS_COLORS[props.statuscolor]]};
    }
`

export const Button = styled.button<StatusProps>`
    font-size: 11px;
    font-weight: lighter;
    padding: 8px;
    border-radius: 8px;
    background-color: ${(props) => props.theme[STATUS_COLORS[props.statuscolor]]};
    color: white;
    border: none;
    cursor: pointer;
    &:disabled {
        background-color: ${(props) => props.theme["gray-500"]};
        color: ${(props) => props.theme["red-700"]};
        cursor: not-allowed;
    }
`

const STATUS_COLORS = {
    yellow: "yellow-500",
    green: "green-500",
    red: "red-500",
} as const

export interface StatusProps {
    statuscolor: keyof typeof STATUS_COLORS;
}