import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Flame,
  Home,
  Lightbulb,
  ListChecks,
  Menu,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Settings2,
  Target,
  Trophy,
  UserRound,
  X,
  XCircle,
} from 'lucide-react';
import './problem-solving.css';

type Navigate = (path: string) => void;
type QuestionStatus = 'correct' | 'wrong' | 'current' | 'unanswered';

type Question = {
  number: number;
  title: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  { number: 1, title: '운동 시 에너지 대사에 대한 설명으로 가장 적절한 것은?', options: ['운동 강도가 높을수록 산소 소비량은 감소한다', 'ATP-PC 시스템은 짧고 강한 운동에 주로 사용된다', '지방은 모든 운동에서 가장 먼저 사용된다', '근육은 운동 중 에너지를 생성하지 않는다', '젖산은 운동 능력과 관계가 없다'], answer: 1, explanation: 'ATP-PC 시스템은 약 10초 이내의 짧고 강한 운동에서 빠르게 에너지를 공급합니다.' },
  { number: 2, title: '근수축과 관련된 설명으로 옳은 것은?', options: ['액틴과 미오신은 근수축에 관여하지 않는다', '등척성 수축에서는 근육의 길이가 변한다', '등장성 수축에서는 관절의 움직임이 나타난다', '근수축은 신경 자극과 무관하다', '근육은 이완할 때 에너지를 사용하지 않는다'], answer: 2, explanation: '등장성 수축은 근육의 길이가 변하면서 관절 움직임을 만들어내는 수축입니다.' },
  { number: 3, title: '운동 강도와 심박수의 관계로 가장 적절한 것은?', options: ['운동 강도가 증가하면 심박수는 일반적으로 증가한다', '심박수는 운동 강도와 항상 반비례한다', '심박수는 운동 중 변화하지 않는다', '심박수는 체력과 관계가 없다', '운동 후에는 즉시 안정시 심박수로 돌아온다'], answer: 0, explanation: '운동 강도가 증가하면 신체의 산소 요구량이 커져 심박수도 일반적으로 증가합니다.' },
  { number: 4, title: '유산소 운동 시 나타나는 일반적인 생리적 변화는?', options: ['심박수 감소와 혈압 상승', '일회박출량 감소와 폐활량 증가', '근섬유의 빠른 피로', '심박수 증가와 일회박출량 증가', '체온 저하와 호흡수 감소'], answer: 3, explanation: '유산소 운동에서는 심박수와 일회박출량이 증가하며 심폐 기능이 활발해집니다.' },
  { number: 5, title: '운동 후 회복에 대한 설명으로 옳은 것은?', options: ['운동 직후에는 산소 소비가 즉시 안정시 수준으로 내려간다', '회복 속도는 체력 수준과 관련이 없다', '정리운동은 회복을 돕고 혈액 정체를 줄인다', '수분 보충은 회복에 영향을 주지 않는다', '회복은 운동 효과와 무관하다'], answer: 2, explanation: '정리운동은 심박수와 혈액순환을 점진적으로 안정시켜 회복을 돕습니다.' },
  { number: 6, title: '최대산소섭취량에 대한 설명으로 옳은 것은?', options: ['근력만을 평가하는 지표이다', '심폐 체력의 대표적인 지표이다', '훈련으로 변화하지 않는다', '운동 수행과 무관하다', '나이와 관계없이 동일하다'], answer: 1, explanation: '최대산소섭취량은 심폐 체력을 나타내는 대표적인 지표로 유산소 운동 능력과 관련됩니다.' },
  { number: 7, title: '운동 중 체온 조절에 대한 설명으로 가장 적절한 것은?', options: ['발한은 체온을 올리는 작용이다', '운동 중 체온은 항상 일정하다', '피부 혈류 증가는 열 발산에 도움을 준다', '수분 섭취는 체온 조절을 방해한다', '습도는 체온 조절과 관계가 없다'], answer: 2, explanation: '피부 혈류가 증가하면 피부 표면으로 열을 이동시켜 체온을 조절하는 데 도움을 줍니다.' },
  { number: 8, title: '다음 중 유산소 운동 시 나타나는 일반적인 생리적 변화로 가장 적절한 것은?', options: ['심박수 감소와 혈압 상승', '일회박출량 감소와 폐활량 증가', '근섬유의 빠른 피로와 젖산 감소', '심박수 증가와 일회박출량 증가', '체온 저하와 호흡수 감소'], answer: 3, explanation: '유산소 운동에서는 심박수와 일회박출량이 증가하며, 산소를 운반하는 심폐 기능이 활발해집니다.' },
  { number: 9, title: '운동 처방의 FITT 원칙 중 빈도에 해당하는 것은?', options: ['운동을 얼마나 세게 하는가', '한 번에 얼마나 오래 하는가', '일주일에 몇 번 운동하는가', '어떤 종류의 운동을 하는가', '운동 후 얼마나 쉬는가'], answer: 2, explanation: 'FITT 원칙에서 Frequency는 운동 빈도, 즉 일주일 동안 운동하는 횟수를 뜻합니다.' },
  { number: 10, title: '점진적 과부하 원칙에 대한 설명으로 옳은 것은?', options: ['항상 같은 강도로 운동한다', '운동 부하는 단계적으로 증가시킨다', '휴식 없이 매일 운동한다', '운동량을 무작정 줄인다', '운동 종류를 계속 바꾼다'], answer: 1, explanation: '점진적 과부하는 신체가 적응함에 따라 운동 강도나 양을 단계적으로 높이는 원칙입니다.' },
  { number: 11, title: '운동 중 수분 섭취에 대한 설명으로 옳은 것은?', options: ['갈증이 나도 수분을 섭취하지 않는다', '운동 전후 수분 섭취는 중요하지 않다', '탈수를 예방하기 위해 적절히 수분을 섭취한다', '수분은 체온에 영향을 주지 않는다', '운동 중에는 물을 마시면 안 된다'], answer: 2, explanation: '운동 중 적절한 수분 섭취는 탈수와 체온 상승을 예방하는 데 중요합니다.' },
  { number: 12, title: '규칙적인 운동의 효과로 보기 어려운 것은?', options: ['심폐 체력 향상', '스트레스 감소', '근력과 근지구력 향상', '만성질환 위험 감소', '항상 피로와 부상 증가'], answer: 4, explanation: '규칙적인 운동은 적절한 강도와 회복을 지키면 건강 증진과 스트레스 감소에 도움을 줍니다.' },
  { number: 13, title: '운동 전 준비운동의 주요 목적은?', options: ['체온과 근육 온도를 높인다', '운동 시간을 줄인다', '피로를 빠르게 유발한다', '심박수를 즉시 낮춘다', '관절 가동범위를 제한한다'], answer: 0, explanation: '준비운동은 체온과 근육 온도를 높이고 본 운동에 대비하도록 신체를 준비시킵니다.' },
  { number: 14, title: '근지구력 운동의 특징으로 옳은 것은?', options: ['짧은 시간 최대 힘만 사용한다', '오랜 시간 반복적으로 힘을 발휘한다', '심폐 기능을 사용하지 않는다', '항상 무거운 중량만 사용한다', '반복 횟수와 관계가 없다'], answer: 1, explanation: '근지구력은 근육이 낮은 강도의 힘을 오랜 시간 또는 반복적으로 발휘하는 능력입니다.' },
  { number: 15, title: '운동 강도 설정 방법으로 알맞은 것은?', options: ['개인의 체력 수준을 고려하지 않는다', '목표와 건강 상태를 고려해 정한다', '항상 최대 강도로 실시한다', '운동 종류와 무관하게 동일하게 적용한다', '주관적 운동 강도는 사용할 수 없다'], answer: 1, explanation: '운동 목표와 개인의 체력 및 건강 상태를 고려해 적절한 강도를 정해야 합니다.' },
  { number: 16, title: '운동 후 정리운동의 효과로 옳은 것은?', options: ['혈액 정체를 예방하는 데 도움을 준다', '심박수를 급격히 높인다', '회복을 방해한다', '체온을 갑자기 낮춘다', '운동 효과를 모두 없앤다'], answer: 0, explanation: '정리운동은 운동 후 심박수와 혈액순환을 서서히 안정시켜 회복을 돕습니다.' },
  { number: 17, title: '생활체육 지도 시 가장 우선적으로 고려할 사항은?', options: ['참여자의 안전과 건강', '기록 향상만을 우선한다', '모든 참여자에게 같은 강도를 적용한다', '휴식을 제한한다', '부상자의 참여를 강요한다'], answer: 0, explanation: '생활체육 지도에서는 참여자의 안전과 건강 상태를 우선적으로 고려해야 합니다.' },
  { number: 18, title: '운동의 특이성 원칙에 대한 설명으로 옳은 것은?', options: ['모든 운동은 같은 효과를 낸다', '목표에 맞는 운동을 선택해야 한다', '운동 종류는 중요하지 않다', '운동 목표와 방법은 무관하다', '한 가지 운동은 모든 체력을 향상시킨다'], answer: 1, explanation: '특이성 원칙은 달성하려는 목표에 맞는 운동 형태와 강도를 선택해야 한다는 원칙입니다.' },
  { number: 19, title: '운동 손상 예방을 위한 방법으로 알맞은 것은?', options: ['충분한 준비운동과 정리운동을 실시한다', '통증을 무시하고 계속 운동한다', '운동 강도를 갑자기 높인다', '장비 점검을 생략한다', '회복 시간을 줄인다'], answer: 0, explanation: '충분한 준비운동과 정리운동은 운동 손상을 예방하고 회복을 돕습니다.' },
  { number: 20, title: '건강 체력 요소에 해당하지 않는 것은?', options: ['심폐지구력', '근력', '유연성', '신체조성', '경기 전략'], answer: 4, explanation: '건강 체력의 주요 요소는 심폐지구력, 근력, 근지구력, 유연성, 신체조성입니다.' },
];

