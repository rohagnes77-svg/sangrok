import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Flame,
  Home,
  ListChecks,
  Mic,
  RefreshCw,
  RotateCcw,
  SlidersHorizontal,
  Target,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';
import './wrong-notes.css';

type Navigate = (path: string) => void;
type WrongNote = { id: number; subject: string; level: string; title: string; wrong: string; correct: string; exam: string; date: string };

const notes: WrongNote[] = [
  { id: 1, subject: '운동생리학', level: '중급', title: '다음 중 유산소 운동 시 나타나는 일반적인 생리적 변화로 가장 적절한 것은?', wrong: '일회박출량 감소와 폐활량 증가', correct: '심박수 증가와 일회박출량 증가', exam: '2023년 기출', date: '2024.05.12' },
  { id: 2, subject: '운동생리학', level: '중급', title: '근섬유의 빠른 피로와 젖산 축적에 영향을 미치는 요인으로 가장 거리가 먼 것은?', wrong: '운동 강도', correct: '근육 내 미토콘드리아 밀도', exam: '2023년 기출', date: '2024.05.10' },
  { id: 3, subject: '운동생리학', level: '중급', title: '심박출량에 영향을 미치는 요인이 아닌 것은?', wrong: '혈액의 점도', correct: '1회 심박출량', exam: '2023년 기출', date: '2024.05.08' },
  { id: 4, subject: '운동생리학', level: '중급', title: '다음 중 안정 시 대사량에 영향을 미치는 요인으로 적절하지 않은 것은?', wrong: '성별', correct: '일일 활동량', exam: '2023년 기출', date: '2024.05.05' },
  { id: 5, subject: '운동역학', level: '중급', title: '인체의 균형과 안정성에 대한 설명으로 옳은 것은?', wrong: '지지면이 좁을수록 안정성이 증가한다', correct: '무게중심이 낮을수록 안정성이 증가한다', exam: '2022년 기출', date: '2024.05.02' },
  { id: 6, subject: '스포츠심리학', level: '중급', title: '운동 수행에 대한 자신감과 관련된 심리적 요인은?', wrong: '외적 동기', correct: '자기효능감', exam: '2022년 기출', date: '2024.04.29' },
  { id: 7, subject: '운동처방론', level: '중급', title: 'FITT 원칙에서 운동의 빈도를 의미하는 요소는?', wrong: 'Intensity', correct: 'Frequency', exam: '2021년 기출', date: '2024.04.25' },
  { id: 8, subject: '한국체육사', level: '중급', title: '우리나라 체육의 역사적 발전에 대한 설명으로 옳은 것은?', wrong: '현대 체육은 학교 체육만을 의미한다', correct: '생활체육은 국민 건강과 여가에 기여한다', exam: '2021년 기출', date: '2024.04.21' },
];

const tabs = ['전체', '운동생리학', '운동역학', '스포츠심리학', '운동처방론', '한국체육사', '기타'];

