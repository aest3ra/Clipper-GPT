import styled from "styled-components";

const LayoutSection = styled.section`
    p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #6B7280;
    }

  h1 {
    text-align: center;
    margin: 0 auto;
    font-size: 2rem; /* 폰트 크기를 키움 */
    font-weight: bold; /* 선택적으로 폰트 두께를 설정 */
    color: black; /* 텍스트 색상 */
  }

  img {
    width: 200px;
    height: 100px;
    display: block; /* 이미지를 블록 요소로 */
    margin: 0 auto; /* 가로 중앙 정렬 */
  }

  .buttons {
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 (선택 사항) */
    gap: 2rem; /* 버튼 간 간격 */
    margin-top: 80px; /* 버튼 그룹과 위 콘텐츠 사이 여백 */
  }

  .start-button {
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    background-color: #0078ff;
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }

  .guide-button {
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    background-color: #f4f4f4;
    color: #333333;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default LayoutSection;