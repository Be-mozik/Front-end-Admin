  import styled from 'styled-components';

  export const Container = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 70%;
  `;

  export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` 
  : null}
  `;


  export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
  `;

  export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  `;

  export const Title = styled.h1`
  font-weight: bold;
  `;

  export const Image = styled.img`
    margin: 10px;
    height: 150px;
  `;

  export const Input = styled.input`
    background-color: transparent;
    background: #eaeaea;
    border-radius: 15px;
    border:0.5px solid #3DBEE9;
    outline: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    font-size: 14px;
    font-family: 'HelveticaCn';
    letter-spacing: 1px;
  `;


  export const Button = styled.button`
    border-radius: 15px;
    border: none;
    background-color: #EB8218;
    color: #ffffff;
    font-size: 14px;
    font-family: 'HelveticaCn';
    padding: 12px 45px;
    letter-spacing: 1px;
    transition: transform 80ms ease-in;
    cursor: pointer;
    margin: 15px 0;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
  `;

export const IconApi = styled.button`
  margin: 0 10px;
  padding: 12px 45px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: #ffffff;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

  export const ApiContainer = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
  `;

  export const GoogleButton = styled(IconApi)`
    background-color: #db4437;
  `;

  export const FacebookButton = styled(IconApi)`
    background-color: #4267b2;
  `;

  export const GhostButton = styled(Button)`
  border: 1px solid #ff4b2b;
  background-color: transparent;
  border-color: #ffffff;
  margin: 10px 0;
  `;

  export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  `;
  export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props =>
  props.signinIn !== true ? `transform: translateX(-100%);` : null}
  `;

  export const Overlay = styled.div`
  background: #00639C;
  background: -webkit-linear-gradient(to right, #00639C, #327EC2);
  background: linear-gradient(to right, #00639C, #327EC2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
  `;

  export const OverlayPanel = styled.div`
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      top: 0;
      height: 100%;
      width: 50%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
  `;

  export const LeftOverlayPanel = styled(OverlayPanel)`
    transform: translateX(-20%);
    ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
  `;

  export const RightOverlayPanel = styled(OverlayPanel)`
      right: 0;
      transform: translateX(0);
      ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
  `;

  export const Paragraph = styled.p`
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
    font-family: 'HelveticaCn'
  `;

  export const ParagraphInter = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  font-family: 'HelveticaCn'
`;