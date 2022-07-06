import React from 'react';
import HeaderMenu from "./menu";
import HeaderBreadcrumb from "./breadcrumb";
function Header(props) {
    return (
        <div className={'header'}>
            <div className={'headerL'}>
                <HeaderMenu />
            </div>

            <div className="headerC">
                {/*<HeaderBreadcrumb />*/}
                <span style={{color:"white"}}>主页/煎蛋/优评</span>
            </div>

            <div className="headerR">

            </div>

        </div>
    )
}

export default Header;
