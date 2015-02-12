if(!lt.util.load.provided_QMARK_('lt.plugins.grunt')) {
goog.provide('lt.plugins.grunt');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.files');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.command');
goog.require('lt.objs.plugins');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.plugins');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.object');
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
}catch (e8243){var e = e8243;cljs.core.print.call(null,"Impossible de trouver grunt");
return [];
}});
lt.plugins.grunt.run_task = (function run_task(task){var cli = lt.plugins.grunt.grunt_cli.call(null);cljs.core.println.call(null,"Grunt : Run task : ",new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(task));
cli.task.run(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(task));
return cli.task.start();
});
lt.plugins.grunt.get_tasks = (function get_tasks(){var tasks = lt.plugins.grunt.grunt_task_list.call(null);return cljs.core.map.call(null,((function (tasks){
return (function (key){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),key,new cljs.core.Keyword(null,"description","description",3584325486),(tasks[key]).info], null);
});})(tasks))
,Object.keys(tasks));
});
lt.plugins.grunt.selector = (function selector(opts){var G__8245 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8245,new cljs.core.Keyword("lt.plugins.grunt","set-selected","lt.plugins.grunt/set-selected",3339425851));
return G__8245;
});
lt.plugins.grunt.add_selector = (function add_selector(){return lt.plugins.grunt.selector.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"items","items",1114430258),lt.plugins.grunt.get_tasks.call(null),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"Grunt target",new cljs.core.Keyword(null,"transform","transform",2066570974),(function (p1__8247_SHARP_,p2__8248_SHARP_,p3__8249_SHARP_,p4__8246_SHARP_){return [cljs.core.str("<p>"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p4__8246_SHARP_)),cljs.core.str("</p>"),cljs.core.str("<p class='binding'>"),cljs.core.str(new cljs.core.Keyword(null,"description","description",3584325486).cljs$core$IFn$_invoke$arity$1(p4__8246_SHARP_)),cljs.core.str("</p>")].join('');
})], null));
});
lt.plugins.grunt.refresh_task = (function refresh_task(){return lt.object.assoc_in_BANG_.call(null,lt.objs.command.manager,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"commands","commands",4706336250),new cljs.core.Keyword(null,"grunt.default","grunt.default",3655513589),new cljs.core.Keyword(null,"options","options",4059396624)], null),lt.plugins.grunt.add_selector.call(null));
});
lt.plugins.grunt.__BEH__on_target_select = (function __BEH__on_target_select(this$,v){return lt.objs.sidebar.command.exec_active_BANG_.call(null,v);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.grunt","on-target-select","lt.plugins.grunt/on-target-select",2806305431),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.grunt.__BEH__on_target_select);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"grunt.default","grunt.default",3655513589),new cljs.core.Keyword(null,"desc","desc",1016984067),"Grunt: Run Default Task",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.grunt.add_selector.call(null),new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.grunt.run_task], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"grunt.refresh","grunt.refresh",3196154511),new cljs.core.Keyword(null,"desc","desc",1016984067),"Grunt: Refresh task list",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.grunt.refresh_task], null));
}

//# sourceMappingURL=grunt_compiled.js.map