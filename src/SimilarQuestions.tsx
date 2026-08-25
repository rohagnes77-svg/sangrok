import { useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Flame,
  Home,
  Lightbulb,
  Mic,
  Network,
  RefreshCw,
  Trophy,
  XCircle,
} from 'lucide-react';
import './similar-questions.css';

type Navigate = (path: string) => void;
type SimilarQuestion = { number: number; title: string; options: string[]; answer: number; exam: string; date: string };
const similarQuestions: SimilarQuestion[] = [
  { number: 1, title: '운동 강도가 증가할 때 일반적으로 나타나는 변화는?', options: ['심박수 감소, 일회박출량 감소', '심박수 증가, 일회박출량 증가', '심박수 감소, 일회박출량 증가', '심박수 증가, 일회박출량 감소'], answer: 1, exam: '2022년 기출', date: '2024.05.10' },
  { number: 2, title: '지속적인 유산소 운동 시 나타나는 일반적인 변화로 가장 적절한 것은?', options: ['폐활량 감소', '안정 시 심박수 증가', '일회박출량 증가', '최대산소섭취량 감소'], answer: 2, exam: '2021년 기출', date: '2024.05.08' },
  { number: 3, title: '훈련에 의해 심혈관계에서 적응이 일어날 때 나타나는 변화는?', options: ['심박수 증가', '일회박출량 감소', '혈압 상승', '안정 시 심박수 감소'], answer: 3, exam: '2020년 기출', date: '2024.05.05' },
];

function SimilarQuestions({ onNavigate }: { onNavigate: Navigate }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({ 1: 1, 2: 2, 3: 3 });
  const [sort, setSort] = useState('추천 순');
  const [toast, setToast] = useState('');
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); };

  return <div className="similar-page"><header className="similar-header"><button className="similar-brand" onClick={() => onNavigate('/')}><span className="similar-brand-icon"><span>S</span></span><span><strong>스포트패스</strong><small>생활스포츠지도사 2급</small></span></button><span className="similar-title">유사문제</span><div className="similar-filters"><SelectBox value="운동생리학" /><SelectBox value="기출문제" /><SelectBox value="중급" /><button className="similar-setting" onClick={() => notify('문제 설정을 준비하고 있습니다.')}><Network size={15} /> 문제 설정</button></div><div className="similar-user"><button className="similar-bell" onClick={() => notify('새로운 알림이 없습니다.')}><Bell size={20} /><i /></button><span><Flame size={17} /> 연속 학습 12일</span><b>학</b><strong>학습자</strong></div></header>
    <div className="similar-layout"><aside className="similar-sidebar"><button className="similar-home" onClick={() => onNavigate('/')}><Home size={22} /><span>메인화면으로<br />돌아가기</span><ChevronRight size={18} /></button><nav><SideLink icon={Home} label="홈" onClick={() => onNavigate('/')} /><SideLink icon={BookOpen} label="문제풀기" onClick={() => onNavigate('/problem-solving')} /><SideLink icon={XCircle} label="오답노트" onClick={() => onNavigate('/wrong-notes')} /><SideLink icon={RefreshCw} label="유사문제 훈련" active onClick={() => undefined} /><SideLink icon={Mic} label="구술시험" onClick={() => notify('구술시험 화면을 준비하고 있습니다.')} /><SideLink icon={BookOpen} label="나의 학습" onClick={() => onNavigate('/my-learning')} /><SideLink icon={FileText} label="학습 가이드" onClick={() => notify('학습 가이드를 준비하고 있습니다.')} /></nav><div className="similar-recommend"><h3>AI가 추천하는<br />오늘의 학습</h3><RecommendationRow label="필기 추천 문제" value="10문제" tone="blue" /><RecommendationRow label="구술 질문" value="3문제" tone="green" /><RecommendationRow label="오답 복습" value="5문제" tone="orange" /><button onClick={() => onNavigate('/my-learning')}>학습 현황 보기 <ArrowRight size={14} /></button></div></aside>
      <main className="similar-main"><button className="back-to-wrong" onClick={() => onNavigate('/wrong-notes')}><ChevronRight size={15} /> 오답노트로 돌아가기</button><OriginalQuestion /><div className="similar-heading"><div><h1>유사문제 <small>3개</small></h1><p>같은 개념을 묻는 유사문제로 실력을 키워보세요!</p></div><label>문제 순서<select value={sort} onChange={(event) => setSort(event.target.value)}><option>추천 순</option><option>최신 순</option></select><ChevronDown size={15} /></label></div><div className="similar-question-list">{similarQuestions.map((question) => <SimilarCard key={question.number} question={question} selected={selectedAnswers[question.number]} onSelect={(answer) => setSelectedAnswers((current) => ({ ...current, [question.number]: answer }))} onSolve={() => onNavigate('/problem-solving')} />)}</div><button className="more-similar" onClick={() => notify('유사문제 10개를 준비하고 있습니다.')}>더 많은 유사문제 보기 (10개) <ChevronDown size={17} /></button></main>
      <aside className="similar-right"><TrainingStatus /><section className="similar-tip"><h2>학습 TIP</h2><p>유사문제를 반복해서 풀면<br /><strong>같은 개념</strong>을 다양한 방식으로 이해하고<br />실력을 확실히 향상시킬 수 있어요!</p></section><section className="concept-card"><h2>관련 개념 복습</h2><p>이 문제의 핵심 개념을 다시 확인해보세요.</p><ConceptRow label="심박수와 운동강도 관계" /><ConceptRow label="일회박출량의 변화" /><button onClick={() => notify('개념 노트를 준비하고 있습니다.')}>개념 노트 보기 <ArrowRight size={15} /></button></section><section className="hard-tip"><Lightbulb size={29} /><p>이해가 어려운 문제는<br /><strong>해설을 꼼꼼히</strong> 읽고,<br />관련 개념을 함께 복습해보세요!</p><button onClick={() => notify('해설 가이드를 준비하고 있습니다.')}>해설 가이드 보기 <ArrowRight size={15} /></button></section></aside></div>{toast && <div className="similar-toast">{toast}</div>}</div>;
}

