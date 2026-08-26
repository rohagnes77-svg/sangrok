import { useState } from 'react';
import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  CircleHelp,
  FileText,
  Flame,
  Home,
  Lightbulb,
  ListChecks,
  Mic,
  Network,
  RefreshCw,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';
import './learning-guide.css';

type Navigate = (path: string) => void;
type GuideTab = '학습 로드맵' | '출제 경향' | '핵심 개념 정리' | '학습 전략' | '시험 정보';

const tabs: GuideTab[] = ['학습 로드맵', '출제 경향', '핵심 개념 정리', '학습 전략', '시험 정보'];
const roadmap = [
  { step: '1단계', title: '기초 다지기', date: 'D-60 ~ D-41', copy: '핵심 개념 이해와\n기본 문제 풀이로\n기초를 다집니다.', progress: 70, tone: 'blue' },
  { step: '2단계', title: '문제 적응하기', date: 'D-40 ~ D-21', copy: '기출문제 풀이와\n유사문제 훈련으로\n응용력을 키웁니다.', progress: 45, tone: 'green' },
  { step: '3단계', title: '실전 감각 키우기', date: 'D-20 ~ D-8', copy: '실전 모의고사와\n구술 연습으로\n실전 감각을 높입니다.', progress: 20, tone: 'orange' },
  { step: '4단계', title: '최종 점검', date: 'D-7 ~ 시험일', copy: '취약점 보완과\n핵심 요약 정리로\n최종 점검합니다.', progress: 0, tone: 'purple' },
];

function LearningGuide({ onNavigate }: { onNavigate: Navigate }) {
  const [activeTab, setActiveTab] = useState<GuideTab>('학습 로드맵');
  const [toast, setToast] = useState('');
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); };

  return <div className="guide-page"><header className="guide-header"><button className="guide-brand" onClick={() => onNavigate('/')}><span className="guide-brand-mark"><Trophy size={20} /></span><span><strong>스포트패스</strong><small>생활스포츠지도사 2급</small></span></button><span className="guide-title">학습 가이드</span><div className="guide-filters"><GuideSelect value="운동생리학" /><GuideSelect value="기출문제" /><GuideSelect value="중급" /><button className="guide-setting" onClick={() => notify('문제 설정을 준비하고 있습니다.')}><Network size={15} /> 문제 설정</button></div><div className="guide-user"><button onClick={() => notify('새로운 알림이 없습니다.')}><Bell size={20} /><i /></button><span><Flame size={17} /> 연속 학습 12일</span><b>학</b><strong>학습자</strong></div></header>
    <div className="guide-layout"><aside className="guide-sidebar"><button className="guide-home" onClick={() => onNavigate('/')}><Home size={22} /><span>메인화면으로<br />돌아가기</span><ChevronRight size={18} /></button><nav><GuideLink icon={Home} label="홈" onClick={() => onNavigate('/')} /><GuideLink icon={BookOpen} label="문제풀기" onClick={() => onNavigate('/problem-solving')} /><GuideLink icon={XCircle} label="오답노트" onClick={() => onNavigate('/wrong-notes')} /><GuideLink icon={RefreshCw} label="유사문제 훈련" onClick={() => onNavigate('/similar-questions')} /><GuideLink icon={Mic} label="구술시험" onClick={() => notify('구술시험 화면을 준비하고 있습니다.')} /><GuideLink icon={ListChecks} label="나의 학습" onClick={() => onNavigate('/my-learning')} /><GuideLink icon={BookOpen} label="학습 가이드" active onClick={() => undefined} /></nav><GuideRecommendations onNavigate={onNavigate} /></aside>
      <main className="guide-main"><section className="guide-card guide-overview"><div className="guide-overview-head"><div><h1><span>효율적인 학습</span>을 위한 가이드</h1><p>과목의 특성과 출제 경향을 분석하여 최적의 학습 전략을 제안합니다.</p></div><button onClick={() => notify('가이드 PDF 다운로드를 준비하고 있습니다.')}><ArrowDownToLine size={16} /> 가이드 PDF 다운로드</button></div><div className="guide-tabs">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => { setActiveTab(tab); if (tab !== '학습 로드맵') notify(`${tab} 내용을 준비하고 있습니다.`); }}>{tab}</button>)}</div><section className="roadmap-section"><h2>학습 로드맵</h2><p>시험일까지 단계별로 학습 계획을 세워보세요.</p><div className="roadmap-grid">{roadmap.map((item, index) => <RoadmapCard key={item.step} item={item} showArrow={index < roadmap.length - 1} />)}</div></section><StudyPlan /><GuideTip /></section></main>
      <aside className="guide-right"><DifficultyCard /><PriorityCard /><QuickMove onNavigate={onNavigate} /></aside></div>{toast && <div className="guide-toast">{toast}</div>}</div>;
}

