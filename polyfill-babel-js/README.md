# 何のためのディレクトリか

* Babelの [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) を対象に、`useBuiltIns` オプションの `usage` と `entry` の指定の違いによってどのようにPolyfillされるのか、その成果物を実際に見てみたかったがために作ったディレクトリです。
* ついでに、[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) も試しています。

# 何が観測できるのか

* https://babeljs.io/docs/en/babel-preset-env#usebuiltins に書いて通り、`usage` であればターゲットブラウザに応じて直前に必要なだけのPolyfillが読み込まれ、また `entry` であればcore-jsのimport文をターゲットブラウザに応じて不足しているPolyfillを全て注入してくれていることが見て取れる。
* また、pluginの [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) を使った場合、Globalを汚染せずにPolyfillが必要なだけ注入されることが見て取れた。
* https://javascript.info/modules-intro#a-module-code-is-evaluated-only-the-first-time-when-imported の通り、同じモジュールが複数回呼ばれた場合でも一度しか実行されないという仕様に基づいて、`__webpack_require__` で一度しか実行されないことが実際に確認できた。
  * `usage` の際、複数回Polyfillされる心配はないのか？と疑問に思う人の理解に役立つだろう。
  * 他参考：https://262.ecma-international.org/6.0/#sec-hostresolveimportedmodule
