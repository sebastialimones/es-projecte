import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'; 
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);  // adjust the 60px value to the actual height of your header
  overflow: hidden;
  position: relative;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
  overflow: hidden;
  position: relative;
`;

const SplitPane = styled.div`
  height: 100vh;
  flex: 1;
  background-color: ${(props) => (props.left ? 'white' : 'black')};
`;

const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  user-select: none;
`;

const Text = styled.h1.attrs(props => ({
  style: {
    backgroundImage: `linear-gradient(to right, black ${props.dividerPosition}%, white ${props.dividerPosition}%)`,
  },
}))`
  color: transparent;
  pointer-events: none;
  background-clip: text;
  -webkit-background-clip: text;
  font-size: 4em;
  line-height: 1.2;
  text-align: center;
`;

const DraggableDivider = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  width: 20px;
  cursor: ew-resize;
  z-index: 2;
`;

const LogoContainer = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: calc(50% - 30px);   // Default centered position 
  display: flex;
  display: flex;
  align-items: center;  
  justify-content: center;  
  margin: 0;
  padding: 0;
  background-color: white;
  border-radius: 50%; 
  border: 1px solid lightgray;  
  width: 60px;
  height: 60px;
  z-index: 3;
`;

const ArrowIconForward = styled(ArrowForwardIosIcon)`
  font-size: 2em;
  color: black;
  margin: 0;
  padding: 0;
`;

const ArrowIconBack = styled(ArrowBackIosIcon)`
  font-size: 2em;
  color: black;
  margin: 0;
  padding: 0;
`;

const SecondSectionText = styled(Text)`
  font-size: 2em;  // Adjust the font size as per your preference
`;

const SecondSectionTextContainer = styled(TextContainer)`
  align-items: flex-start;
  padding-left: 20px; // Adjust as needed to give some spacing from the left edge
  justify-content: flex-start;  // Align to the left side of the screen
`;

const HalfHeightSection = styled(Section)`
  height: calc(25vh);
`;

const Divider = styled.div`
  height: 2px;  // Adjust as needed
  background: black;  // Or any other color you prefer
  width: 100%;
`;

const BigText = styled.h1`
  font-size: 10em;  // Adjust the font size as needed
  line-height: 1;
  text-align: center;
  user-select: none;
  pointer-events: none;
`;

const YoText = styled(BigText)`
  color: black;
`;

const TuText = styled(BigText)`
  color: white;
`;

const SplitScreen = () => {
  const [dividerPosition, setDividerPosition] = useState(50); 
  const draggableDividerRef = useRef(null);
  const animationRef = useRef(null);

  const updatePosition = (clientX) => {
    const containerRect = draggableDividerRef.current.parentElement.getBoundingClientRect();
    const newDividerPosition = ((clientX - containerRect.left) / containerRect.width) * 100;
    setDividerPosition(newDividerPosition);
  };

  const handleMouseDown = (e) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    animationRef.current = requestAnimationFrame(() => updatePosition(e.clientX)); 
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const leftStyle = `calc(${dividerPosition}% - 10px)`;
  return (
    <>
      <Section>
        <SplitPane left style={{ flex: `${dividerPosition}%` }} />
        <TextContainer>
          <Text dividerPosition={dividerPosition}>
            Soy Sebastia y trabajo como terapeuta gestalt en Palma de Mallorca y online.
          </Text>
        </TextContainer>
        <DraggableDivider
          ref={draggableDividerRef}
          style={{ left: leftStyle }}
          onMouseDown={handleMouseDown}
        >
        <LogoContainer style={{ left: `calc(${dividerPosition}% - 30px)` }}>
          <ArrowIconBack />
          <ArrowIconForward />
        </LogoContainer>
        </DraggableDivider>
        <SplitPane style={{ flex: `${100 - dividerPosition}%` }} />
      </Section>
      <Divider />
      {/* Second Section */}
        <HalfHeightSection>
        <SplitPane left style={{ flex: `${dividerPosition}%` }} />
        <SecondSectionTextContainer>
          <SecondSectionText dividerPosition={dividerPosition}>
            Entiendo el proceso terapeutico como un encuentro entre dos personas un encuentro entre:
          </SecondSectionText>
        </SecondSectionTextContainer>
        <SplitPane style={{ flex: `${100 - dividerPosition}%` }} />
        </HalfHeightSection>
      {/* Third Section for YO and TU */}
      <Section>
          <SplitPane left style={{ flex: `${dividerPosition}%` }}>
              <YoText>YO</YoText>
          </SplitPane>
          <SplitPane style={{ flex: `${100 - dividerPosition}%` }}>
              <TuText>TU</TuText>
          </SplitPane>
      </Section>
      </>
);
}

export default SplitScreen;