function OriginalQuestion() { return <section className="original-question"><div className="original-meta"><span>기출 문제</span><b>운동생리학</b><strong>중급</strong><div><em>2023년 기출</em><small>2024.05.12</small></div></div><h2>심박수 증가와 일회박출량 증가가 나타나는 상황은?</h2><p className="wrong-answer"><XCircle size={17} /> 내가 선택한 답: 일회박출량 감소와 폐활량 증가</p><p className="right-answer"><span>●</span> 정답:　심박수 증가와 일회박출량 증가</p></section>; }
function TrainingStatus() { return <section className="training-status"><h2>나의 유사문제 훈련 현황</h2><div className="training-content"><div className="training-donut"><strong><b>1/3</b><small>33%</small></strong></div><div><p><i className="blue" />맞힌 문제 <b>1문제</b></p><p><i className="red" />틀린 문제 <b>1문제</b></p><p><i className="gray" />남은 문제 <b>1문제</b></p></div></div></section>; }
function SelectBox({ value }: { value: string }) { return <button className="similar-select">{value}<ChevronDown size={15} /></button>; }
function SideLink({ icon: Icon, label, active, onClick }: { icon: typeof Home; label: string; active?: boolean; onClick: () => void }) { return <button className={active ? 'similar-side-link active' : 'similar-side-link'} onClick={onClick}><Icon size={18} />{label}{active && <ChevronRight size={14} />}</button>; }
function RecommendationRow({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className={`similar-recommend-row ${tone}`}><span>{label}</span><b>{value}</b></div>; }
function SimilarCard({ question, selected, onSelect, onSolve }: { question: SimilarQuestion; selected: number; onSelect: (answer: number) => void; onSolve: () => void }) { return <article className="similar-card"><div className="similar-card-top"><span>{question.number}</span><b>운동생리학</b><strong>중급</strong><div><em>{question.exam}</em><small>{question.date}</small></div></div><h2>{question.title}</h2><div className="similar-options">{question.options.map((option, index) => <button key={option} className={selected === index ? 'selected' : ''} onClick={() => onSelect(index)}><i />{option}</button>)}</div><button className="solve-similar" onClick={onSolve}>문제 풀기</button></article>; }
function ConceptRow({ label }: { label: string }) { return <button className="concept-row">{label}<ChevronRight size={16} /></button>; }

export default SimilarQuestions;
