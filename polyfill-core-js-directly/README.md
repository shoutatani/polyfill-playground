# core-js をダイレクトに使う場合の polyfill

Babel を使えば内部で [`core-js`](https://github.com/zloirock/core-js) を使って polyfill が行われるが、Babel を使わずに core-js を直接使った場合にはどのように polyfill されるのか、その成果物を実際に見てみた。

## 何が観測できたのか

- https://github.com/zloirock/core-js#commonjs-api に書いてある polyfill されるものの違いが(以下の記述)、記述順にビルド成果物の行数・ファイルサイズが段階的に増えていくことで観測できた。
  - `import "core-js/es";` を与えていれば stable な ECMAScript に限って polyfill されること。
  - `import "core-js/stable";` を与えていれば stable な Web standards も追加で polyfill されること。
  - `import "core-js/actual";` を与えていれば更にプラスでステージ 3 以上の ECMAScript Proposal を含む polyfill が与えられること。
  - `import "core-js";` もしくは `import "core-js/full";` を与えていれば早期ステージを含む全機能まで polyfill されること。

## どの core-js の polyfill を使えばいいのか

以下持論。

- ライブラリ作者

  - global に polyfill されるので、pure に polyfill できるやり方で polyfill すべきか。
  - 今回挙げたものは global に polyfill されてしまうので、babel を使うか、`core-js-pure`を使った polyfill にすべきだろう。
  - 書き方を考えると、babel 等で pure な polyfill に書き換えるほうがいいと思っている。

- アプリケーション側
  - どのレベルまで polyfill が必要なのかに応じて polyfill を注入すればよい。
  - 更に最適化したければ、babel 等を挟んでターゲットブラウザに応じた polyfill にできる環境にすべき。
