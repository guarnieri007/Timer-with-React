import styled from "styled-components";

export const CountdownContainer = styled.div`
    font-family: "Roboto Mono", monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${p => p.theme["gray-100"]};

    display: flex;
    gap: 1rem;

    span {
        background: ${props => props.theme["gray-700"]};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
    @media (max-width: 900px) {
        width: auto;
        font-size: 24px;
        line-height: 10px;

        span {
            padding: 10px;
            align-self: center;
        }
    }
`;

export const Separator = styled.div`
    padding: 2rem 0px;
    color: ${props => props.theme["green-500"]};
    width: 4rem;
    display: flex;
    justify-content: center;
`;