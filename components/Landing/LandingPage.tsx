import React from "react";
import styled from "styled-components";
import LNav from "./LNav";
import Link from "next/link";
import Head from "next/head";

const Container = styled.div`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `;

// header nav responsive

const Section = styled.section`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      @media (max-width: 768px) {
        flex-direction: column;
      }
      min-height: 714px;
      // padding top and bottom 150px
      padding-top: 75px;
      padding-bottom: 75px;
    `;
const Row = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
      background-color: #fff;
      @media (max-width: 768px) {
        flex-direction: column;
      }

    `;
const ColumnHalf = styled.div`


      flex: 50%;
      display: flex;

      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      @media (max-width: 768px) {
        flex: 100%;
      }
    `;
const Hero = styled.div`


    `;
const BigText = styled.h1`
      font-style: normal;
      font-weight: 800;
      font-size: 48px;
      line-height: 160%;
      color: #3282B8;
      width: 522px;
      @media (max-width: 768px) {
        width: 100%;
        font-size: 32px;
      }
      margin-bottom: 32px;
    `;

// 60% Column
const ColumnSixty = styled.div`
      display: block;
      flex-grow: 1;
      flex-shrink: 1;
      flex: 60%;
      padding: 1rem;
      justify-content: center;
      @media (max-width: 768px) {
        flex: 100%;
      }
    `;
const ColumnForty = styled.div`
      display: block;
      flex-grow: 1;
      flex-shrink: 1;
      flex: 40%;
      padding: 1rem;
      justify-content: center;
      @media (max-width: 768px) {
        flex: 100%;
      }
    `;
const ColumnThirty = styled.div`
      display: block;
      flex-grow: 1;
      flex-shrink: 1;
      flex: 30%;
      padding: 1rem;
      justify-content: center;
      @media (max-width: 768px) {
        flex: 100%;
      }
    `;
const Image = styled.img`
      display: block;
      height: auto;
      width: 100%;
      object-fit: cover;
      @media (max-width: 768px) {
        height: 100%;
      }
      position: relative;
      z-index: 1000;

    `;
const SmallText = styled.div`
      font-family: 'Inter', monospace;
      font-size: 18px;
      line-height: 1.6;
      color: #3282B8;
      height: 100%;
      margin-bottom: 32px;
      width: 522px;
      @media (max-width: 768px) {
        width: 100%;
      }
      /* or 32px */
    `;
// blue spare

// Join us
const JoinUsButton = styled.button`
      background: #3282B8;
      border-radius: 10px;
      border: none;
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      padding: 1rem 2rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
      width: 250px;
      height: 60px;

    `;
// More info
const MoreInfoButton = styled.button`
      background: #fff;
      border-radius: 10px;
      border: 2px solid #3282B8;
      color: #3282B8;
      font-size: 18px;
      font-weight: 500;
      padding: 1rem 2rem;
      cursor: pointer;
      width: 80%;
      height: 52px;
      transition: all 0.3s ease-in-out;
      text-decoration: none;

      &:hover {
        transition: all 0.3s ease-in-out;
        background: #3282B8;
        color: #fff;
      }
    `;
const Center = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
    `;
export default function LandingPage(){

    return (
        <>
            <Head>
                <title>Khoa h???c tr??? TST ??? Ch???p c??nh ?????c m?? Kh??i ngu???n s??ng t???o</title>
                <meta name="description" content="Khoa h???c tr??? TST ??? Ch???p c??nh ?????c m?? Kh??i ngu???n s??ng t???o" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <LNav/>
                <Section>
                    <Row>
                        <ColumnThirty>
                            <Hero>

                                <BigText>Ch???p C??nh ?????c M?? Kh??i Ngu???n S??ng T???o</BigText>

                                <SmallText>V?? l???i ??ch m?????i n??m th?? ph???i tr???ng c??y, v?? l???i ??ch tr??m n??m th?? ph???i tr???ng
                                    ng?????i.</SmallText>

                                <Link href="/register">
                                    <JoinUsButton>Tham Gia Ngay</JoinUsButton>
                                </Link>


                            </Hero>

                        </ColumnThirty>
                        <ColumnSixty>
                            <Center>

                                <Image src="/images/img.png"/>
                            </Center>


                        </ColumnSixty>

                    </Row>


                </Section>
                <Section>
                    <Row>
                        <ColumnSixty>
                            <Image src="/images/img-4.png"/>

                        </ColumnSixty>
                        <ColumnThirty>
                            <Hero>
                                <BigText>Th???a S???c Vui Ch??i, S??ng T???o Ph??t Tri???n</BigText>
                                <SmallText>S??? ph??t tri???n to??n di???n c???a con ng?????i l?? m???c ti??u c???a ch??ng t??i, v?? v???y ch??ng
                                    t??i lu??n c??? g???ng mang ?????n cho c??c b???n nh???ng ki???n th???c, k??? n??ng, v?? tr???i nghi???m th??
                                    v??? nh???t. Ch??ng t??i tin r???ng, n???u b???n c?? th??? h???c ???????c nh???ng ki???n th???c, k??? n??ng, v??
                                    tr???i nghi???m th?? v???, b???n s??? c?? th??? ph??t tri???n to??n di???n h??n.</SmallText>

                            </Hero>
                        </ColumnThirty>

                    </Row>
                </Section>
                <Section style={{"backgroundColor": "#3282B8"}}>
                    <Row style={{"backgroundColor": "#3282B8"}}>
                        <ColumnThirty>
                            <Hero>
                                <BigText style={{"color": "white"}}>T????ng Lai C???a B???n V?? Ch??ng T??i</BigText>
                                <SmallText style={{"color": "white"}}>Nh???ng ?????a tr??? hi???n nay ??ang tr???i qua m???t th???i ?????i
                                    ?????y th??? th??ch. Nh??ng v???i s???
                                    s??ng t???o v?? s??? ??am m?? c???a c??c b???n, ch??ng t??i tin r???ng, c??c b???n s??? c?? th??? ?????t ???????c
                                    m???c ti??u c???a m??nh.
                                </SmallText>
                            </Hero>
                        </ColumnThirty>
                        <ColumnSixty>
                            <Image src="/images/img-6.png"/>
                        </ColumnSixty>
                    </Row>
                </Section>


            </Container>
        </>
    );
}
