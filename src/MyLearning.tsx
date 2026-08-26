import { useState } from 'react';
import './my-learning.css';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Flame,
  Home,
  ListChecks,
  Mic,
  NotebookTabs,
  Settings2,
  Target,
  Trophy,
  UserRound,
  X,
  XCircle,
} from 'lucide-react';

type Navigate = (path: string) => void;
type ActivityTab = '전체' | '문제풀이' | '오답노트' | '유사문제' | '구술시험';

type Subject = { name: string; progress: number; solved: string; accuracy: string; icon: typeof BookOpen; tone: string };
type Activity = { date: string; title: string; subject: string; type: ActivityTab; result: string; resultTone: string; time: string; icon: typeof BookOpen };

const subjects: Subject[] = [
  { name: '운동생리학', progress: 72, solved: '186 / 250', accuracy: '74%', icon: BookOpen, tone: 'blue' },
  { name: '운동역학', progress: 65, solved: '98 / 150', accuracy: '68%', icon: Target, tone: 'sky' },
  { name: '스포츠심리학', progress: 58, solved: '64 / 110', accuracy: '61%', icon: NotebookTabs, tone: 'purple' },
  { name: '운동처방론', progress: 70, solved: '52 / 75', accuracy: '72%', icon: CalendarDays, tone: 'orange' },
  { name: '한국체육사', progress: 63, solved: '28 / 60', accuracy: '60%', icon: ListChecks, tone: 'green' },
];

const activities: Activity[] = [
  { date: '05.20', title: '기출문제 2023년 1회 1번 문제 풀이', subject: '운동생리학', type: '문제풀이', result: '정답', resultTone: 'success', time: '2시간 전', icon: BookOpen },
  { date: '05.20', title: '기출문제 2023년 1회 2번 문제 오답', subject: '운동생리학', type: '오답노트', result: '오답', resultTone: 'error', time: '2시간 전', icon: XCircle },
  { date: '05.19', title: '유사문제 3문제 풀이', subject: '운동생리학', type: '유사문제', result: '2 / 3 정답', resultTone: 'warning', time: '4시간 전', icon: Target },
  { date: '05.19', title: '구술시험 연습 1문제', subject: '운동생리학', type: '구술시험', result: '완료', resultTone: 'success', time: '5시간 전', icon: Mic },
  { date: '05.18', title: '기출문제 2022년 2회 5번 문제 풀이', subject: '운동역학', type: '문제풀이', result: '정답', resultTone: 'success', time: '어제', icon: BookOpen },
];

