const App = require('../../');
const AppInfo = require('../../package.json');

class Info extends App.PluginBase{
  constructor(){
    super('Info', 'インストールされているプラグインの情報を表示します');
    super.addCommand('info', 'いんふぉ!');
  }

  onCommand(command, argv, message){
    var pl_infos = App.PluginManager.list_plugins();

    var texts = [];
    for(var pl of pl_infos){
      var commands = [];
      for(var com of pl.commands){
        commands.push(`__${App.prefix}${com.command}__ ${com.description}`);
      }
      texts.push({ name: pl.name, value: `${pl.description}\n${commands.join('\n')}` });
    }

    message.channel.send( { embed: {
          title: "プラグイン情報",
          description: "インストールされてるプラグインの一覧です",
          fields: texts
    } } );
  }
}

module.exports = Info;
