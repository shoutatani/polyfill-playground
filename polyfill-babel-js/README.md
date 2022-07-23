# 何のためのディレクトリか

- Babel の [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) を対象に、`useBuiltIns` オプションの `usage` と `entry` の指定の違いによってどのように Polyfill されるのか、その成果物を実際に見てみたかったがために作ったディレクトリ。
- ついでに、[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) も試しており、Global を汚染しない Polyfill や、ヘルパー関数の集約がどのように行われるのか見てみた。

# 何が観測できたのか

- https://babeljs.io/docs/en/babel-preset-env#usebuiltins に書いてある通り、`useBuiltIns` オプションが `usage` であればターゲットブラウザに応じて直前に必要なだけの Polyfill が読み込まれ、また `entry` であれば core-js の import 文をターゲットブラウザに応じて不足している Polyfill を全て注入してくれていることが見て取れた。
- また、plugin の [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) を使い、`corejs` の指定を与えた場合、Polyfill 可能な箇所が Global を汚染せずに置き換えされることが見て取れた。
- 一方、plugin の [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) を `corejs` のオプションを与えずに使った場合は、polyfill は関係無しに `_createClass` などのヘルパー関数が独自に定義されるのではなくプラグインに内蔵の関数に集約されたことが見て取れた。
- https://javascript.info/modules-intro#a-module-code-is-evaluated-only-the-first-time-when-imported の通り、同じモジュールが複数回呼ばれた場合でも一度しか実行されないという仕様に基づいて、`__webpack_require__` で一度しか実行されないことが実際に確認できた。
  - `usage` の際、複数回 Polyfill される心配はないのか？と疑問に思う人の理解に役立つだろう。
  - 他参考：https://262.ecma-international.org/6.0/#sec-hostresolveimportedmodule
