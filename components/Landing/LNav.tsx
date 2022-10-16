import React, {useState} from "react";
import styled from "styled-components";
import Link from "next/link";

const LNav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const Nav = styled.nav`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      z-index: 100;
      top: 0;
      left: 0;
      right: 0;
      @media (max-width: 768px) {
        flex-direction: column;

      }
    `

    const NavList = styled.ul`
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 72px;
      @media (max-width: 768px) {
        flex-direction: column;
        padding: 1rem 0;
        width: 100%;
        gap: 0;
        display: ${showMenu ? "flex" : "none"};
      }

    `;
    const NavItem = styled.li`
      font-size: 1.2rem;
      font-weight: 500;
      color: #000;
      cursor: pointer;
      transition: all 0.3s ease-in-out;


      @media (max-width: 768px) {
        width: 100%;
        text-align: center;
        padding: 1rem 0;
        border-bottom: 1px solid #ccc;
      }
    `;
    const NavItemLink = styled(Link)`
      text-decoration: none;
      color: inherit;
    `;

// nav brand
    const Brand = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `;
    const BrandLink = styled.a`
      text-decoration: none;
      color: inherit;
    `;

    const BrandLogo = styled.img`
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      @media (max-width: 768px) {
        width: 50px;
        height: 50px;
      }
    `;

// burger menu
    const Burger = styled.div`
      display: none;
      @media (max-width: 768px) {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        z-index: 20;
        cursor: pointer;
        span {
          display: block;
          width: 100%;
          height: 0.25rem;
          background: #000;
          border-radius: 10px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          transition: all 0.3s ease;

          &:nth-child(1) {
            top: 25%;
          }

          &:nth-child(3) {
            top: 75%;
          }
        }
      }
    `;
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
      width: 100%;
      height: 52px;

    `;
    const burgerClickHandler = () => {
        setShowMenu(!showMenu);

    }
    return (
        <>
            <Nav>
                <Brand>
                    <BrandLink href="/">
                        <BrandLogo src="/images/tst-logo-100.png" alt="logo"/>
                    </BrandLink>
                </Brand>

                <NavList>
                    <NavItem>
                        <NavItemLink href="#">Trang chủ</NavItemLink>
                    </NavItem>
                    <NavItem>
                        <NavItemLink href="#">Giới thiệu</NavItemLink>
                    </NavItem>
                    <NavItem>
                        <NavItemLink href="#">Liên hệ</NavItemLink>
                    </NavItem>
                </NavList>
                <NavList>
                    <NavItem>
                        <NavItemLink href="#">
                            <JoinUsButton>Tham gia</JoinUsButton>
                        </NavItemLink>
                    </NavItem>

                </NavList>
                <Burger onClick={burgerClickHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Burger>
            </Nav>

        </>
    );
}
export default LNav;