function WrongNotes({ onNavigate }: { onNavigate: Navigate }) {
  const [activeTab, setActiveTab] = useState('전체');
  const [subjectFilter, setSubjectFilter] = useState('전체');
  const [levelFilter, setLevelFilter] = useState('전체');
  const [yearFilter, setYearFilter] = useState('전체');
  const [openExplanation, setOpenExplanation] = useState<number | null>(null);
  const [toast, setToast] = useState('');
  const filteredNotes = useMemo(() => notes.filter((note) => (activeTab === '전체' || activeTab === '기타' ? activeTab === '전체' || !tabs.slice(1, -1).includes(note.subject) : note.subject === activeTab) && (subjectFilter === '전체' || note.subject === subjectFilter) && (levelFilter === '전체' || note.level === levelFilter) && (yearFilter === '전체' || note.exam.startsWith(yearFilter))), [activeTab, levelFilter, subjectFilter, yearFilter]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); };
  const resetFilters = () => { setSubjectFilter('전체'); setLevelFilter('전체'); setYearFilter('전체'); setActiveTab('전체'); notify('필터를 초기화했습니다.'); };

  return <div className="wrong-page">
    <header className="wrong-header"><button className="wrong-brand" onClick={() => onNavigate('/')}><span className="wrong-brand-icon"><span>S</span></span><span><strong>스포트패스</strong><small>생활스포츠지도사 2급</small></span></button><span className="wrong-title">오답노트</span><div className="wrong-filters"><SelectBox value="운동생리학" /><SelectBox value="기출문제" /><SelectBox value="중급" /><button className="wrong-setting" onClick={() => notify('오답노트 설정을 준비하고 있습니다.')}><SlidersHorizontal size={15} /> 문제 설정</button></div><div className="wrong-user"><button className="wrong-bell" onClick={() => notify('새로운 알림이 없습니다.')}><Bell size={20} /><i /></button><span><Flame size={17} /> 연속 학습 12일</span><b>학</b><strong>학습자</strong></div></header>
    <div className="wrong-layout">
      <aside className="wrong-sidebar"><button className="wrong-home" onClick={() => onNavigate('/')}><Home size={22} /><span>메인화면으로<br />돌아가기</span><ChevronRight size={18} /></button><nav>{<SideLink icon={Home} label="홈" onClick={() => onNavigate('/')} />}{<SideLink icon={BookOpen} label="문제풀기" onClick={() => onNavigate('/problem-solving')} />}{<SideLink icon={XCircle} label="오답노트" active onClick={() => undefined} />}{<SideLink icon={RefreshCw} label="유사문제 훈련" onClick={() => notify('유사문제 훈련 화면을 준비하고 있습니다.')} />}{<SideLink icon={Mic} label="구술시험" onClick={() => notify('구술시험 화면을 준비하고 있습니다.')} />}{<SideLink icon={BarChart3} label="나의 학습" onClick={() => onNavigate('/my-learning')} />}{<SideLink icon={FileText} label="학습 가이드" onClick={() => notify('학습 가이드를 준비하고 있습니다.')} />}</nav><div className="wrong-recommend"><h3>AI가 추천하는<br />오늘의 학습</h3><RecommendationRow label="필기 추천 문제" value="10문제" tone="blue" /><RecommendationRow label="구술 질문" value="3문제" tone="green" /><RecommendationRow label="오답 복습" value="5문제" tone="orange" /><button onClick={() => onNavigate('/my-learning')}>학습 현황 보기 <ArrowRight size={14} /></button></div></aside>
      <main className="wrong-main"><div className="wrong-tab-list">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="wrong-list-head"><h1>{activeTab === '전체' ? '전체' : activeTab} <small>{filteredNotes.length}개</small></h1><button onClick={() => notify('최근 오답 순으로 정렬되어 있습니다.')}>최근 오답순 <SlidersHorizontal size={15} /></button></div><div className="wrong-list">{filteredNotes.map((note) => <WrongNoteCard key={note.id} note={note} explanationOpen={openExplanation === note.id} onToggleExplanation={() => setOpenExplanation(openExplanation === note.id ? null : note.id)} onRetry={() => onNavigate('/problem-solving')} />)}{filteredNotes.length === 0 && <div className="empty-notes"><XCircle size={28} /><p>조건에 맞는 오답노트가 없습니다.</p></div>}</div></main>
      <aside className="wrong-right"><section className="wrong-stat-card"><h2>오답 현황</h2><div className="wrong-stat-content"><div className="wrong-donut"><strong>총<br /><b>{notes.length}</b> 문제</strong></div><div className="wrong-legend"><p><i className="red" />운동생리학 <b>6 (75%)</b></p><p><i className="orange" />운동역학 <b>1 (12%)</b></p><p><i className="green" />스포츠심리학 <b>1 (12%)</b></p><p><i className="blue" />기타 <b>0 (0%)</b></p></div></div></section><section className="wrong-year-card"><h2>연도별 오답 분포</h2><YearRow year="2023년 기출" value="5문제" /><YearRow year="2022년 기출" value="2문제" /><YearRow year="2021년 기출" value="1문제" /></section><section className="wrong-filter-card"><h2>필터</h2><FilterRow label="과목" value={subjectFilter} options={['전체', '운동생리학', '운동역학', '스포츠심리학', '운동처방론', '한국체육사']} onChange={setSubjectFilter} /><FilterRow label="난이도" value={levelFilter} options={['전체', '중급']} onChange={setLevelFilter} /><FilterRow label="연도" value={yearFilter} options={['전체', '2023', '2022', '2021']} onChange={setYearFilter} /><button className="reset-filter" onClick={resetFilters}><RotateCcw size={15} /> 필터 초기화</button></section><section className="wrong-tip"><h2><BookOpen size={20} /> 오답노트 활용 TIP</h2><p>틀린 문제를 다시 풀고 해설을 통해<br />개념을 확실히 이해해 보세요!<br />반복 학습이 실력 향상의 지름길입니다.</p></section></aside>
    </div>{toast && <div className="wrong-toast"><Check size={16} />{toast}</div>}
  </div>;
}

function SelectBox({ value }: { value: string }) { return <button className="wrong-select">{value}<ChevronDown size={15} /></button>; }
function SideLink({ icon: Icon, label, active, onClick }: { icon: typeof Home; label: string; active?: boolean; onClick: () => void }) { return <button className={active ? 'wrong-side-link active' : 'wrong-side-link'} onClick={onClick}><Icon size={18} />{label}{active && <ChevronRight size={14} />}</button>; }
function RecommendationRow({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className={`wrong-recommend-row ${tone}`}><span>{label}</span><b>{value}</b></div>; }
function WrongNoteCard({ note, explanationOpen, onToggleExplanation, onRetry }: { note: WrongNote; explanationOpen: boolean; onToggleExplanation: () => void; onRetry: () => void }) { return <article className="wrong-note-card"><div className="wrong-note-top"><span className="wrong-number">{note.id}</span><span className="wrong-subject">{note.subject}</span><span className="wrong-level">{note.level}</span><div className="wrong-note-date"><b>{note.exam}</b><span>{note.date}</span></div></div><h2>{note.title}</h2><div className="answer-comparison"><div><span>내가 선택한 답</span><p><XCircle size={18} />{note.wrong}</p></div><div><span>정답</span><p><Check size={18} />{note.correct}</p></div></div><div className="wrong-card-actions"><button onClick={onRetry}>다시 풀기</button><button onClick={onToggleExplanation}>해설 보기 <ChevronDown size={15} className={explanationOpen ? 'rotated' : ''} /></button></div>{explanationOpen && <div className="wrong-explanation"><strong>해설</strong><p>운동생리학의 기본 개념을 이해하면 정답을 찾을 수 있습니다. 정답에 해당하는 개념을 다시 확인하고 유사문제로 반복해 보세요.</p></div>}</article>; }
function YearRow({ year, value }: { year: string; value: string }) { return <button className="year-row"><span>{year}</span><b>{value}</b><ChevronRight size={15} /></button>; }
function FilterRow({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="filter-row"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14} /></label>; }

export default WrongNotes;
