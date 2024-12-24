import { useEffect, useState } from "react";
import LayoutSection from "../components/style/PageLayout"
import "../styles/common/Main.css"


export default function MainPage() {
    return (
        <LayoutSection>
           
            {/* 본문 내용 */}
            <div className="content">
                <p><h1>AI 완전 자동 영상 편집기</h1></p>
                <img src="/navlogo.svg" alt="logo"/>
                <p>🎥 귀찮은 영상 편집은 그만!</p>
                <p>📸 여러분은 찍기만 하세요, 편집은 CLIPPER-GPT가 해드릴게요!</p>
                <p>💡 지금 출시 기념 무료 베타 서비스 중!</p>
                <p>🚀 현재는 여행 영상에 한해 제공됩니다.</p>
            </div>

            {/* 버튼 그룹 */}
            <div className="buttons">
                <button className="start-button">편집 시작</button>
                <button className="guide-button">사용 방법</button>
            </div>
        </LayoutSection>
    )
}