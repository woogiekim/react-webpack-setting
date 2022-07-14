import React from "react";
import {Link} from "react-router-dom";
import styled from "@emotion/styled";

const StyledHeader = styled.div`
  background-color: hotpink;
`

const Header = () => {
    return (
        <StyledHeader>
            <ul>
                <li>
                    <Link to='home'>Home</Link>
                </li>
                <li>
                    <Link to='test'>Test</Link>
                </li>
            </ul>
        </StyledHeader>
    )
}

export default Header