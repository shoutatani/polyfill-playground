# 何のためのディレクトリか

- Babel を用いた polyfill がどのように行われるのか観測してみるため。
  - [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) preset では、`useBuiltIns` オプションの `usage` と `entry` の指定の違いによってどのように polyfill されるのかを見てみた。
  - [babel-plugin-polyfill-corejs3](https://www.npmjs.com/package/babel-plugin-polyfill-corejs3) plugin を使った場合にはどのように Global を汚染しない pure な polyfill がされるのかを見てみた。
  - [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) plugin を使った場合には、どのように Global を汚染しない pure な polyfill がされるのかや、ヘルパー関数の集約がどのように行われるのか見てみた。

# 何が観測できたのか

## [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) preset

- https://babeljs.io/docs/en/babel-preset-env#usebuiltins に書いてある通り、`useBuiltIns` オプションが `usage` であればターゲットブラウザに応じて直前に必要なだけの polyfill が読み込まれ、また `entry` であれば core-js の import 文をターゲットブラウザに応じて不足している polyfill を全て注入してくれていることが見て取れた。

## [babel-plugin-polyfill-corejs3](https://www.npmjs.com/package/babel-plugin-polyfill-corejs3) plugin

- [babel-plugin-polyfill-corejs3](https://www.npmjs.com/package/babel-plugin-polyfill-corejs3) を使い、`method: "usage-pure"`の指定で polyfill を行ったところ、babel 自体の targets オプションに応じて Global を汚染せずに置き換えされることが見て取れた。

## [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) plugin

- [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) を使い、`corejs` の指定を与えた場合、polyfill 可能な箇所が Global を汚染せずに置き換えされることが見て取れた。
- 一方、`corejs` のオプションを与えずに使った場合は、polyfill は関係無しに `_createClass` などのヘルパー関数が独自に定義されるのではなくプラグインに内蔵の関数に集約されたことが見て取れた。

## webpack(モジュールバンドラ) との関係性に関して

- https://javascript.info/modules-intro#a-module-code-is-evaluated-only-the-first-time-when-imported の通り、同じモジュールが複数回呼ばれた場合でも一度しか実行されないという仕様に基づいて、`__webpack_require__` で一度しか実行されないことが実際に確認できた。
  - `usage` の際、複数回 polyfill される心配はないのか？と疑問に思う人の理解に役立つだろう。
  - 他参考：https://262.ecma-international.org/6.0/#sec-hostresolveimportedmodule

## どの Babel の polyfill を使えばいいのかに関して

以下持論。

- ライブラリ作者

  - 前提として、一般に提供するライブラリはどんな環境でも動くようにすべきだと思うので polyfill はまず必要。
  - ライブラリ利用側への最小限の影響を考えると、Global を汚染しない pure な polyfill を行うべきか。
  - このとき、@babel/plugin-transform-runtime もしくは babel-plugin-polyfill-corejs3 による pure な polyfill が考えれる。
  - 前者は polyfill 可能なメソッドはすべて置き換えるが([`The plugin defaults to assuming that all polyfillable APIs will be provided by the user.`](https://babeljs.io/docs/en/babel-plugin-transform-runtime#with-a-configuration-file-recommended))、後者はターゲットブラウザに応じて必要なだけの polyfill を注入するので、後者で済ますとライブラリのサイズ圧縮が効くはずである。
  - したがって、babel-plugin-polyfill-corejs3 による pure な polyfill で問題ないであろう。
    - babel-plugin-polyfill-corejs3 で usage な polyfill もできるが、これはライブラリ利用側への影響が出ないとも言い切れないので、pure としたいところ。

- アプリケーション側
  - ケースバイケースだが、usage もしくは entry な polyfill いずれかを使用すればいいはずだ。
    - entry な polyfill を一つのチャンクで行うようなバンドル構成にしておけば、キャッシュが効くだろう。
    - バンドラを使わずチャンクが一つだけのような小規模なアプリケーションであれば、usage でも問題ないだろう。
    - global を汚染しない polyfill は不必要だろう。むしろ、関連ライブラリが polyfill を必要としている場合もあるので、デメリットすらあるはずだ。
