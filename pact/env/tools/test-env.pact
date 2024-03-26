(namespace "test")
(module test-env G
  (defcap G () true)
  (defschema entry
    ready:bool
  )

  (deftable env-table:{entry})

  (defun init ()
    (insert env-table 'test { "ready": false })
  )

  (defun finished ()
    (update env-table 'test { "ready": true })
  )

  (defun is-ready ()
    (with-read env-table 'test { "ready" := ready }
      ready
    )
  )
)

(if (read-msg "upgrade") ["Module upgraded"] [(create-table env-table) (test-env.init)])
