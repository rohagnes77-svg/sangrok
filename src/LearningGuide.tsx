import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Flame,
  Home,
  Lightbulb,
  ListChecks,
  Menu,
  Mic,
  PieChart,
  RefreshCw,
  Settings2,
  Star,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';
import './learning-guide.css';

type Navigate = (path: string) => void;
type TabKey = '학습 로드맵' | '출제 경향' | '핵심 개념 정리' | '학습 전략' | '시험 정보';

const menuRoutes: Record<string, string> = { 홈: '/', 문제풀기: '/problem-solving', 오답노트: '/wrong-notes', '유사문제 훈련': '/similar-questions', '나의 학습': '/my-learning' };
const menuItems = [
  { label: '홈', icon: Home },
  { label: '문제풀기', icon: BookOpen },
  { label: '오답노트', icon: XCircle },
  { label: '유사문제 훈련', icon: RefreshCw },
  { label: '구술시험', icon: Mic },
  { label: '나의 학습', icon: ListChecks },
  { label: '학습 가이드', icon: FileText, active: true },
];

const tabs: TabKey[] = ['학습 로드맵', '출제 경향', '핵심 개념 정리', '학습 전략', '시험 정보'];

const roadmapSteps = [
  { step: '1단계', title: '기초 다지기', period: 'D-60 ~ D-41', description: '핵심 개념 이해와 기본 문제 풀이로 기초를 다집니다.', progress: 70, tone: 'blue' },
  { step: '2단계', title: '문제 적용하기', period: 'D-40 ~ D-21', description: '기출문제 풀이와 유사문제 훈련으로 응용력을 키웁니다.', progress: 45, tone: 'green' },
  { step: '3단계', title: '실전 감각 키우기', period: 'D-20 ~ D-8', description: '실전 모의고사와 구술 연습으로 실전 감각을 높입니다.', progress: 20, tone: 'orange' },
  { step: '4단계', title: '최종 점검', period: 'D-7 ~ 시험일', description: '취약점 보완과 핵심 요약 정리로 최종 점검합니다.', progress: 0, tone: 'purple' },
];

const weeklyPlan = [
  { week: '1~2주차', goal: '기초 개념 완성', content: '핵심 개념 학습 + 기본 문제 풀이', time: '주 10~12시간', tone: 'blue' },
  { week: '3~4주차', goal: '문제 적용 능력 향상', content: '기출문제 풀이 + 유사문제 훈련', time: '주 12~15시간', tone: 'green' },
  { week: '5~6주차', goal: '실전 감각 강화', content: '모의고사 풀이 + 구술 연습', time: '주 15~18시간', tone: 'orange' },
  { week: '7주차 이후', goal: '최종 점검 및 마무리', content: '취약점 보완 + 핵심 요약 정리', time: '주 10~12시간', tone: 'purple' },
];

const difficulty = [
  { label: '이해도', score: 3 },
  { label: '암기량', score: 3 },
  { label: '계산력', score: 2 },
  { label: '실전 적용', score: 4 },
  { label: '중요도', score: 5 },
];

const priorities = [
  { rank: 1, title: '심박수 조절의 원리', level: '높음', tone: 'high' },
  { rank: 2, title: '운동 강도와 생리적 반응', level: '높음', tone: 'high' },
  { rank: 3, title: '에너지 대사 과정', level: '보통', tone: 'mid' },
  { rank: 4, title: '운동 처방의 원칙', level: '보통', tone: 'mid' },
  { rank: 5, title: '근육 수축의 기전', level: '낮음', tone: 'low' },
];

const examTrend = [
  { subject: '운동생리학', weight: '25%', note: '심폐 기능과 에너지 대사 관련 문제가 매년 출제됩니다.', tone: 'blue' },
  { subject: '운동역학', weight: '20%', note: '힘과 운동, 근수축 원리 문제의 비중이 높습니다.', tone: 'green' },
  { subject: '스포츠심리학', weight: '20%', note: '동기와 불안, 심리 기술 훈련이 자주 등장합니다.', tone: 'purple' },
  { subject: '운동처방론', weight: '20%', note: 'FITT 원칙과 대상별 처방 문제가 핵심입니다.', tone: 'orange' },
  { subject: '한국체육사', weight: '15%', note: '시대별 체육 제도와 인물 중심으로 정리하세요.', tone: 'sky' },
];

const coreConcepts = [
  { title: '에너지 시스템', description: 'ATP-PC, 무산소성 해당, 유산소 시스템의 특징과 사용 시점을 구분합니다.' },
  { title: '근수축의 원리', description: '액틴·미오신의 활주설과 등척성·등장성 수축의 차이를 이해합니다.' },
  { title: '심폐 반응', description: '운동 강도에 따른 심박수·일회박출량·최대산소섭취량 변화를 파악합니다.' },
  { title: '운동 처방 원칙', description: 'FITT 원칙과 점진적 과부하, 특이성 원칙을 사례와 함께 정리합니다.' },
];

