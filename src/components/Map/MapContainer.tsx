import React from "react";
import { NaverMap } from "react-naver-maps"; // 패키지 불러오기

const NaverMapAPI = () => {
  return (
    <NaverMap
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: "100%", // 네이버지도 가로 길이
        height: "85vh", // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
      defaultZoom={15} // 지도 초기 확대 배율
    />
  );
};

export default NaverMapAPI;