const menuRoutes: Record<string, string> = { 홈: '/', 문제풀기: '/problem-solving', 오답노트: '/wrong-notes', '유사문제 훈련': '/similar-questions', '나의 학습': '/my-learning' };
const menuItems = [
  { label: '홈', icon: Home },
  { label: '문제풀기', icon: BookOpen, active: true },
  { label: '오답노트', icon: XCircle },
  { label: '유사문제 훈련', icon: RefreshCw },
  { label: '구술시험', icon: Mic },
  { label: '나의 학습', icon: ListChecks },
  { label: '학습 가이드', icon: FileText },
];

function ProblemSolving({ onNavigate }: { onNavigate: Navigate }) {
  const [questionIndex, setQuestionIndex] = useState(7);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({ 8: 3 });
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [paused, setPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jumpValue, setJumpValue] = useState('8');
  const [toast, setToast] = useState('');

  const question = questions[questionIndex];
  const selectedAnswer = selectedAnswers[question.number];
  const isChecked = Boolean(checkedQuestions[question.number]);
  const progress = Math.round(((questionIndex + 1) / questions.length) * 100);
  const correctCount = useMemo(() => Object.entries(checkedQuestions).filter(([number, checked]) => checked && selectedAnswers[Number(number)] === questions[Number(number) - 1].answer).length, [checkedQuestions, selectedAnswers]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };
  const selectQuestion = (nextIndex: number) => {
    setQuestionIndex(Math.max(0, Math.min(questions.length - 1, nextIndex)));
    setJumpValue(String(Math.max(1, Math.min(questions.length, nextIndex + 1))));
  };
  const goToQuestion = () => {
    const number = Number(jumpValue);
    if (Number.isInteger(number) && number >= 1 && number <= questions.length) selectQuestion(number - 1);
    else notify('1번부터 20번 사이의 문제를 선택해주세요.');
  };
  const checkAnswer = () => {
    if (selectedAnswer === undefined) {
      notify('답을 먼저 선택해주세요.');
      return;
    }
    setCheckedQuestions((current) => ({ ...current, [question.number]: true }));
  };
  const statusFor = (number: number): QuestionStatus => {
    if (number === question.number) return 'current';
    if (!checkedQuestions[number]) return 'unanswered';
    return selectedAnswers[number] === questions[number - 1].answer ? 'correct' : 'wrong';
  };

  return <div className="problem-page">
    <header className="problem-header">
      <button className="problem-brand" onClick={() => onNavigate('/')}><span className="problem-brand-icon"><Trophy size={20} /></span><span><strong>스포트패스</strong><small>생활스포츠지도사 2급</small></span></button>
      <span className="problem-title">문제풀기</span>
      <div className="problem-filters"><SelectBox value="운동생리학" /><SelectBox value="기출문제" /><SelectBox value="중급" /><button className="question-setting" onClick={() => notify('문제 설정을 준비하고 있습니다.')}><Settings2 size={16} /> 문제 설정</button></div>
      <div className="problem-user"><button className="problem-bell" onClick={() => notify('새로운 알림이 없습니다.')}><span /></button><span className="problem-streak"><Flame size={17} /> 연속 학습 12일</span><span className="problem-avatar">학</span><b>학습자</b></div>
      <button className="problem-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="메뉴 열기">{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
    </header>

    <div className="problem-layout">
      <aside className={mobileMenuOpen ? 'problem-sidebar open' : 'problem-sidebar'}>
        <button className="problem-home-button" onClick={() => onNavigate('/')}><Home size={20} /><span>메인화면으로<br />돌아가기</span><ChevronRight size={18} /></button>
        <nav className="problem-nav">{menuItems.map(({ label, icon: Icon, active }) => <button key={label} className={active ? 'problem-nav-link active' : 'problem-nav-link'} onClick={() => { const route = menuRoutes[label]; if (route) onNavigate(route); else notify(`${label} 화면을 준비하고 있습니다.`); }}><Icon size={18} />{label}{active && <ChevronRight size={14} />}</button>)}</nav>
        <div className="problem-recommend"><h3>AI가 추천하는<br />오늘의 학습</h3><RecommendItem label="필기 추천 문제" value="10문제" tone="blue" /><RecommendItem label="구술 질문" value="3문제" tone="green" /><RecommendItem label="오답 복습" value="5문제" tone="orange" /><button onClick={() => onNavigate('/my-learning')}>학습 현황 보기 <ArrowRight size={14} /></button></div>
      </aside>

      <main className="problem-main">
        <section className="question-panel">
          <div className="question-progress"><strong>문제 {question.number} / 20</strong><div><i style={{ width: `${progress}%` }} /></div><b>{progress}%</b><span className="timer"><Clock3 size={17} /> 00:12:35</span><button className="pause-button" onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />} {paused ? '계속' : '일시정지'}</button></div>
          <div className="question-content"><div className="question-meta"><span>운동생리학</span><b>중급</b><strong>2023년 기출</strong></div><h1>{question.title}</h1><div className="answer-list">{question.options.map((option, index) => <button key={option} className={selectedAnswer === index ? 'answer-option selected' : 'answer-option'} onClick={() => setSelectedAnswers((current) => ({ ...current, [question.number]: index }))}><span className="radio-mark">{selectedAnswer === index && <i />}</span><span>{option}</span>{isChecked && index === question.answer && <Check size={18} />}</button>)}</div><div className="question-actions"><button className="previous-button" onClick={() => selectQuestion(questionIndex - 1)} disabled={questionIndex === 0}>이전 문제</button><button className="check-button" onClick={checkAnswer}><Check size={18} /> 정답 확인</button></div>{isChecked && <div className={selectedAnswer === question.answer ? 'answer-feedback correct' : 'answer-feedback wrong'}><Lightbulb size={23} /><p>{selectedAnswer === question.answer ? '정답입니다! ' : '오답입니다. '}{question.explanation}</p><button onClick={() => notify('오답노트에 저장했습니다.')}>오답노트 바로가기 <ArrowRight size={14} /></button></div>}</div>
        </section>
        <LearningFlow />
      </main>

      <aside className="problem-right-panel"><section className="question-status-card"><h2>문제 진행 현황</h2><div className="status-legend"><span><i className="correct" />맞힌 문제</span><span><i className="wrong" />틀린 문제</span><span><i className="unanswered" />풀지 않은 문제</span><span><i className="current" />현재 문제</span></div><div className="question-grid">{questions.map((item) => <button key={item.number} className={`question-number ${statusFor(item.number)}`} onClick={() => selectQuestion(item.number - 1)}>{item.number}</button>)}</div></section><section className="jump-card"><h2>빠른 이동</h2><p>문제로 바로 이동하세요.</p><div><select value={jumpValue} onChange={(event) => setJumpValue(event.target.value)}>{questions.map((item) => <option key={item.number} value={item.number}>{item.number}번</option>)}</select><button onClick={goToQuestion}>이동</button></div></section><section className="tip-card"><h2>학습 TIP</h2><p>유산소 운동은 심혈관계의 기능을 향상시키고, 지속적인 운동 시 <strong>일회박출량</strong>과 <strong>최대산소섭취량</strong>이 증가합니다.</p></section></aside>
    </div>
    {toast && <div className="problem-toast"><Check size={16} />{toast}</div>}
  </div>;
}