const strategies = [
  { icon: BookOpen, title: '개념부터 탄탄하게', description: '과목별 핵심 개념을 먼저 이해한 뒤 기본 문제로 확인하세요.', tone: 'blue' },
  { icon: RefreshCw, title: '오답 반복 학습', description: '틀린 문제는 오답노트와 유사문제로 반드시 다시 풀어보세요.', tone: 'purple' },
  { icon: Mic, title: '구술 병행 준비', description: '필기와 구술을 함께 준비해 학습 흐름이 끊기지 않도록 하세요.', tone: 'green' },
  { icon: BarChart3, title: '데이터 기반 복습', description: '나의 학습에서 취약 과목을 확인하고 학습 시간을 배분하세요.', tone: 'orange' },
];

const examInfo = [
  { label: '시험 과목', value: '운동생리학 등 5개 과목' },
  { label: '문항 수', value: '과목당 20문항 (총 100문항)' },
  { label: '합격 기준', value: '전 과목 40% 이상, 평균 60% 이상' },
  { label: '시험 방식', value: '객관식 필기 + 구술·실기' },
];

function LearningGuide({ onNavigate }: { onNavigate: Navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('학습 로드맵');
  const [toast, setToast] = useState('');

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const quickLinks = [
    { label: '문제풀기', icon: BookOpen, tone: 'blue', action: () => onNavigate('/problem-solving') },
    { label: '오답노트', icon: XCircle, tone: 'red', action: () => onNavigate('/wrong-notes') },
    { label: '유사문제', icon: RefreshCw, tone: 'purple', action: () => onNavigate('/similar-questions') },
    { label: '구술시험', icon: Mic, tone: 'green', action: () => notify('구술시험 화면을 준비하고 있습니다.') },
    { label: '나의 학습', icon: BarChart3, tone: 'orange', action: () => onNavigate('/my-learning') },
    { label: '학습 현황', icon: PieChart, tone: 'sky', action: () => onNavigate('/my-learning') },
  ];

  return <div className="guide-page">
    <header className="guide-header">
      <button className="guide-brand" onClick={() => onNavigate('/')}><span className="guide-brand-icon"><Trophy size={20} /></span><span><strong>스포트패스</strong><small>생활스포츠지도사 2급</small></span></button>
      <span className="guide-title">학습 가이드</span>
      <div className="guide-filters"><SelectBox value="운동생리학" /><SelectBox value="기출문제" /><SelectBox value="중급" /><button className="guide-setting" onClick={() => notify('문제 설정을 준비하고 있습니다.')}><Settings2 size={16} /> 문제 설정</button></div>
      <div className="guide-user"><button className="guide-bell" onClick={() => notify('새로운 알림이 없습니다.')} aria-label="알림"><Bell size={19} /><i /></button><span className="guide-streak"><Flame size={17} /> 연속 학습 12일</span><span className="guide-avatar">학</span><b>학습자</b></div>
      <button className="guide-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="메뉴 열기">{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
    </header>

    <div className="guide-layout">
      <aside className={mobileMenuOpen ? 'guide-sidebar open' : 'guide-sidebar'}>
        <button className="guide-home-button" onClick={() => onNavigate('/')}><Home size={20} /><span>메인화면으로<br />돌아가기</span><ChevronRight size={18} /></button>
        <nav className="guide-nav">{menuItems.map(({ label, icon: Icon, active }) => <button key={label} className={active ? 'guide-nav-link active' : 'guide-nav-link'} onClick={() => { if (active) { setMobileMenuOpen(false); return; } const route = menuRoutes[label]; if (route) onNavigate(route); else notify(`${label} 화면을 준비하고 있습니다.`); }}><Icon size={18} />{label}{active && <ChevronRight size={14} />}</button>)}</nav>
        <div className="guide-recommend"><h3>AI가 추천하는<br />오늘의 학습</h3><RecommendItem label="필기 추천 문제" value="10문제" tone="blue" /><RecommendItem label="구술 질문" value="3문제" tone="green" /><RecommendItem label="오답 복습" value="5문제" tone="orange" /><button onClick={() => onNavigate('/my-learning')}>학습 현황 보기 <ArrowRight size={14} /></button></div>
      </aside>

      <main className="guide-main">
        <section className="guide-intro">
          <div><h1>효율적인 <em>학습</em>을 위한 가이드</h1><p>과목의 특성과 출제 경향을 분석하여 최적의 학습 전략을 제안합니다.</p></div>
          <button className="guide-download" onClick={() => notify('가이드 PDF 다운로드를 준비하고 있습니다.')}><Download size={16} /> 가이드 PDF 다운로드</button>
        </section>

        <div className="guide-tabs">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>

        {activeTab === '학습 로드맵' && <div className="guide-panel">
          <div className="guide-panel-head"><h2>학습 로드맵</h2><p>시험일까지 단계별로 학습 계획을 세워보세요.</p></div>
          <div className="roadmap-row">{roadmapSteps.map((step, index) => <div className="roadmap-item" key={step.step}><article className={`roadmap-card ${step.tone}`}><strong>{step.step}<br />{step.title}</strong><span className="roadmap-period">{step.period}</span><p>{step.description}</p><div className="roadmap-progress"><span>진행률 <b>{step.progress}%</b></span><div><i style={{ width: `${step.progress}%` }} /></div></div></article>{index < roadmapSteps.length - 1 && <ChevronRight className="roadmap-arrow" size={20} />}</div>)}</div>

          <div className="guide-plan"><h3>권장 주간 학습 계획 예시</h3><div className="plan-table"><div className="plan-head"><span>주차</span><span>학습 목표</span><span>주요 학습 내용</span><span>권장 학습 시간</span></div>{weeklyPlan.map((row) => <div className="plan-row" key={row.week}><span className={`plan-week ${row.tone}`}>{row.week}</span><span>{row.goal}</span><span>{row.content}</span><span>{row.time}</span></div>)}</div></div>

          <div className="guide-tip"><Lightbulb size={20} /><div><strong>가이드 TIP</strong><ul><li>하루 최소 2시간 이상 꾸준히 학습하는 것이 중요합니다.</li><li>오답노트와 유사문제를 반복 학습하면 점수 향상에 큰 도움이 됩니다.</li></ul></div></div>
        </div>}

        {activeTab === '출제 경향' && <div className="guide-panel">
          <div className="guide-panel-head"><h2>출제 경향</h2><p>과목별 출제 비중과 최근 경향을 확인하세요.</p></div>
          <div className="trend-list">{examTrend.map((item) => <article className={`trend-card ${item.tone}`} key={item.subject}><div className="trend-top"><strong>{item.subject}</strong><b>{item.weight}</b></div><div className="trend-bar"><i style={{ width: item.weight }} /></div><p>{item.note}</p></article>)}</div>
        </div>}

        {activeTab === '핵심 개념 정리' && <div className="guide-panel">
          <div className="guide-panel-head"><h2>핵심 개념 정리</h2><p>시험에 자주 나오는 핵심 개념을 먼저 정리하세요.</p></div>
          <div className="concept-grid">{coreConcepts.map((item) => <article className="concept-card" key={item.title}><span className="concept-icon"><BookOpen size={18} /></span><strong>{item.title}</strong><p>{item.description}</p></article>)}</div>
        </div>}

        {activeTab === '학습 전략' && <div className="guide-panel">
          <div className="guide-panel-head"><h2>학습 전략</h2><p>합격에 가까워지는 네 가지 학습 전략입니다.</p></div>
          <div className="concept-grid">{strategies.map(({ icon: Icon, title, description, tone }) => <article className="strategy-card" key={title}><span className={`strategy-icon ${tone}`}><Icon size={19} /></span><strong>{title}</strong><p>{description}</p></article>)}</div>
        </div>}

        {activeTab === '시험 정보' && <div className="guide-panel">
          <div className="guide-panel-head"><h2>시험 정보</h2><p>생활스포츠지도사 2급 필기시험 기본 정보입니다.</p></div>
          <div className="exam-info-table">{examInfo.map((row) => <div className="exam-info-row" key={row.label}><span>{row.label}</span><b>{row.value}</b></div>)}</div>
        </div>}
      </main>

      <aside className="guide-right-panel">
        <section className="guide-card difficulty-card">
          <h2>과목 난이도 분석</h2><p>현재 선택한 과목의 난이도와 학습 중요도를 확인하세요.</p>
          <div className="difficulty-body">
            <div className="difficulty-donut"><span>보통<br /><small>(중)</small></span></div>
            <div className="difficulty-list">{difficulty.map((item) => <div className="difficulty-row" key={item.label}><span>{item.label}</span><StarRow score={item.score} /></div>)}</div>
          </div>
        </section>

        <section className="guide-card priority-card">
          <h2>학습 우선순위 TOP 5</h2><p>지금 집중해야 할 학습 항목입니다.</p>
          <div className="priority-list">{priorities.map((item) => <div className="priority-row" key={item.rank}><span className={`priority-rank rank-${item.rank}`}>{item.rank}</span><b>{item.title}</b><em className={`priority-level ${item.tone}`}>{item.level}</em></div>)}</div>
        </section>

        <section className="guide-card quick-card">
          <h2>빠른 이동</h2><p>원하는 페이지로 바로 이동하세요.</p>
          <div className="quick-grid">{quickLinks.map(({ label, icon: Icon, tone, action }) => <button key={label} className={`quick-item ${tone}`} onClick={action}><Icon size={22} /><span>{label}</span></button>)}</div>
        </section>
      </aside>
    </div>
    {toast && <div className="guide-toast">{toast}</div>}
  </div>;
}

function SelectBox({ value }: { value: string }) { return <button className="guide-select">{value}<ChevronDown size={15} /></button>; }
function RecommendItem({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className={`guide-recommend-item ${tone}`}><span>{label}</span><b>{value}</b></div>; }
function StarRow({ score }: { score: number }) { return <span className="star-row">{[1, 2, 3, 4, 5].map((index) => <Star key={index} size={13} className={index <= score ? 'filled' : ''} />)}</span>; }

export default LearningGuide;
