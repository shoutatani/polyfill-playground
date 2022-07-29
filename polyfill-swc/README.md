# swc を経由する polyfill

Rust ベースのコンパイラ、[swc](https://swc.rs/) を [swc-loader](https://swc.rs/docs/usage/swc-loader) 経由で使ったときに、どのように polyfill されるのか、その成果物を実際に見てみたかったがために作ったディレクトリ。

## 何が観測できたのか

- Babel でいう `useBuiltIns: "entry"` オプションと同様の polyfill が可能なことが確認できた。
- また、`env.targets` オプションの指定だけで、polyfill だけでなく ES5 形式への Transform も同時にされることが確認できた。

## 誰が swc を経由する polyfill を使えばいいのか

以下持論。

- ライブラリ作者

  - entry な polyfill しかできないのであれば、pure な polyfill ができる他の方法を使うべき。

- アプリケーション側
  - Babel ほど高度な polyfill のカスタマイズが必要なかったり、または、core-js の直接インポートによる局所最適化を必要としなかったりする場合には、swc を使ったトランスパイルも簡単で有用であろう。
