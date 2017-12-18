## React-firebase-questionnaire
- `npm start`でビルド
```js
//package.jsonを書き換えてポートを変更している
"scripts": {
  "start": "PORT=3007 react-scripts start",
  "build": "react-scripts build",

```

## フォームの値の取り方
- event.target.value
- if文の使い方
```js

handleQuestionChange(e){
  // console.log(e.target.value);
  //e.target.nameを使うことでinput属性のnameを取得することができる(if文を使って絞り込み)
  var answers = this.state.answers;
  if(e.target.name === 'q1') {
    answers.q1 = e.target.value;
  }else if(e.target.name === 'q2'){
    answers.q2 = e.target.value;
  }else if(e.target.name === 'q3'){
    answers.q3 = e.target.value;
  }else if(e.target.name === 'q4'){
    answers.q4 = e.target.value;
  }
  //取得した値をsetStateで更新
  this.setState({answers:answers}, function(){
    console.log(this.state);
  });
}

<form onSubmit={this.handleQuestionSubmit.bind(this)}>
  <div>
    <label>What is your favorite operating system?</label><br />
    <input type="radio" name ="q1" value="Windows" onChange={this.handleQuestionChange}/>Windows<br />
    <input type="radio" name ="q1" value="OSX" onChange={this.handleQuestionChange}/>OSX<br />
    <input type="radio" name ="q1" value="Linux" onChange={this.handleQuestionChange}/>Linux<br />
    <input type="radio" name ="q1" value="Solaris" onChange={this.handleQuestionChange}/>Solaris<br />
    <input type="radio" name ="q1" value="Other" onChange={this.handleQuestionChange}/>Other<br />
  </div>
  <div>
    <label>What is your favorite brand of TV?</label><br />
    <input type="radio" name ="q2" value="Sony" onChange={this.handleQuestionChange}/>Sony<br />
    <input type="radio" name ="q2" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br />
    <input type="radio" name ="q2" value="Green" onChange={this.handleQuestionChange}/>Green<br />
    <input type="radio" name ="q2" value="Vizio" onChange={this.handleQuestionChange}/>Vizio<br />
    <input type="radio" name ="q2" value="Other" onChange={this.handleQuestionChange}/>Other<br />
  </div>
  <div>
    <label>What is your favorite Smartphone Brand?</label><br />
    <input type="radio" name ="q3" value="Moring" onChange={this.handleQuestionChange}/>Moring<br />
    <input type="radio" name ="q3" value="Afternoon" onChange={this.handleQuestionChange}/>Afternoon<br />
    <input type="radio" name ="q3" value="Evening" onChange={this.handleQuestionChange}/>Evening<br />
    <input type="radio" name ="q3" value="Night" onChange={this.handleQuestionChange}/>Night<br />
    <input type="radio" name ="q3" value="Other" onChange={this.handleQuestionChange}/>Other<br />
  </div>
  <div>
    <label>What is your favorite CPU Brand?</label><br />
    <input type="radio" name ="q4" value="Intel" onChange={this.handleQuestionChange}/>Intel<br />
    <input type="radio" name ="q4" value="AMD" onChange={this.handleQuestionChange}/>AMD<br />
    <input type="radio" name ="q4" value="Nivita" onChange={this.handleQuestionChange}/>Nivita<br />
    <input type="radio" name ="q4" value="NEXT" onChange={this.handleQuestionChange}/>Night<br />
    <input type="radio" name ="q4" value="GO" onChange={this.handleQuestionChange}/>Other<br />
  </div>
</form>
</span>
```

## firebase連携
- コンソール画面から登録
- ※Databaesの項目からルールに入り
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
//これにして書き込み権限を変更する
```
- `npm install --save firebase uuid`をインストール
-　※新しいものをいれてビルドこけるときは`npm i`で再度インストールすると通るっぽい
```js
//これをidのthis.stte = {id:id}にセット
var uuid = require('uuid');
var firebase = require('firebase');

//firebaseのウェブアプリところをクリックしてスクリプトを出してこれを紐づける
var config = {
    apiKey: "AIzaSyBbR0mvdx9MTFykRKFhAPWfYrEAV2LT_vA",
    authDomain: "fir-survery.firebaseapp.com",
    databaseURL: "https://fir-survery.firebaseio.com",
    projectId: "fir-survery",
    storageBucket: "fir-survery.appspot.com",
    messagingSenderId: "75020075860"
  };
  firebase.initializeApp(config);


```

- firebaseDBへデータを入れる
```js
handleQuestionSubmit(e){
  console.log('Quesitions sumibtting...');
  //ここでdetabase()関数をref('オブジェクトの階層名'+ this.state.idでキーを設定) そしてname: ,answersに各値を代入
  firebase.database().ref('surveys/' + this.state.id).set({
    name: this.state.name,
    answers: this.state.answers
  });
  this.setState({submitted: true}, function() {
      console.log('Quesitions submitted...');
  });
  e.preventDefault();
}

```

- inputはサブミットされないとデータ送れないので注意
- `<input type="submit" value="Submit" />`抜けてて送れなかったので

## まとめ
- inputのサブミット忘れ注意（たぶんじぶんだけ笑）
- firebase連携は意外と簡単,構文になれる`firebase.database().ref('surveys/' + this.state.id).set({xxx: xxx, xxx: xxx})`