function MyLearning({ onNavigate }: { onNavigate: Navigate }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activityTab, setActivityTab] = useState<ActivityTab>('전체');
  const [toast, setToast] = useState('');
  const [goalModal, setGoalModal] = useState(false);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };
  const filteredActivities = activityTab === '전체' ? activities : activities.filter((activity) => activity.type === activityTab);

  return (
    <div className="learning-page">
      <header className="learning-header">
        <div className="learning-brand-wrap">
          <button className="learning-brand" onClick={() => onNavigate('/')}>
            <span className="learning-brand-mark"><Trophy size={20} /></span>
            <span><strong>스포트패스</strong><small>생활스포츠지도사 2급</small></span>
          </button>
          <span className="learning-page-title">나의 학습</span>
        </div>
        <div className="learning-header-actions">
          <button className="notification" onClick={() => notify('새로운 학습 알림이 없습니다.')} aria-label="알림"><Bell size={20} /><i /></button>
          <span className="streak"><Flame size={18} /> 연속 학습 12일</span>
          <span className="profile-avatar">학</span><strong>학습자</strong>
        </div>
        <button className="learning-menu-toggle" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} aria-label="학습 메뉴 열기">{mobileSidebarOpen ? <X size={22} /> : <Settings2 size={22} />}</button>
      </header>

      <div className="learning-layout">
        <aside className={mobileSidebarOpen ? 'learning-sidebar open' : 'learning-sidebar'}>
          <button className="back-home-button" onClick={() => onNavigate('/')}><Home size={19} /> 메인화면으로 돌아가기 <ArrowRight size={18} /></button>
          <nav className="learning-nav">
            <SidebarLink icon={Home} label="홈" onClick={() => onNavigate('/')} />
            <SidebarLink icon={BookOpen} label="문제풀기" onClick={() => notify('문제풀기 화면을 준비하고 있습니다.')} />
            <SidebarLink icon={XCircle} label="오답노트" onClick={() => notify('오답노트 화면을 준비하고 있습니다.')} />
            <SidebarLink icon={Target} label="유사문제 훈련" onClick={() => notify('유사문제 훈련 화면을 준비하고 있습니다.')} />
            <SidebarLink icon={Mic} label="구술시험" onClick={() => notify('구술시험 화면을 준비하고 있습니다.')} />
            <SidebarLink icon={BarChart3} label="나의 학습" active onClick={() => setMobileSidebarOpen(false)} />
            <SidebarLink icon={FileText} label="학습 가이드" onClick={() => onNavigate('/learning-guide')} />
          </nav>
          <div className="recommend-box">
            <h3>AI가 추천하는<br />오늘의 학습</h3>
            <RecommendedRow label="필기 추천 문제" value="10문제" tone="blue" />
            <RecommendedRow label="구술 질문" value="3문제" tone="green" />
            <RecommendedRow label="오답 복습" value="5문제" tone="orange" />
            <button onClick={() => notify('현재 학습 현황을 보고 있어요.')}>학습 현황 보기 <ArrowRight size={15} /></button>
          </div>
        </aside>

        <main className="learning-main">
          <section className="learning-section summary-section">
            <SectionTitle icon={Trophy} title="학습 현황 요약" />
            <div className="summary-grid">
              <SummaryCard icon={BookOpen} title="총 학습 시간" value="18시간 30분" caption="이번 주 +3시간 20분" tone="blue" />
              <SummaryCard icon={Check} title="총 풀이 문제" value="428문제" caption="정답률 72%" tone="green" />
              <SummaryCard icon={Target} title="오답률" value="28%" caption="지난주 대비 ↓ 5%" tone="orange" />
              <SummaryCard icon={BarChart3} title="연속 학습" value="12일" caption="최고 기록 15일" tone="purple" />
            </div>
          </section>

          <section className="learning-section data-section">
            <SectionTitle icon={BarChart3} title="과목별 학습 현황" action="상세 보기" onAction={() => notify('과목별 상세 분석을 준비하고 있습니다.')} />
            <div className="subject-table table-card"><div className="subject-table-head"><span>과목</span><span>학습 진도율</span><span>풀이 문제</span><span>정답률</span></div>{subjects.map((subject) => <SubjectRow key={subject.name} subject={subject} />)}</div>
          </section>

          <section className="learning-section activity-section">
            <SectionTitle icon={ListChecks} title="최근 학습 활동" action="모든 활동 보기" onAction={() => setActivityTab('전체')} />
            <div className="activity-card table-card">
              <div className="activity-tabs">{(['전체', '문제풀이', '오답노트', '유사문제', '구술시험'] as ActivityTab[]).map((tab) => <button className={activityTab === tab ? 'active' : ''} key={tab} onClick={() => setActivityTab(tab)}>{tab}</button>)}</div>
              <div className="activity-table"><div className="activity-table-head"><span>날짜</span><span>활동 내용</span><span>과목</span><span>유형</span><span>결과</span><span>시간</span></div>{filteredActivities.map((activity) => <ActivityRow key={`${activity.date}-${activity.title}`} activity={activity} />)}</div>
            </div>
          </section>
        </main>

        <aside className="learning-right-panel">
          <section className="right-card goal-card"><RightTitle title="이번 주 학습 목표" icon={Target} action="목표 설정" onAction={() => setGoalModal(true)} /><GoalRow icon={BookOpen} label="문제 풀이 100문제" value="68 / 100" percent={68} tone="blue" /><GoalRow icon={Mic} label="구술 연습 5문제" value="3 / 5" percent={60} tone="green" /><GoalRow icon={FileText} label="오답 복습 20문제" value="12 / 20" percent={60} tone="orange" /></section>
          <section className="right-card schedule-card"><RightTitle title="다가오는 학습 일정" icon={CalendarDays} action="전체 일정 보기" onAction={() => notify('전체 학습 일정을 준비하고 있습니다.')} /><ScheduleRow dday="D-2" title="2023년 1회 기출 복습" date="5월 20일 (월)" tone="blue" /><ScheduleRow dday="D-4" title="구술시험 실전 연습" date="5월 22일 (수)" tone="green" /><ScheduleRow dday="D-7" title="취약 개념 집중 학습" date="5월 25일 (토)" tone="red" /></section>
          <section className="right-card ai-card"><RightTitle title="AI 학습 추천" icon={Target} /><Recommendation icon={BookOpen} text="운동생리학 오답률이 높은 '심박수 변화' 개념을 복습해보세요!" button="유사문제 3개 풀기" tone="blue" onClick={() => notify('유사문제 3개를 준비했어요.')} /><Recommendation icon={Mic} text="구술시험에서 자주 나오는 질문 유형을 연습해보세요!" button="구술 질문 보기" tone="green" onClick={() => notify('추천 구술 질문을 준비했어요.')} /></section>
        </aside>
      </div>
      {toast && <div className="learning-toast"><Check size={16} />{toast}</div>}
      {goalModal && <div className="learning-modal-backdrop" onClick={() => setGoalModal(false)}><div className="goal-modal" onClick={(event) => event.stopPropagation()}><button onClick={() => setGoalModal(false)}><X size={18} /></button><div className="modal-goal-icon"><Target size={25} /></div><h2>이번 주 학습 목표</h2><p>현재 샘플 목표가 설정되어 있습니다.</p><div className="goal-modal-list"><span>문제 풀이 <b>68 / 100</b></span><span>구술 연습 <b>3 / 5</b></span><span>오답 복습 <b>12 / 20</b></span></div><button className="modal-confirm" onClick={() => setGoalModal(false)}>확인</button></div></div>}
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active, onClick }: { icon: typeof Home; label: string; active?: boolean; onClick: () => void }) { return <button className={active ? 'learning-nav-link active' : 'learning-nav-link'} onClick={onClick}><Icon size={19} />{label}{active && <ChevronRight size={15} />}</button>; }
function SectionTitle({ icon: Icon, title, action, onAction }: { icon: typeof Trophy; title: string; action?: string; onAction?: () => void }) { return <div className="learning-section-title"><h2><Icon size={22} />{title}</h2>{action && <button onClick={onAction}>{action} <ArrowRight size={14} /></button>}</div>; }
function RightTitle({ icon: Icon, title, action, onAction }: { icon: typeof Trophy; title: string; action?: string; onAction?: () => void }) { return <div className="right-title"><h2><Icon size={20} />{title}</h2>{action && <button onClick={onAction}>{action}</button>}</div>; }
function SummaryCard({ icon: Icon, title, value, caption, tone }: { icon: typeof BookOpen; title: string; value: string; caption: string; tone: string }) { return <article className={`summary-card ${tone}`}><div className="summary-icon"><Icon size={23} /></div><div><span>{title}</span><strong>{value}</strong><small>{caption}</small></div></article>; }
function SubjectRow({ subject }: { subject: Subject }) { const Icon = subject.icon; return <div className="subject-row"><div className="subject-title"><span className={`subject-icon ${subject.tone}`}><Icon size={17} /></span><strong>{subject.name}</strong></div><div className="subject-progress"><div><i style={{ width: `${subject.progress}%` }} /></div><b>{subject.progress}%</b></div><span className="solved-count">{subject.solved}</span><span className={`accuracy-pill ${subject.tone}`}>{subject.accuracy}</span></div>; }
function ActivityRow({ activity }: { activity: Activity }) { const Icon = activity.icon; return <div className="activity-row"><span className="activity-date">{activity.date}</span><strong className="activity-title"><Icon size={14} />{activity.title}</strong><span>{activity.subject}</span><span>{activity.type}</span><b className={`result-pill ${activity.resultTone}`}>{activity.result}</b><span className="activity-time"><Clock3 size={13} />{activity.time}</span></div>; }
function RecommendedRow({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className={`recommended-row ${tone}`}><span>{label}</span><b>{value}</b></div>; }
function GoalRow({ icon: Icon, label, value, percent, tone }: { icon: typeof BookOpen; label: string; value: string; percent: number; tone: string }) { return <div className="goal-row"><div><span><Icon size={18} />{label}</span><b>{value}</b></div><div className="goal-progress"><i className={tone} style={{ width: `${percent}%` }} /></div></div>; }
function ScheduleRow({ dday, title, date, tone }: { dday: string; title: string; date: string; tone: string }) { return <div className="schedule-row"><strong className={tone}>{dday}</strong><div><b>{title}</b><span>{date}</span></div></div>; }
function Recommendation({ icon: Icon, text, button, tone, onClick }: { icon: typeof BookOpen; text: string; button: string; tone: string; onClick: () => void }) { return <div className="recommendation"><div className={`recommendation-icon ${tone}`}><Icon size={20} /></div><p>{text}</p><button onClick={onClick}>{button} <ArrowRight size={13} /></button></div>; }

export default MyLearning;
