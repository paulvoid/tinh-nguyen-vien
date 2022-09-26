import React from "react";
import type { FC } from "react";


const MyNav: FC = () => {
    const navBarBurgerButton = () => {
        const burger = document.querySelector(".navbar-burger");
        const menu = document.querySelector(".navbar-menu");
        if (burger && menu) {
            burger.classList.toggle("is-active");
            menu.classList.toggle("is-active");
        }
    }
    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="/images/tst-logo-100.png" width="100" height="100" />
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample" onClick={navBarBurgerButton}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            TRANG CHỦ
                        </a>


                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                HOẠT ĐỘNG PHONG TRÀO
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    TRÍ THỨC KHOA HỌC TRẺ TÌNH NGUYỆN
                                </a>
                                <a className="navbar-item">
                                    LIÊN HOAN TUỔI TRẺ SÁNG TẠO TP. HCM
                                </a>
                                <a className="navbar-item">
                                    CHƯƠNG TRÌNH TRUYỀN HÌNH SÁNG TẠO TRẺ
                                </a>

                            </div>
                        </div>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                HOẠT ĐỘNG KHOA HỌC
                            </a>
                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    HỘI NGHỊ – HỘI THẢO
                                </a>
                                <a className="navbar-item">
                                    VƯỜN ƯƠM
                                </a>

                                <a className="navbar-item">
                                    DIỄN ĐÀN KHOA HỌC SINH VIÊN QUỐC TẾ
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Đăng ký</strong>
                                </a>
                                <a className="button is-light">
                                    Đăng nhập
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default MyNav;