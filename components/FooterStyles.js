import styled from 'styled-components';

export const Box = styled.div`
  padding: 20px 0px;
  background: linear-gradient(rgba(245, 221, 245), rgba(243, 190, 169));
  position: relative;
  bottom: 0;
  width: 100%;
  // margin-bottom: 10px;
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: rgba(60, 51, 79, 1);
  margin-bottom: 15px;
  font-size: 17px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: rgba(60, 51, 79, 1);
  margin-bottom: 20px;
  font-weight: bold;
`;
