import React from "react";
import styled from "styled-components";
import LNav from "./LNav";
import Link from "next/link";
import Head from "next/head";
import MyNav from "../MyNav";

const LandingPage = () => {



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


    return (
        <>
            <Head>
                <title>Khoa học trẻ TST – Chắp cánh ước mơ Khơi nguồn sáng tạo</title>
                <meta name="description" content="Khoa học trẻ TST – Chắp cánh ước mơ Khơi nguồn sáng tạo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <LNav/>
                <Section>
                    <Row>
                        <ColumnThirty>
                            <Hero>

                                <BigText>Chắp Cánh Ước Mơ Khơi Nguồn Sáng Tạo</BigText>

                                <SmallText>Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng
                                    người.</SmallText>

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
                                <BigText>Thỏa Sức Vui Chơi, Sáng Tạo Phát Triển</BigText>
                                <SmallText>Sự phát triển toàn diện của con người là mục tiêu của chúng tôi, vì vậy chúng
                                    tôi luôn cố gắng mang đến cho các bạn những kiến thức, kỹ năng, và trải nghiệm thú
                                    vị nhất. Chúng tôi tin rằng, nếu bạn có thể học được những kiến thức, kỹ năng, và
                                    trải nghiệm thú vị, bạn sẽ có thể phát triển toàn diện hơn.</SmallText>

                            </Hero>
                        </ColumnThirty>

                    </Row>
                </Section>
                <Section style={{"backgroundColor": "#3282B8"}}>
                    <Row style={{"backgroundColor": "#3282B8"}}>
                        <ColumnThirty>
                            <Hero>
                                <BigText style={{"color": "white"}}>Tương Lai Của Bạn Và Chúng Tôi</BigText>
                                <SmallText style={{"color": "white"}}>Những đứa trẻ hiện nay đang trải qua một thời đại
                                    đầy thử thách. Nhưng với sự
                                    sáng tạo và sự đam mê của các bạn, chúng tôi tin rằng, các bạn sẽ có thể đạt được
                                    mục tiêu của mình.
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

export default LandingPage;