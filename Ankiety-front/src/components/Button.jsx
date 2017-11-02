import styled from "styled-components"

export default styled.button`
    background: none !important;
    font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 1px solid #83878D;
	border-radius: 3px;
    margin: 0 -70px; 
    position:absolute;
    bottom:0; 
    left:50%;
    margin-bottom: 20px;
    font-size: 24px;
    color: #83878D;
    &:hover{
        color: white;
        border-color: white;
    }
    @media screen and (max-width: 768px) {
        color: white;
    }
`