"use client";

import { useEffect, useMemo, useState } from "react";
import {
  bonus,
  challenges,
  concede,
  exportNotes,
  followups,
  impacts,
  intro,
  jdMap,
  layout,
  likelyQuestions,
  offlineWatch,
  pitfalls,
  products,
  readFirst,
  roles,
  rubric,
  speak90,
  timeline,
  topThree,
} from "@/lib/content";

const tabs = [
  ["goods", "产品"],
  ["case", "真题"],
  ["layout", "布局"],
  ["room", "群面"],
  ["self", "个人"],
  ["drill", "计时"],
] as const;

type Tab = (typeof tabs)[number][0];

export function Brief() {
  const [tab, setTab] = useState<Tab>("goods");
  const [picked, setPicked] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  function toggle(n: number) {
    setRevealed(false);
    setPicked((prev) => {
      if (prev.includes(n)) return prev.filter((x) => x !== n);
      if (prev.length >= 3) return prev;
      return [...prev, n];
    });
  }

  const overlap = useMemo(() => picked.filter((n) => topThree.includes(n)).length, [picked]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <header className="grid items-end gap-8 border-b border-[var(--line)] pb-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-stamp">美的国际 · 应届 · 线下群面</p>
          <h1 className="serif mt-3 text-4xl leading-tight text-ink sm:text-5xl">
            海外电商运营
            <span className="block text-cinnabar">一面，怎么把这道题说完</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-ink-soft">
            题目是 2021 年出口八项挑战。面试官看的不是你背过标准答案，而是你能不能在二十分钟里拿出排序标准，并落到舱位、到岸毛利和到港周。
          </p>
        </div>
        <aside className="relative rounded-sm border border-[var(--line)] bg-white/50 p-5">
          <div className="stamp absolute -right-1 -top-3 px-2 py-1 text-[10px]">一面</div>
          <p className="text-xs tracking-widest text-ink-soft">岗位在看的三件事</p>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            <li>销额和毛利，而不是活动办完了。</li>
            <li>货、价、流量能不能串成一条链。</li>
            <li>讨论里肯取舍，肯把结论说成“我们”。</li>
          </ul>
        </aside>
      </header>

      <nav className="sticky top-0 z-10 -mx-4 mt-6 flex gap-2 overflow-x-auto bg-[var(--paper)]/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`shrink-0 border px-4 py-2 text-sm ${
              tab === id ? "border-ink bg-ink text-[var(--paper)]" : "border-[var(--line)] bg-white/40"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "goods" && (
        <section className="mt-6 space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {exportNotes.map((note) => (
              <article key={note.title} className="border border-[var(--line)] bg-white/70 p-4">
                <h2 className="serif text-lg">{note.title}</h2>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{note.body}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {readFirst.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="border border-sea px-3 py-2 text-sm text-sea"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ul className="grid gap-4">
            {products.map((item) => (
              <li key={item.name} className="border border-[var(--line)] bg-white/60 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="serif text-2xl">{item.name}</h2>
                  <p className="text-xs text-stamp">{item.unit}</p>
                </div>
                <p className="mt-3 text-sm leading-7">{item.japan}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-sm text-cinnabar underline">
                      {link.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === "case" && (
        <section className="mt-6 space-y-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {rubric.map((r) => (
              <article key={r.name} className="border border-[var(--line)] bg-white/60 p-4">
                <h2 className="serif text-lg">{r.name}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{r.detail}</p>
              </article>
            ))}
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="serif text-2xl">先选出你的三项</h2>
              <p className="text-sm text-ink-soft">已选 {picked.length} / 3</p>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {challenges.map((c) => {
                const on = picked.includes(c.n);
                return (
                  <li key={c.n}>
                    <button
                      onClick={() => toggle(c.n)}
                      className={`h-full w-full border p-4 text-left ${
                        on ? "border-sea bg-sea text-white" : "border-[var(--line)] bg-white/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs tracking-widest opacity-80">
                          0{c.n} · {c.tag}
                        </span>
                        <span className="text-xs">{on ? "已选" : "选入"}</span>
                      </div>
                      <p className="serif mt-2 text-lg leading-snug">{c.title}</p>
                      <p className={`mt-2 text-sm leading-6 ${on ? "text-white/85" : "text-ink-soft"}`}>{c.chain}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                disabled={picked.length !== 3}
                onClick={() => setRevealed(true)}
                className="border border-cinnabar bg-cinnabar px-4 py-2 text-sm text-white disabled:opacity-40"
              >
                对照参考选法
              </button>
              <button
                onClick={() => {
                  setPicked([]);
                  setRevealed(false);
                }}
                className="border border-[var(--line)] px-4 py-2 text-sm"
              >
                清空
              </button>
            </div>
            {revealed && (
              <div className="mt-4 border border-stamp/40 bg-[#f7f1e4] p-5">
                <p className="text-sm leading-7">
                  你选了 {picked.map((n) => n).join("、")}，和参考项重合 {overlap} 项。参考选法是{" "}
                  <strong>3 物流、5 关税、7 供应不稳</strong>
                  。重合少不代表错。群面里站得住的是标准，不是番号。
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{concede}</p>
              </div>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {impacts.map((item) => (
              <article key={item.n} className="border-t-4 border-cinnabar bg-white/70 p-4">
                <h3 className="serif text-xl">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="border border-[var(--line)] p-5">
            <h2 className="serif text-2xl">八项各自怎么放</h2>
            <p className="mt-2 text-sm text-ink-soft">被问到“为什么不选它”时，用这一列，不要说“它不重要”。</p>
            <ul className="mt-4 divide-y divide-[var(--line)]">
              {challenges.map((c) => (
                <li key={c.n} className="grid gap-2 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="text-sm font-medium">
                    {c.n}. {c.tag}
                  </p>
                  <div>
                    <p className="text-sm">{c.impact}</p>
                    <p className="mt-1 text-sm text-ink-soft">{c.rankNote}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {tab === "layout" && (
        <section className="mt-6 space-y-6">
          <ol className="grid gap-4 lg:grid-cols-2">
            {layout.map((block) => (
              <li key={block.id} className="border border-[var(--line)] bg-white/60 p-5">
                <p className="text-xs tracking-[0.18em] text-sea">{block.id}</p>
                <h2 className="serif mt-1 text-2xl">{block.name}</h2>
                <p className="mt-1 text-xs text-stamp">{block.jd}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6">
                  {block.lines.map((line) => (
                    <li key={line} className="border-l-2 border-cinnabar/70 pl-3">
                      {line}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <article className="bg-ink p-5 text-[var(--paper)] sm:p-7">
            <h2 className="serif text-2xl">90 秒小组呈现，可直接说</h2>
            <ol className="mt-4 space-y-3 text-sm leading-7">
              {speak90.map((line, i) => (
                <li key={line}>
                  <span className="mr-2 text-cinnabar">{i + 1}</span>
                  {line}
                </li>
              ))}
            </ol>
          </article>
        </section>
      )}

      {tab === "room" && (
        <section className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {offlineWatch.map((block) => (
              <article key={block.name} className="border border-[var(--line)] bg-white/70 p-4">
                <h2 className="serif text-xl">{block.name}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-soft">
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div>
            <h2 className="serif text-2xl">这道题后面常接的问法</h2>
            <ul className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {likelyQuestions.map((item) => (
                <li key={item.q} className="py-4">
                  <p className="font-medium">{item.q}</p>
                  <p className="mt-1 text-sm leading-7 text-ink-soft">{item.a}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-x-auto border border-[var(--line)]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/70 text-xs tracking-widest text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-medium">时段</th>
                  <th className="px-4 py-3 font-medium">你在做什么</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((row) => (
                  <tr key={row.t} className="border-t border-[var(--line)]">
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{row.t}</td>
                    <td className="px-4 py-3 leading-6">{row.do}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((r) => (
              <article key={r.role} className="bg-white/60 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="serif text-xl">{r.role}</h2>
                  <span className="text-xs text-stamp">{r.when}</span>
                </div>
                <p className="mt-3 text-sm leading-7">“{r.say}”</p>
              </article>
            ))}
          </div>
          <article className="border border-cinnabar/40 p-5">
            <h2 className="serif text-xl text-cinnabar">现场容易丢分的五句</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {pitfalls.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        </section>
      )}

      {tab === "self" && (
        <section className="mt-6 space-y-6">
          <article className="border border-[var(--line)] bg-white/70 p-5">
            <h2 className="serif text-2xl">60 秒自我介绍</h2>
            <p className="mt-1 text-sm text-ink-soft">空格换成你的事实。没有跨境实习就不要编后台。</p>
            <ol className="mt-4 space-y-3 text-sm leading-7">
              {intro.map((line, i) => (
                <li key={line} className="grid grid-cols-[1.5rem_1fr] gap-2">
                  <span className="text-cinnabar">{i + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </article>
          <div className="grid gap-3">
            {jdMap.map((row) => (
              <article key={row.duty} className="grid gap-2 border border-[var(--line)] p-4 md:grid-cols-[12rem_1fr_1.2fr]">
                <h3 className="serif text-lg">{row.duty}</h3>
                <p className="text-sm leading-6 text-ink-soft">{row.ask}</p>
                <p className="text-sm leading-6">{row.you}</p>
              </article>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bonus.map((b) => (
              <article key={b.item} className="bg-sea p-4 text-white">
                <h3 className="text-sm tracking-widest text-white/70">{b.item}</h3>
                <p className="mt-2 text-sm leading-6">{b.line}</p>
              </article>
            ))}
          </div>
          <div>
            <h2 className="serif text-2xl">追问</h2>
            <ul className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {followups.map((f) => (
                <li key={f.q} className="py-4">
                  <p className="font-medium">{f.q}</p>
                  <p className="mt-1 text-sm leading-7 text-ink-soft">{f.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {tab === "drill" && <Drill />}
    </div>
  );
}

function Drill() {
  const presets = [
    { label: "定标准", sec: 40, hint: "只说三个标准，问同组是否同意。不要开始选号。" },
    { label: "个人一轮", sec: 60, hint: "标准、你的三项、只展开一项影响。" },
    { label: "小组呈现", sec: 90, hint: "用“我们”。标准、三项、四步布局、一个分歧。" },
    { label: "自我介绍", sec: 60, hint: "学校与英语、为什么是这个岗位、一个带数字的例子、收束。" },
  ];
  const [sec, setSec] = useState(60);
  const [left, setLeft] = useState(60);
  const [run, setRun] = useState(false);
  const [hint, setHint] = useState(presets[1].hint);

  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          setRun(false);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [run]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <section className="mt-8">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setSec(p.sec);
              setLeft(p.sec);
              setRun(false);
              setHint(p.hint);
            }}
            className={`border px-3 py-2 text-sm ${sec === p.sec && hint === p.hint ? "border-ink bg-ink text-[var(--paper)]" : "border-[var(--line)]"}`}
          >
            {p.label} · {p.sec}s
          </button>
        ))}
      </div>
      <div className="mt-8 border border-[var(--line)] bg-white/70 px-6 py-10 text-center">
        <p className="serif text-7xl tabular-nums tracking-tight sm:text-8xl">
          {mm}:{ss}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink-soft">{hint}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              if (left === 0) {
                setLeft(sec);
                setRun(true);
                return;
              }
              setRun((v) => !v);
            }}
            className="bg-cinnabar px-5 py-2 text-sm text-white"
          >
            {run ? "暂停" : left === 0 ? "再来一次" : "开始"}
          </button>
          <button
            onClick={() => {
              setRun(false);
              setLeft(sec);
            }}
            className="border border-[var(--line)] px-5 py-2 text-sm"
          >
            重置
          </button>
        </div>
      </div>
      <article className="mt-6 text-sm leading-7 text-ink-soft">
        练的时候出声。卡壳就停表，把那一句写成短句再重来。呈现稿在「布局」页，介绍稿在「个人」页。
      </article>
    </section>
  );
}
