import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row ">
          {/* about img */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1 ">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] ">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          {/* about content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ">
            <h2 className="heading">
              Tự hào là một trong những bệnh viện tốt nhất của quốc gia.
            </h2>
            <p className="text__para">
              Suốt 30 năm liên tiếp, V.N. News & World Report đã công nhận chúng
              tôi là một trong những bệnh viện công lập hàng đầu của quốc gia và
              hạng 1 tại Hà Nội.
            </p>
            <p className="text__para mt-[30px] ">
              Chúng tôi luôn cố gắng hết sức mình mỗi ngày, chăm sóc bệnh nhân
              của mình - không ngủ quên trên những gì chúng tôi đã đạt được mà
              hướng tới những gì chúng tôi có thể làm vào ngày mai. Mang đến
              những điều tốt nhất.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
