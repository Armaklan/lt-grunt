if(!lt.util.load.provided_QMARK_('lt.plugins.grunt')) {
goog.provide('lt.plugins.grunt');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.platform');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.files');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.command');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('lt.objs.sidebar.command');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.object');
lt.plugins.grunt.log = (function log(str){return console.log(str);
});
lt.plugins.grunt.current_grunt_file = (function current_grunt_file(){var editor = lt.objs.editor.pool.last_active.call(null);var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));return lt.objs.files.walk_up_find.call(null,path,"Gruntfile.js");
});
lt.plugins.grunt.current_modules = (function current_modules(){var editor = lt.objs.editor.pool.last_active.call(null);var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));return lt.objs.files.walk_up_find.call(null,path,"node_modules");
});
lt.plugins.grunt.grunt_cli = (function grunt_cli(){var cli = require(lt.objs.files.join.call(null,lt.plugins.grunt.current_modules.call(null),"/grunt"));cli.option("gruntfile",lt.plugins.grunt.current_grunt_file.call(null));
cli.task.init(cljs.core.PersistentVector.EMPTY);
cli.option("verbose","true");
return cli;
});
lt.plugins.grunt.grunt_task_list = (function grunt_task_list(){try{var cli = lt.plugins.grunt.grunt_cli.call(null);return cli.task._tasks;
}catch (e7975){var e = e7975;lt.plugins.grunt.log.call(null,"Impossible de trouver grunt");
return [];
}});
lt.plugins.grunt.run_task = (function run_task(task){var cli = lt.plugins.grunt.grunt_cli.call(null);cli.task.run(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(task));
return cli.task.start();
});
lt.plugins.grunt.concatener = (function concatener(str1,str2){return clojure.string.join.call(null,cljs.core.concat.call(null,str1,str2));
});
lt.plugins.grunt.cmd_execution = (function cmd_execution(command){cljs.core.println.call(null,"Execution de : ",command);
return require("child_process").exec(command,(function (err,stdout,stderr){if(cljs.core.seq.call(null,stdout))
{cljs.core.println.call(null,"STDOUT: ",stdout);
} else
{}
if(cljs.core.seq.call(null,stderr))
{return cljs.core.println.call(null,"STDERR: ",stderr);
} else
{return null;
}
}));
});
lt.plugins.grunt.run_task_process = (function run_task_process(task){var grunt_cmd = lt.plugins.grunt.concatener.call(null,lt.plugins.grunt.current_modules.call(null),"/.bin/grunt --no-color ");var child = require("child_process").exec(lt.plugins.grunt.concatener.call(null,grunt_cmd,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(task)));child.stdout.on("data",((function (child,grunt_cmd){
return (function (data){return lt.plugins.grunt.log.call(null,data);
});})(child,grunt_cmd))
);
child.stderr.on("data",((function (child,grunt_cmd){
return (function (data){return lt.plugins.grunt.log.call(null,data);
});})(child,grunt_cmd))
);
return child;
});
lt.plugins.grunt.get_tasks = (function get_tasks(){var tasks = lt.plugins.grunt.grunt_task_list.call(null);return cljs.core.map.call(null,((function (tasks){
return (function (key){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),key,new cljs.core.Keyword(null,"description","description",3584325486),(tasks[key]).info], null);
});})(tasks))
,Object.keys(tasks));
});
lt.plugins.grunt.add_selector = (function add_selector(){return lt.plugins.grunt.selector.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"items","items",1114430258),lt.plugins.grunt.get_tasks.call(null),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"Grunt target",new cljs.core.Keyword(null,"transform","transform",2066570974),(function (p1__7977_SHARP_,p2__7978_SHARP_,p3__7979_SHARP_,p4__7976_SHARP_){return [cljs.core.str("<p>"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p4__7976_SHARP_)),cljs.core.str("</p>"),cljs.core.str("<p class='binding'>"),cljs.core.str(new cljs.core.Keyword(null,"description","description",3584325486).cljs$core$IFn$_invoke$arity$1(p4__7976_SHARP_)),cljs.core.str("</p>")].join('');
})], null));
});
lt.plugins.grunt.refresh_task = (function refresh_task(){return lt.object.assoc_in_BANG_.call(null,lt.objs.command.manager,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"commands","commands",4706336250),new cljs.core.Keyword(null,"grunt.run","grunt.run",4658105151),new cljs.core.Keyword(null,"options","options",4059396624)], null),lt.plugins.grunt.add_selector.call(null));
});
lt.plugins.grunt.kill = (function (){var method_table__7229__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__7230__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__7231__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__7232__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__7233__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("kill",((function (method_table__7229__auto__,prefer_table__7230__auto__,method_cache__7231__auto__,cached_hierarchy__7232__auto__,hierarchy__7233__auto__){
return (function (){return lt.objs.platform.win_QMARK_.call(null);
});})(method_table__7229__auto__,prefer_table__7230__auto__,method_cache__7231__auto__,cached_hierarchy__7232__auto__,hierarchy__7233__auto__))
,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__7233__auto__,method_table__7229__auto__,prefer_table__7230__auto__,method_cache__7231__auto__,cached_hierarchy__7232__auto__));
})();
cljs.core._add_method.call(null,lt.plugins.grunt.kill,true,(function (process){var cmd = clojure.string.join.call(null,cljs.core.concat.call(null,"taskkill /PID ",[cljs.core.str(process.pid)].join('')," /T /F"));return lt.plugins.grunt.cmd_execution.call(null,cmd);
}));
cljs.core._add_method.call(null,lt.plugins.grunt.kill,false,(function (process){return process.kill();
}));
lt.plugins.grunt.__BEH__kill = (function __BEH__kill(this$){var temp__4126__auto__ = new cljs.core.Keyword("lt.plugins.grunt","process","lt.plugins.grunt/process",884763508).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));if(cljs.core.truth_(temp__4126__auto__))
{var process = temp__4126__auto__;process.removeAllListeners();
lt.plugins.grunt.kill.call(null,process);
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.grunt","process","lt.plugins.grunt/process",884763508),null], null));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword(null,"kill","kill",1017196240),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"kill","kill",1017196240),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.grunt.__BEH__kill);
lt.plugins.grunt.__BEH__start_task = (function __BEH__start_task(this$,task){cljs.core.println.call(null,"Start task");
var child = lt.plugins.grunt.run_task_process.call(null,task);return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.grunt","process","lt.plugins.grunt/process",884763508),child], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword(null,"start-task","start-task",3689542530),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-task","start-task",3689542530),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.grunt.__BEH__start_task);
lt.plugins.grunt.__BEH__set_selected = (function __BEH__set_selected(this$,v){return lt.objs.sidebar.command.exec_active_BANG_.call(null,v);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.grunt","set-selected","lt.plugins.grunt/set-selected",3339425851),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.grunt.__BEH__set_selected);
lt.plugins.grunt.selector = (function selector(opts){var G__7981 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__7981,new cljs.core.Keyword("lt.plugins.grunt","set-selected","lt.plugins.grunt/set-selected",3339425851));
return G__7981;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.grunt","grunt.client","lt.plugins.grunt/grunt.client",4277577878),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",3951159101),null,new cljs.core.Keyword(null,"grunt.client","grunt.client",1077045947),null], null), null),new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"start-task","start-task",3689542530),new cljs.core.Keyword(null,"kill","kill",1017196240)], null),new cljs.core.Keyword(null,"name","name",1017277949),"Grunt task",new cljs.core.Keyword(null,"queue","queue",1121848451),cljs.core.PersistentVector.EMPTY);
lt.plugins.grunt.grunt_client = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.grunt","grunt.client","lt.plugins.grunt/grunt.client",4277577878));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"grunt.kill","grunt.kill",2314762702),new cljs.core.Keyword(null,"desc","desc",1016984067),"Grunt: Kill task",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.object.raise.call(null,lt.plugins.grunt.grunt_client,new cljs.core.Keyword(null,"kill","kill",1017196240));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"grunt.run","grunt.run",4658105151),new cljs.core.Keyword(null,"desc","desc",1016984067),"Grunt: Run a Task",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.grunt.add_selector.call(null),new cljs.core.Keyword(null,"exec","exec",1017031683),(function (task){return lt.object.raise.call(null,lt.plugins.grunt.grunt_client,new cljs.core.Keyword(null,"start-task","start-task",3689542530),task);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"grunt.load","grunt.load",2314797910),new cljs.core.Keyword(null,"desc","desc",1016984067),"Grunt: Load task list",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.grunt.refresh_task], null));
}

//# sourceMappingURL=grunt_compiled.js.map