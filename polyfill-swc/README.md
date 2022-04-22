# 何のためのディレクトリか

* Rustベースのコンパイラ、[swc](https://swc.rs/) を [swc-loader](https://swc.rs/docs/usage/swc-loader) 経由で使ったときに、どのようにPolyfillされるのか、その成果物を実際に見てみたかったがために作ったディレクトリ。

# 何が観測できたのか

* Babelでいう `useBuiltIns: "entry"` オプションと同様のPolyfillが可能なことが確認できた。
* また、`env.targets` オプションの指定だけで、PolyfillだけでなくES5形式へのTransformも同時にされることが確認できた。
* Babelほど高度なPolyfillのカスタマイズの支持が必要なかったり、または、core-jsの直接インポートによる局所最適化を必要としなかったりする場合には、swcを使ったトランスパイルも有用であろう。