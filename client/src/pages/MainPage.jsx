import { useEffect, useState } from "react";
import { useHandleRoute } from "../lib/util";

import "../styles/common/Main.css";

export default function MainPage() {

    const { handleRoute } = useHandleRoute();

    const handleGoEdit1 = () => {
        navigate("/edit1");
    };

  return (
    <div className="root">

        {/* 랜딩 페이지 */}
        <br></br>
        <h1>AI 완전 자동 영상 편집기</h1>
        <div className="content">
            <div className="logoImg">
                <img src="/logoBig.svg" alt="logo" />
            </div>
            
            <div className="contentDec">
                <p>🎥 귀찮은 영상 편집은 그만!</p>
                <p>📸 여러분은 찍기만 하세요, 편집은 CLIPPER-GPT가 해드릴게요!</p>
                <p>💡 지금 출시 기념 무료 베타 서비스 중!</p>
                <p>🚀 현재는 여행 영상에 한해 제공됩니다.</p>
            </div>
        </div>
    {/* ---------------------------------------------------------------   */}

      {/* 버튼 그룹 */}
      <div className="buttons">
        <button className="start-button" onClick={() => handleRoute("/edit1")} >편집 시작</button>
        <button className="guide-button">사용 방법</button>
      </div>

    {/* ---------------------------------------------------------------   */}

      {/* 사용 방법 */}
      <br></br><br></br><br></br><br></br>
      <h2>사용 방법</h2>
      <div className="usage">
            
            <div className="step">
                <div className="screen-container">
                    <img src="/screenshot1.svg" alt="step1" className="screenImg" />
                </div>
                <div className="desc">
                    <img src="/icon1.png" alt="step1" className="icon" />
                    <h2>Step 1</h2>
                    <p>
                        편집본을 받으실 이메일을 입력해주세요.
                        <br />
                        (Share with others 에 공유할 사람들의 메일을 모두 적어주세요.)
                    </p>
                </div>
            </div>

            <div className="step">
                <div className="screen-container">
                    <img src="/screenshot2.svg" alt="step2" className="screenImg" />
                </div>
                <div className="desc">
                    <img src="/icon2.png" alt="step2" className="icon" />
                    <h2>Step 2</h2>
                    <p>
                        편집하실 영상을 업로드해주세요.
                        <br />
                        (장소 효과를 추가하고 싶으시다면 오른쪽 연필 아이콘을 눌러 장소를 추가해주세요.)
                    </p>
                </div>
            </div>

            <div className="step">
                <div className="screen-container">
                    <img src="/screenshot3.svg" alt="step3" className="screenImg" />
                </div>
                <div className="desc">
                    <img src="/icon1.png" alt="step3" className="icon" />
                    <h2>Step 3</h2>
                    <p>
                        이제 모든 과정이 끝났어요.
                        <br />
                        AI가 영상을 편집한 뒤 이메일로 보내드릴게요.
                        <br />
                        (해당 과정은 영상에 따라 1시간 ~ 3일정도 소요될 수 있습니다.)
                    </p>
                </div>
            </div>
        </div>
    {/* ---------------------------------------------------------------   */}
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div className="content">
            <div className="freeDesc">
                    프리런칭 2025년 3월까지 무료로 이용해보세요.<br />
                    프리런칭 기간 중 이용하신 분들께는 정식 런칭 후 무료 쿠폰을 드려요!
            </div>
            <div className="logoImg">
                <img src="/logoBig.svg" alt="logo" />
            </div>
        </div>
        {/* 버튼 그룹 */}
        <div className="buttons">
        <button className="start-button" onClick={() => handleRoute("/edit1")} >편집 시작</button>
            <button className="guide-button">사용 방법</button>
        </div>

    {/* ---------------------------------------------------------------   */}
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <h2>자주 묻는 질문</h2>
        <div className="ask">
            <div className="question">
                무료인가요
            </div>
            <div className="question">
                이메일이 오지 않아요.
            </div>
            <div className="question">
                개인정보 유출 등 우려는 없나요?
            </div>
        </div>

    {/* ---------------------------------------------------------------   */}
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <div className="content">
            <div className="freeDesc">
                문제가 발생하거나 더 궁금하신 점이 있다면 clippergpt.ai@gmail.com 으로 
                <br />
                메일 주시면 빠른 시일 내에 답변 드리도록 하겠습니다.
            </div>
        </div>


    </div>
  );
}
