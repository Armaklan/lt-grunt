(ns lt.plugins.grunt
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.plugins :as plugins]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.sidebar.command :as sidebar]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [behavior]]))


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
    (print "Impossible de trouver grunt")
    #js [])))

(defn run-task [task]
  (let [cli (grunt-cli)]
    (println "Grunt : Run task : " (:name task))
    (.run (.-task cli) (:name task))
    (.start (.-task cli))
    ))

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
  (object/assoc-in! cmd/manager [:commands :grunt.default :options] (add-selector)))


(behavior ::on-target-select
          :triggers #{:select}
          :reaction (fn [this v]
                      (sidebar/exec-active! v)))

(cmd/command {:command :grunt.default
              :desc "Grunt: Run Default Task"
              :options (add-selector)
              :exec run-task})

(cmd/command {:command :grunt.refresh
              :desc "Grunt: Refresh task list"
              :exec refresh-task})