function SelectBox({ value }: { value: string }) { return <button className="select-box">{value}<ChevronDown size={15} /></button>; }
function RecommendItem({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className={`recommend-item ${tone}`}><span>{label}</span><b>{value}</b></div>; }
function LearningFlow() { return <section className="learning-flow"><div className="flow-copy"><h2>스포트패스 학습 흐름</h2><p>효율적인 학습 사이클로<br />합격까지 연결합니다.</p></div><FlowStep icon={BookOpen} label="문제 풀이" description="다양한 문제를 풀어요" tone="blue" /><ChevronRight className="flow-arrow" /><FlowStep icon={XCircle} label="오답 저장" description="틀린 문제는 자동 저장" tone="red" /><ChevronRight className="flow-arrow" /><FlowStep icon={RefreshCw} label="유사문제 학습" description="같은 개념을 반복 훈련" tone="purple" /><ChevronRight className="flow-arrow" /><FlowStep icon={Target} label="실력 향상" description="취약점을 극복해요" tone="green" /><ChevronRight className="flow-arrow" /><FlowStep icon={Trophy} label="합격 달성" description="목표를 이루세요!" tone="orange" /></section>; }
function FlowStep({ icon: Icon, label, description, tone }: { icon: typeof BookOpen; label: string; description: string; tone: string }) { return <div className="flow-step"><div className={`flow-icon ${tone}`}><Icon size={27} /></div><strong>{label}</strong><span>{description}</span></div>; }

export default ProblemSolving;