function RoadmapCard({ item, showArrow }: { item: typeof roadmap[number]; showArrow: boolean }) { return <article className={`roadmap-card ${item.tone}`}><div className="roadmap-card-title"><strong>{item.step}</strong><h3>{item.title}</h3><span>{item.date}</span></div><p>{item.copy}</p><div className="roadmap-progress"><b>진행률 <em>{item.progress}%</em></b><i><span style={{ width: `${item.progress}%` }} /></i></div>{showArrow && <ChevronRight className="roadmap-arrow" size={25} />}</article>; }
function StudyPlan() { return <section className="study-plan"><h2>권장 주간 학습 계획 예시</h2><div className="study-table"><div><b>주차</b><b>학습 목표</b><b>주요 학습 내용</b><b>권장 학습 시간</b></div><div><strong>1~2주차</strong><span>기초 개념 완성</span><span>핵심 개념 학습 + 기본 문제 풀이</span><span>주 10 ~ 12시간</span></div><div><strong>3~4주차</strong><span>문제 적용 능력 향상</span><span>기출문제 풀이 + 유사문제 훈련</span><span>주 12 ~ 15시간</span></div><div><strong>5~6주차</strong><span>실전 감각 강화</span><span>모의고사 풀이 + 구술 연습</span><span>주 15 ~ 18시간</span></div><div><strong>7주차 이후</strong><span>최종 점검 및 마무리</span><span>취약점 보완 + 핵심 요약 정리</span><span>주 10 ~ 12시간</span></div></div></section>; }
function GuideTip() { return <section className="guide-tip"><Lightbulb size={27} /><div><h2>가이드 TIP</h2><p>• 하루 최소 2시간 이상 꾸준히 학습하는 것이 중요합니다.</p><p>• 오답노트와 유사문제를 반복 학습하면 점수 향상에 큰 도움이 됩니다.</p></div></section>; }
function DifficultyCard() { return <section className="guide-side-card difficulty-card"><h2>과목 난이도 분석</h2><p>현재 선택한 과목의 난이도와 학습 중요도를 확인하세요.</p><div className="difficulty-content"><div className="difficulty-donut"><strong>보통<br /><small>(중)</small></strong></div><div>{[['이해도', '★★★☆☆'], ['암기량', '★★★☆☆'], ['계산력', '★★☆☆☆'], ['실전 적용', '★★★★☆'], ['중요도', '★★★★★']].map(([label, stars]) => <p key={label}><span>{label}</span><b>{stars}</b></p>)}</div></div></section>; }
function PriorityCard() { return <section className="guide-side-card priority-card"><h2>학습 우선순위 TOP 5</h2><p>지금 집중해야 할 학습 항목입니다.</p>{['심박수 조절의 원리', '운동 강도와 생리적 반응', '에너지 대사 과정', '운동 처방의 원칙', '근육 수축의 기전'].map((item, index) => <div className="priority-row" key={item}><b>{index + 1}</b><strong>{item}</strong><span className={index < 2 ? 'high' : index < 4 ? 'normal' : 'low'}>{index < 2 ? '높음' : index < 4 ? '보통' : '낮음'}</span></div>)}</section>; }
function QuickMove({ onNavigate }: { onNavigate: Navigate }) { const items = [{ label: '문제풀기', icon: BookOpen, path: '/problem-solving', tone: 'blue' }, { label: '오답노트', icon: FileText, path: '/wrong-notes', tone: 'red' }, { label: '유사문제', icon: RefreshCw, path: '/similar-questions', tone: 'green' }, { label: '구술시험', icon: Mic, path: '/problem-solving', tone: 'purple' }, { label: '나의 학습', icon: BarChart3, path: '/my-learning', tone: 'blue' }, { label: '학습 현황', icon: CalendarCheck, path: '/my-learning', tone: 'orange' }]; return <section className="guide-side-card quick-card"><h2>빠른 이동</h2><p>원하는 페이지로 바로 이동하세요.</p><div>{items.map(({ label, icon: Icon, path, tone }) => <button key={label} onClick={() => onNavigate(path)}><Icon className={tone} size={23} /><strong>{label}</strong></button>)}</div></section>; }
function GuideSelect({ value }: { value: string }) { return <button className="guide-select">{value}<ChevronRight size={15} /></button>; }
function GuideLink({ icon: Icon, label, active, onClick }: { icon: typeof Home; label: string; active?: boolean; onClick: () => void }) { return <button className={active ? 'guide-nav-link active' : 'guide-nav-link'} onClick={onClick}><Icon size={18} />{label}{active && <ChevronRight size={14} />}</button>; }
function GuideRecommendations({ onNavigate }: { onNavigate: Navigate }) { return <div className="guide-recommend"><h3>AI가 추천하는<br />오늘의 학습</h3><p className="blue">필기 추천 문제 <b>10문제</b></p><p className="green">구술 질문 <b>3문제</b></p><p className="orange">오답 복습 <b>5문제</b></p><button onClick={() => onNavigate('/my-learning')}>학습 현황 보기 <ArrowRight size={14} /></button></div>; }

export default LearningGuide;
