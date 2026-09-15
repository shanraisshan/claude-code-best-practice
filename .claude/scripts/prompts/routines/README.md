# Claude Code Routines — パイプライン prompt

`TakuTsuchida/technical-fundamental-backtester` のラベル駆動 自律開発パイプライン
（**requirement → user-story → design → implement → PR → review/merge**）を、
クラウドの [Claude Code Routines](https://code.claude.com/docs/en/routines)
（claude.ai/code/routines、サブスク枠で実行）として運用するための **登録用ソース** です。

> Routines はファイル駆動ではなく UI 登録です。このディレクトリの各 `.md` は
> 「UI 登録時に本文を貼り、Model / Schedule / Repository / Trigger を設定するための版管理ソース」
> という位置づけです（先頭メタ行が登録手順を兼ねます）。
> 既存の launchd 方式（`../01.Implementation.md` / `../02.pr-review.md` と `routine-engineering.sh`）とは別系統です。

## ルーチン一覧

| # | ファイル | ロール | Model | 入力ラベル | 成果物 | 想定スケジュール |
|---|----------|--------|-------|-----------|--------|------------------|
| 01 | `01.create-user-story.md` | PO | Opus | `requirement` | `user-story` issue | 毎週 月 |
| 02 | `02.design-from-user-story.md` | architect | Opus | `user-story` | `design` issue | 毎週 月 |
| 03 | `03.decompose-design-to-issues.md` | architect | Opus | `design` | `implement` sub-issue 複数（各200行以内） | 毎週 月 |
| 04 | `04.implement-and-create-pr.md` | engineer | Sonnet | `implement` | 実装 → PR（`Closes #`） | 火〜日 複数回/日 |
| 05 | `05.pr-review-and-merge.md` | tech-lead | Sonnet | open PR | レビュー → 修正 → CI 通過 → squash merge | 火〜日 複数回/日 |
| 06 | `06.investigate-bugs-create-issues.md` | tech-lead | Opus | コードベース全体 | `implement` fix issue 複数（各200行以内） | 毎週 金 |

ラベル体系: `requirement` / `user-story` / `design` / `implement`。

## 登録手順（claude.ai/code/routines）

各ファイルにつき1ルーチンを作成します。

1. [claude.ai/code/routines](https://claude.ai/code/routines) を開き **New routine** を選ぶ。
2. **Name**: ファイル名に対応する分かりやすい名前（例: `01 User Story 作成`）。
3. **Prompt**: 対象 `.md` の本文（`# Role` 以降）を貼り付ける。
4. **Model**: ファイル先頭の `Model:` の値（Opus / Sonnet）をドロップダウンで選択する。
5. **Repositories**: `technical-fundamental-backtester` を追加する。
6. **Trigger**: ファイル先頭の `Schedule:` に従い Schedule トリガーを設定する（最短1時間間隔）。
7. 保存して有効化する。

## 留意点

- **実行上限**: Pro = 5 runs/day、Max = 15 runs/day、Team/Enterprise = 25 runs/day。
  04/05 を1日複数回回す場合は枠を考慮しスケジュール本数を調整する。
- Routines は実行中に権限プロンプトが出ない自律セッション。ブランチ push 範囲・ネットワーク・
  シークレット（環境）は登録時の設定に従う。
- 本機能は research preview のため、仕様・上限は変わり得る。
