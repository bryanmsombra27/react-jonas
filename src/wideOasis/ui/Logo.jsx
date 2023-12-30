import styled from "styled-components";
import { useDarkmodeContext } from "../context/DarkmodeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkmodeContext()
  const src = isDarkMode ? "/img-wildOasis/logo-dark.png" : "/img-wildOasis/logo-light.png"

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
