# 何のためのディレクトリか

* Babelの [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) を対象に、`useBuiltIns` オプションの `usage` と `entry` の指定の違いによってどのようにPolyfillされるのか、その成果物を実際に見てみたかったがために作ったディレクトリ。
* ついでに、[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) も試しており、Globalを汚染しないPolyfillや、ヘルパー関数の集約がどのように行われるのか見てみた。

# 何が観測できたのか

* https://babeljs.io/docs/en/babel-preset-env#usebuiltins に書いてある通り、`useBuiltIns` オプションが `usage` であればターゲットブラウザに応じて直前に必要なだけのPolyfillが読み込まれ、また `entry` であればcore-jsのimport文をターゲットブラウザに応じて不足しているPolyfillを全て注入してくれていることが見て取れた。
* また、pluginの [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) を使い、`corejs` の指定を与えた場合、Polyfill可能な箇所がGlobalを汚染せずに置き換えされることが見て取れた。
* 一方、pluginの [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) を `corejs` のオプションを与えずに使った場合は、`_createClass` などのヘルパー関数が独自に定義されるのではなくプラグインに内蔵の関数に集約されたことが見て取れた。
* https://javascript.info/modules-intro#a-module-code-is-evaluated-only-the-first-time-when-imported の通り、同じモジュールが複数回呼ばれた場合でも一度しか実行されないという仕様に基づいて、`__webpack_require__` で一度しか実行されないことが実際に確認できた。
  * `usage` の際、複数回Polyfillされる心配はないのか？と疑問に思う人の理解に役立つだろう。
  * 他参考：https://262.ecma-international.org/6.0/#sec-hostresolveimportedmodule
