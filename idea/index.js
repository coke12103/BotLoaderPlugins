const App = require('../../');

class Idea extends App.PluginBase{
  constructor(){
    super('Idea', 'アイディアを保存します');
    super.addCommand('idea', '引数なしでヘルプ!');
  }

  onCommand(command, argv, message){
    if(argv[0]) var co = argv.shift();
    else this.send_help(message);

    if(co == 'pull') this.pull_idea(message);
    else if(co == 'add') this.push_idea(argv, message);
    else if(co == 'remove') this.remove_idea(argv, message);
  }

  pull_idea(message){
    var data = super.store().get(message.guild.id);

    if(!data){
      super.store().set(message.guild.id, {});
      message.channel.send('ないよー');
      return;
    }

    var user_data = data[message.author.id];

    if(!user_data){
      message.channel.send('ないよー');
    }else{
      var result = [];

      var c = 1;
      for(var data of user_data){
        result.push(`${c}. ${data}`);
        c++;
      }
      message.channel.send("ほいよー\n\n" + result.join('\n'));
    }
  }

  push_idea(argv, message){
    var text = argv.join(' ');

    if(!super.store().get(message.guild.id)) super.store().set(message.guild.id, {});
    if(!super.store().get(message.guild.id)[message.author.id]) super.store().get(message.guild.id)[message.author.id] = [];

    !super.store().get(message.guild.id)[message.author.id].push(text);

    message.channel.send('りょーかーい');
  }

  remove_idea(argv, message){
    var data = super.store().get(message.guild.id);

    if(!data){
      super.store().set(message.guild.id);
      message.channel.send('ないよー');
      return;
    }

    var user_data = data[message.author.id];

    if(!user_data){
      message.channel.send('ないよー');
      return;
    }

    var ids = [];
    for(var id of argv){
      id = parseInt(id);
      if(!id || id > user_data.length){
        message.channel.send('指定がおかしくない？');
        return;
      }
      ids.push(parseInt(id));
    }

    var result = [];
    var removed = [];
    for(var i = 0; i < user_data.length; i++){
      if(!(ids.find((v) => v-1 == i))) result.push(user_data[i]);
      else removed.push(user_data[i]);
    }

    super.store().get(message.guild.id)[message.author.id] = result;

    message.channel.send('`' + removed.join(", ") + '`を消したよー');
  }

  send_help(message){
    message.channel.send(`Ideaプラグインではaddで追加、removeで削除、pullで確認ができるよー`);
  }
}

module.exports = Idea;
