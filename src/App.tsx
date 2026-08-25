import { useEffect, useState } from 'react';
import MyLearning from './MyLearning';
import ProblemSolving from './ProblemSolving';
import WrongNotes from './WrongNotes';
import SimilarQuestions from './SimilarQuestions';
import LearningGuide from './LearningGuide';
import './main-home.css';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  ClipboardList,
  Home,
  Menu,
  Mic,
  RefreshCw,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';

type Feature = { title: string; description: string; tone: string; icon: typeof BookOpen };

const features: Feature[] = [
  { title: '문제풀기', description: '과목별, 기출, 예상, 랜덤\n다양한 문제를 풀어보세요.', tone: 'blue', icon: BookOpen },
  { title: '오답노트', description: '틀린 문제를 자동으로 모아\n약점을 파악하세요.', tone: 'red', icon: XCircle },
  { title: '유사문제 훈련', description: '같은 개념의 유사 문제로\n반복 학습하세요!', tone: 'purple', icon: RefreshCw },
  { title: '구술시험', description: '자주 나오는 구술 질문을\n연습하고 답변을 녹음하세요.', tone: 'green', icon: Mic },
  { title: '나의 학습', description: '실전 감각을 키우고\n시험을 자신 있게 준비하세요.', tone: 'orange', icon: BarChart3 },
];

const featureRoutes: Record<string, string> = { 문제풀기: '/problem-solving', 오답노트: '/wrong-notes', '유사문제 훈련': '/similar-questions', '나의 학습': '/my-learning' };

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [path, setPath] = useState(window.location.pathname);
  const scrollToFeatures = () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (path === '/my-learning') return <MyLearning onNavigate={navigate} />;
  if (path === '/problem-solving') return <ProblemSolving onNavigate={navigate} />;
  if (path === '/wrong-notes') return <WrongNotes onNavigate={navigate} />;
  if (path === '/similar-questions') return <SimilarQuestions onNavigate={navigate} />;
  if (path === '/learning-guide') return <LearningGuide onNavigate={navigate} />;

  return (
    <div className="page-shell">
      <header className="header">
        <div className="header-inner">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="brand-icon"><span>S</span></span>
            <span><strong>스포트패스</strong><small>생활스포츠지도사 2급</small></span>
          </button>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>서비스 소개</button>
            <button onClick={scrollToFeatures}>기능</button>
            <button onClick={scrollToFeatures}>합격 후기</button>
            <button onClick={() => setModalOpen(true)}>이용 요금</button>
            <button onClick={scrollToFeatures}>학습 가이드</button>
          </nav>
          <div className="header-actions">
            <button className="login" onClick={() => setModalOpen(true)}>로그인</button>
            <button className="header-cta" onClick={() => setModalOpen(true)}>무료 시작하기</button>
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-orb orb-left" /><div className="hero-orb orb-right" />
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="hero-badge">생활스포츠지도사 2급 합격을 위한 앱</span>
              <h1>필기부터 구술까지,<br /><em>합격까지 연결</em>합니다</h1>
              <p>필기부터 구술까지, AI가 당신의 학습 약점을 분석하고<br className="desktop-break" /> 유사문제로 반복 훈련할 수 있도록 도와드립니다.</p>
              <div className="hero-buttons"><button className="primary-button" onClick={() => setModalOpen(true)}>무료 해설 시작하기 <ArrowRight size={17} /></button><button className="secondary-button" onClick={scrollToFeatures}>서비스 둘러보기</button></div>
            </div>
            <Dashboard />
          </div>
        </section>

        <section id="features" className="features">
          <div className="feature-grid">{features.map((feature) => <FeatureCard key={feature.title} feature={feature} onNavigate={navigate} />)}</div>
        </section>

        <section className="bottom-cta">
          <div className="cta-illustration"><div className="target"><span /><span /><span /></div><div className="target-arrow" /><div className="mini-trophy"><Trophy size={37} /></div><div className="clipboard"><ClipboardList size={38} /><i /><i /><i /></div></div>
          <div className="cta-copy"><h2>지금 바로 시작하고 합격의 주인공이 되세요!</h2><p>무료 체험으로 스포트패스의 모든 기능을 경험해보세요.<br />당신의 합격을 스포트패스가 함께합니다.</p></div>
          <button className="primary-button cta-button" onClick={() => setModalOpen(true)}>무료 체험 시작하기 <ArrowRight size={17} /></button>
        </section>
      </main>

      {modalOpen && <div className="modal-backdrop" onClick={() => setModalOpen(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModalOpen(false)}><X size={18} /></button><div className="modal-mark"><Trophy size={26} /></div><span>스포트패스 무료 체험</span><h2>합격을 위한 첫 걸음을<br />시작해 보세요.</h2><p>나에게 맞는 학습 계획을 확인하고<br />오늘의 추천 문제를 만나보세요.</p><button className="primary-button" onClick={() => setModalOpen(false)}>학습 시작하기 <ArrowRight size={16} /></button></div></div>}
    </div>
  );
}

function Dashboard() {
  return <div className="dashboard screenshot-dashboard"><div className="dash-main"><div className="dash-head"><div><span>오늘의 학습</span></div><b><i>🔥</i> 연속 학습 12일</b></div><div className="dash-cards"><DashCard title="필기 추천 문제" value="10" unit="문제" tone="blue" icon={<BookOpen size={22} />} /><DashCard title="구술 질문" value="3" unit="문제" tone="green" icon={<Mic size={22} />} /><DashCard title="오답 복습" value="5" unit="문제" tone="orange" icon={<XCircle size={22} />} /></div><div className="analytics"><div className="analysis-card"><h4>학습 진행률</h4><div className="progress-content"><div className="donut"><span>78<small>%</small></span></div><div><span className="analysis-label">이번 주 학습 시간</span><strong>5시간<br />6시간 30분</strong></div></div></div><div className="analysis-card chart"><h4>최근 점수 변화</h4><strong className="score-rise">+8<small>점</small></strong><span className="chart-label">일주일 평균 점수</span><svg viewBox="0 0 170 62" preserveAspectRatio="none"><path d="M0 56 C17 49, 18 42, 36 44 S53 31, 67 37 S79 27, 94 31 S107 16, 120 23 S135 7, 149 15 S160 7, 170 0" fill="none" stroke="#1263e9" strokeWidth="3" strokeLinecap="round" /></svg><div className="study-time"><ClockIcon /><span>시간</span><i /></div></div></div></div></div>;
}

function ClockIcon() { return <span className="clock-icon">◷</span>; }
function DashCard({ title, value, unit, tone, icon }: { title: string; value: string; unit: string; tone: string; icon: React.ReactNode }) { return <div className={`dash-card ${tone}`}><div className="dash-card-icon">{icon}</div><span>{title}</span><strong>{value}<small>{unit}</small></strong></div>; }
function FeatureCard({ feature, onNavigate }: { feature: Feature; onNavigate: (path: string) => void }) { const Icon = feature.icon; const route = featureRoutes[feature.title]; const go = route ? () => onNavigate(route) : undefined; return <article className={route ? 'feature-card clickable' : 'feature-card'} onClick={go} role={route ? 'link' : undefined} tabIndex={route ? 0 : undefined} onKeyDown={route ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onNavigate(route); } } : undefined}><div className={`feature-icon ${feature.tone}`}><Icon size={29} /></div><h3>{feature.title}</h3><p>{feature.description}</p></article>; }

export default App;
