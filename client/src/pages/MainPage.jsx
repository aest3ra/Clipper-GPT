import { useEffect, useState } from "react";
import "../styles/common/Main.css";

export default function MainPage() {
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

      {/* 버튼 그룹 */}
      <div className="buttons">
        <button className="start-button">편집 시작</button>
        <button className="guide-button">사용 방법</button>
      </div>

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
                    <p>원하는 동영상을 업로드해주세요.</p>
                </div>
            </div>

            <div className="step">
                <div className="screen-container">
                    <img src="/screenshot3.svg" alt="step3" className="screenImg" />
                </div>
                <div className="desc">
                    <img src="/icon1.png" alt="step3" className="icon" />
                    <h2>Step 3</h2>
                    <p>AI가 자동으로 편집을 완료해드립니다!</p>
                </div>
            </div>
        </div>

      
    </div>
  );
}
