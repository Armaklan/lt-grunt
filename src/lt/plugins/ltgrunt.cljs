(ns lt.plugins.grunt
  (:require [lt.object :as object]
            [clojure.string :as string]
            [lt.objs.files :as files]
            [lt.objs.plugins :as plugins]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.sidebar.command :as sidebar]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [behavior]]))

(object/object* ::grunt.client
                :tags #{:client :grunt.client}
                :behaviors [:start-task :kill]
                :name "Grunt task"
                :queue [])

(def grunt-client (object/create ::grunt.client))

(defn log [str]
  (.log js/console str))

(defn current-grunt-file []
  (let [editor (pool/last-active)
        path (-> @editor :info :path)]
        (files/walk-up-find path "Gruntfile.js")))

(defn current-modules []
  (let [editor (pool/last-active)
        path (-> @editor :info :path)]
        (files/walk-up-find path "node_modules")))

(defn grunt-cli []
  (let [cli (js/require (files/join (current-modules) "/grunt" ))]
    (.option cli "gruntfile" (current-grunt-file))
    (.init (.-task cli) [])
    (.option cli "verbose" "true")
    cli
    ))

(defn grunt-task-list []
  (try
    (let [cli (grunt-cli)]
      (.-_tasks (.-task cli)))
  (catch :default e
    (log "Impossible de trouver grunt")
    #js [])))

(defn run-task [task]
  (let [cli (grunt-cli)]
    (.run (.-task cli) (:name task))
    (.start (.-task cli))
    ))

(defn concatener [str1 str2]
  (string/join (concat str1 str2)))

(defn run-task-process [task]
  (let [grunt-cmd (concatener (current-modules) "/grunt-cli/bin/grunt --no-color ")]
    (let [child (.exec (js/require "child_process")
           (concatener grunt-cmd (:name task))
           (fn [err stdout stderr]
             (when (seq err) (println err))))]
      (.on (.-stdout child) "data" (fn [data] (log data)))
      (.on (.-stderr child) "data" (fn [data] (log data)))
      child)))

(defn get-tasks []
  (let [tasks (grunt-task-list)]
    (map (fn [key] {:name key :description (.-info (aget tasks key))}) (.keys js/Object tasks))))

(defn selector [opts]
  (doto (sidebar/filter-list opts)
    (object/add-behavior! ::set-selected)))

(defn add-selector []
  (selector {:items (get-tasks)
             :key :name
             :placeholder "Grunt target"
             :transform #(str "<p>" (:name %4) "</p>"
                              "<p class='binding'>" (:description %4) "</p>")}))

(defn refresh-task []
  (object/assoc-in! cmd/manager [:commands :grunt.run :options] (add-selector)))

(behavior :kill
          :triggers #{:kill}
          :reaction (fn [this]
                      (when-let [process (::process @this)]
                        (log "Kill process : ")
                        (.kill process)
                        (object/merge! this {::process nil}))))

(behavior :start-task
          :triggers #{:start-task}
          :reaction (fn [this task]
                      (println "Start task")
                      (let [child (run-task-process task)]
                        (object/merge! this {::process child})
                        )))

(behavior ::set-selected
          :triggers #{:select}
          :reaction (fn [this v]
                      (sidebar/exec-active! v)))

(cmd/command {:command :grunt.kill
              :desc "Grunt: Kill task"
              :exec (fn []
                      (object/raise grunt-client :kill))})

(cmd/command {:command :grunt.run
              :desc "Grunt: Run a Task"
              :options (add-selector)
              :exec (fn [task]
                      (object/raise grunt-client :start-task task))})

(cmd/command {:command :grunt.load
              :desc "Grunt: Load task list"
              :exec refresh-task})
