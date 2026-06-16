import { useCallback, useMemo, useState } from "react";
import { ARTICLES, CLAIM_AMOUNT_PER_CORRECT, type Article } from "../data/learnEarnContent";
import { SEPOLIA_EXPLORER } from "../utils/constants";
import type { FaucetTxStatus } from "../hooks/useFaucetClaim";

type Step = "picking" | "reading" | "quizzing" | "scoring" | "claiming" | "claimed";

const STORAGE_KEY = "toko-learn-earn-v1";

type ClaimedEntry = {
  articleId: number;
  score: number;
  earned: number;
  timestamp: number;
  txHash?: string;
};

function loadClaimed(): ClaimedEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveClaimed(entries: ClaimedEntry[]): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch { /* ignore */ }
}

type QuizState = {
  answers: (number | null)[];
};

function ArticleCard({ article, done, earned, onPick }: { article: Article; done: boolean; earned: number; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`group text-left rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        done
          ? "bg-slate-800/40 border-emerald-800/40 opacity-75"
          : "bg-slate-800/40 border-cyber-800/40 hover:border-cyber-600/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-600/30 to-purple-700/30 border border-cyber-500/30 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          {done && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 text-[10px] font-semibold">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              +{earned} TOKO
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-cyber-100 group-hover:text-white transition-colors">{article.title}</h3>
        <p className="mt-1 text-[11px] text-cyber-500/70 font-light line-clamp-2">
          {article.text.slice(0, 120)}...
        </p>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-cyber-500/50 font-mono">
          <span>5 questions</span>
          <span className="w-1 h-1 rounded-full bg-cyber-700" />
          <span>~{article.text.split(" ").length} words</span>
        </div>
      </div>
    </button>
  );
}

type Props = {
  account: string;
  onConnect: () => void;
  claimReward: (score: number, articleId: number) => Promise<{ ok: boolean; txHash?: string }>;
  claimTxStatus: FaucetTxStatus;
};

export function LearnEarn({ account, onConnect, claimReward, claimTxStatus }: Props) {
  const [step, setStep] = useState<Step>("picking");
  const [article, setArticle] = useState<Article | null>(null);
  const [quiz, setQuiz] = useState<QuizState>({ answers: [null, null, null, null, null] });
  const [score, setScore] = useState(0);
  const [claimed, setClaimed] = useState<ClaimedEntry[]>(loadClaimed);

  const claimedIds = useMemo(() => new Set(claimed.map((c) => c.articleId)), [claimed]);
  const totalEarned = useMemo(() => claimed.reduce((sum, c) => sum + c.earned, 0), [claimed]);

  const handlePick = useCallback((a: Article) => {
    setArticle(a);
    setQuiz({ answers: [null, null, null, null, null] });
    setScore(0);
    setStep("reading");
  }, []);

  const handleAnswer = useCallback((index: number, value: number) => {
    setQuiz((prev) => {
      const next = [...prev.answers];
      next[index] = value;
      return { answers: next };
    });
  }, []);

  const canSubmit = useMemo(() => quiz.answers.every((a) => a !== null), [quiz.answers]);

  const handleSubmit = useCallback(() => {
    if (!article || !canSubmit) return;
    const s = quiz.answers.reduce<number>((acc, answer, i) => {
      return answer === article.questions[i].correctIndex ? acc + 1 : acc;
    }, 0);
    setScore(s);
    setStep("scoring");
    window.scrollTo({ top: document.getElementById("learn-earn")?.offsetTop ?? 0, behavior: "smooth" });
  }, [article, canSubmit, quiz.answers]);

  const handleClaim = useCallback(async () => {
    if (!article || step !== "scoring") return;
    setStep("claiming");
    const earned = score * CLAIM_AMOUNT_PER_CORRECT;
    const result = await claimReward(score, article.id);
    if (result.ok) {
      const entry: ClaimedEntry = { articleId: article.id, score, earned, timestamp: Date.now(), txHash: result.txHash };
      setClaimed((prev) => {
        const next = [entry, ...prev.filter((c) => c.articleId !== article.id)];
        saveClaimed(next);
        return next;
      });
      setStep("claimed");
    } else {
      setStep("scoring");
    }
  }, [article, score, step, claimReward]);

  const handleBack = useCallback(() => {
    setStep("picking");
    setArticle(null);
  }, []);

  const progressPct = useMemo(() => {
    if (step === "reading") return 20;
    if (step === "quizzing") return 50;
    if (step === "scoring") return 80;
    if (step === "claiming" || step === "claimed") return 100;
    return 0;
  }, [step]);

  return (
    <section id="learn-earn" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-cyber-800/40 px-3.5 py-2 mb-6">
          <svg className="w-4 h-4 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="font-mono text-xs font-medium text-cyber-400">LEARN & EARN</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white mb-4">
          Learn <span className="text-gradient">TOKO</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm text-cyber-200/60 font-light">
          Read an article, answer 5 questions, and earn TOKO tokens.
        </p>
      </div>

      {/* Progress bar */}
      {step !== "picking" && (
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-between text-[10px] text-cyber-500 font-mono mb-2">
            <span>Read</span>
            <span>Quiz</span>
            <span>Claim</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-600 to-purple-500 transition-all duration-700 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {totalEarned > 0 && step === "picking" && (
        <div className="max-w-xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/10 border border-emerald-500/20 px-4 py-2 text-xs text-emerald-400 font-semibold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {totalEarned} TOKO earned from learning
          </div>
        </div>
      )}

      {step === "picking" && (
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTICLES.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                done={claimedIds.has(a.id)}
                earned={claimed.find((c) => c.articleId === a.id)?.earned ?? 0}
                onPick={() => handlePick(a)}
              />
            ))}
          </div>
          {claimed.length > 0 && (
            <div className="mt-8 rounded-xl bg-slate-800/40 border border-cyber-800/30 p-5">
              <p className="text-[10px] font-mono uppercase text-cyber-500 tracking-wide mb-3">History</p>
              <div className="space-y-2">
                {claimed.slice(0, 5).map((entry) => (
                  <div key={`${entry.articleId}-${entry.timestamp}`} className="flex items-center justify-between text-xs">
                    <span className="text-cyber-300">{ARTICLES.find((a) => a.id === entry.articleId)?.title ?? `Article ${entry.articleId}`}</span>
                    <span className="text-emerald-400 font-semibold">+{entry.earned} TOKO</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {article && step !== "picking" && (
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs text-cyber-500 hover:text-cyber-300 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to articles
          </button>

          <div className="rounded-2xl bg-slate-900/60 border border-cyber-800/40 p-6 sm:p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <h3 className="text-xl font-bold text-white mb-4">{article.title}</h3>

            {(step === "reading" || step === "quizzing") && (
              <>
                <div className="text-sm text-cyber-200/80 leading-7 font-light mb-6 pb-6 border-b border-cyber-800/30">
                  {article.text}
                </div>

                {step === "reading" && (
                  <button
                    type="button"
                    onClick={() => setStep("quizzing")}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Quiz
                  </button>
                )}
              </>
            )}

            {step === "quizzing" && (
              <div className="space-y-6">
                {article.questions.map((q, qi) => (
                  <div key={qi} className="rounded-xl bg-slate-800/40 border border-cyber-800/30 p-4 sm:p-5">
                    <p className="text-sm font-semibold text-cyber-100 mb-3">
                      <span className="text-cyber-500 font-mono text-xs mr-2">Q{qi + 1}.</span>
                      {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const selected = quiz.answers[qi] === oi;
                        return (
                          <label
                            key={oi}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 cursor-pointer transition-all ${
                              selected
                                ? "bg-cyber-600/20 border-cyber-500/50"
                                : "bg-slate-800/30 border-cyber-800/30 hover:border-cyber-700/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q-${qi}`}
                              value={oi}
                              checked={selected}
                              onChange={() => handleAnswer(qi, oi)}
                              className="sr-only"
                            />
                            <span className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono transition-colors ${
                              selected
                                ? "bg-cyber-600 border-cyber-500 text-white"
                                : "bg-transparent border-cyber-600 text-cyber-500"
                            }`}>
                              {String.fromCharCode(65 + oi)}
                            </span>
                            <span className={`text-xs ${selected ? "text-cyber-100 font-medium" : "text-cyber-300"}`}>
                              {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                    canSubmit
                      ? "text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)]"
                      : "text-cyber-500 bg-slate-800/60 border border-cyber-800/30 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Answers
                </button>
              </div>
            )}

            {step === "scoring" && (
              <div className="text-center space-y-6">
                <div>
                  <p className="text-[10px] font-mono uppercase text-cyber-500 tracking-wide mb-2">Your Score</p>
                  <p className="text-5xl font-bold text-white tabular-nums">
                    {score}
                    <span className="text-cyber-500 text-2xl"> / {article.questions.length}</span>
                  </p>
                  <p className="text-sm text-cyber-300/70 mt-2">
                    {score === 0
                      ? "Don't worry — try another article!"
                      : `You earned ${score * CLAIM_AMOUNT_PER_CORRECT} TOKO!`}
                  </p>
                </div>

                <div className="space-y-2 text-left">
                  {article.questions.map((q, qi) => {
                    const correct = quiz.answers[qi] === q.correctIndex;
                    return (
                      <div
                        key={qi}
                        className={`rounded-xl border p-4 ${
                          correct
                            ? "bg-emerald-600/10 border-emerald-500/20"
                            : "bg-red-900/10 border-red-800/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            correct ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
                          }`}>
                            {correct ? (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </span>
                          <div className="flex-1">
                            <p className={`text-xs font-semibold ${correct ? "text-emerald-300" : "text-red-300"}`}>
                              Q{qi + 1}. {q.question}
                            </p>
                            {!correct && (
                              <p className="text-[11px] text-cyber-400/70 mt-1 leading-snug">
                                <span className="text-cyber-300 font-medium">Correct answer: </span>
                                {q.options[q.correctIndex]}
                              </p>
                            )}
                            <p className="text-[11px] text-cyber-500/60 mt-0.5 leading-snug">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {account ? (
                  <button
                    type="button"
                    onClick={handleClaim}
                    disabled={score === 0}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                      score > 0
                        ? "text-white bg-gradient-to-br from-emerald-600 to-green-700 border border-emerald-500/50 shadow-[0_0_16px_rgba(16,185,129,0.3)] hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]"
                        : "text-cyber-500 bg-slate-800/60 border border-cyber-800/30 cursor-not-allowed"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Claim {score * CLAIM_AMOUNT_PER_CORRECT} TOKO
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onConnect}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Connect Wallet to Claim
                  </button>
                )}
              </div>
            )}

            {step === "claiming" && (
              <div className="text-center py-12 space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-600/30 to-green-700/30 border border-emerald-500/30 flex items-center justify-center ${!claimTxStatus.txHash ? "animate-pulse" : ""}`}>
                  {claimTxStatus.txHash ? (
                    <a href={`${SEPOLIA_EXPLORER}/tx/${claimTxStatus.txHash}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 text-emerald-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                {claimTxStatus.message && (
                  <p className="text-sm text-cyber-300 font-semibold">{claimTxStatus.message}</p>
                )}
                {!claimTxStatus.message && (
                  <p className="text-sm text-cyber-300 font-semibold">Claiming your TOKO...</p>
                )}
                {claimTxStatus.txHash && (
                  <a href={`${SEPOLIA_EXPLORER}/tx/${claimTxStatus.txHash}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-cyber-500 hover:text-cyber-300 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View on Etherscan
                  </a>
                )}
              </div>
            )}

            {step === "claimed" && (
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-600/30 to-green-700/30 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-white">
                  +{score * CLAIM_AMOUNT_PER_CORRECT} TOKO Earned!
                </p>
                {claimTxStatus.txHash && (
                  <a href={`${SEPOLIA_EXPLORER}/tx/${claimTxStatus.txHash}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Transaction on Etherscan
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Try Another Article
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
