# 何のためのディレクトリか

* Babelを使えば内部で [`core-js`](https://github.com/zloirock/core-js) を使ってPolyfillが行われるが、Babelを使わずにcore-jsを直接使った場合にはどのようにPolyfillされるのか、その成果物を実際に見てみたかったがために作ったディレクトリです。

# 何が観測できたのか

* ビルド成果物の行数・ファイルサイズの変化で、https://github.com/zloirock/core-js#commonjs-api に書いてあるPolyfillされるものの違いが観測できた。
  * `import "core-js/es";` を与えていればstableなECMAScriptに限ってPolyfillされ、`import "core-js/stable";` を与えていればstableな Web standardsも追加でPolyfillされ、`import "core-js/actual";` を与えていれば更にプラスでステージ3以上のECMAScript Proposalを含むPolyfillが与えられ、`import "core-js";` もしくは `import "core-js/full";` を与えていれば早期ステージを含む全機能までPolyfillされるということは、記述順にビルド成果物の行数・ファイルサイズが増えていくことが観測できたことで事実であろうと考えられる。